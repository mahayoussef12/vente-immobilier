import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {VisiteService} from "../../../../services/visite.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {NgClass, NgIf} from "@angular/common";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {KeycloakService} from "../../../../services/keycloak.service";

@Component({
  selector: 'app-viste-immobilier',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    NgIf,
    NgClass,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatButton,
    MatInput,
    MatError
  ],
  templateUrl: './viste-immobilier.component.html',
  standalone: true,
  styleUrl: './viste-immobilier.component.scss'
})
export class VisteImmobilierComponent {
  visiteForm: FormGroup;
  alertMessage: string | null = null;
  alertType: string = '';
  userId :string | undefined;

  constructor(
    private fb: FormBuilder,
    private visiteService: VisiteService,
    private router: Router,
    private route: ActivatedRoute,
    private keycloak:KeycloakService
  ) {
    // Correctly call getUserId to fetch the user ID
     this.userId = this.keycloak.getUserId();
    this.visiteForm = this.fb.group({
      bien: this.fb.group({
        id: [this.route.snapshot.params['id'], Validators.required]  // L'ID du bien
      }),
      idclient: [this.userId, Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.visiteForm.valid) {
      this.visiteService.createVisite(this.visiteForm.value).subscribe({
        next: () => {
          this.alertMessage = 'Visite créée avec succès';
          this.alertType = 'success';
          console.log(this.visiteForm.value);
          // setTimeout(() => this.router.navigate(['/visites']), 2000);
        },
        error: (err) => {
          // Vérifier si l'erreur est de type 409 (conflit)
          if (err.status === 409) {
            this.alertMessage = 'Le bien est déjà en visite à cette date et heure';
            this.alertType = 'error';
          } else {
            this.alertMessage = 'Erreur lors de la création de la visite';
            this.alertType = 'error';
          }
          console.error(err);
        }
      });
    }
  }

}
