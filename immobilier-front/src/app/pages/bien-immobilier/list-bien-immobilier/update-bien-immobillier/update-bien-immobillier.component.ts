import {Component, OnInit} from '@angular/core';
import {ImmobilierService} from "../../../../services/immobilier.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatError} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-update-bien-immobillier',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatError,
    NgIf,
    NgClass,
    FormsModule,
    MatInput,
    MatLabel,
    MatFormField,
    MatSelect,
    MatOption,
    MatButton,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './update-bien-immobillier.component.html',
  standalone: true,
  styleUrl: './update-bien-immobillier.component.scss'
})
export class UpdateBienImmobillierComponent implements OnInit{
  immobilier: any;
  selectedType: string | undefined;
  alertMessage: string | null = null;
  alertType: 'success' | 'error' | null = null;

  constructor(private router: Router,
              private immobilierService: ImmobilierService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.immobilierService.obtenirBienParId(this.route.snapshot.params['id']).subscribe(result => {
      this.immobilier = result;
      this.selectedType = this.immobilier.type;
    });
  }

  updateImmobilier(form: NgForm): void {
    if (form.invalid) {
      form.form.markAllAsTouched();
      this.alertMessage = 'Veuillez corriger les erreurs dans le formulaire.';
      this.alertType = 'error';
      return;
    }

    this.immobilierService.ajouterBien( this.immobilier).subscribe(
      result => {
        this.alertMessage = 'Mise à jour réussie.';
        this.alertType = 'success';
        setTimeout(() => {
          this.router.navigate(['/Immobilier']);
        }, 1000);
      },
      error => {
        this.alertMessage = 'Erreur lors de la mise à jour du bien immobilier.';
        this.alertType = 'error';
      }
    );
  }
}
