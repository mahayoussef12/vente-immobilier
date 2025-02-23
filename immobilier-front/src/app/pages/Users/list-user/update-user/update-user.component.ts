import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../services/user.service";
import {FormsModule, NgForm} from "@angular/forms";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {NgClass, NgIf} from "@angular/common";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-update-user',
  imports: [
    MatCardHeader,
    MatCard,
    MatCardContent,
    NgIf,
    NgClass,
    FormsModule,
    MatLabel,
    MatInput,
    MatFormField,
    MatSelect,
    MatOption,
    MatError,
    MatCardTitle
  ],
  templateUrl: './update-user.component.html',
  standalone: true,
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent implements  OnInit {
  user:any
  selectedValues: string | undefined; // Les valeurs par défaut que vous voulez sélectionner
  alertMessage: string | null = null;
  alertType: 'success' | 'error' | null = null;
  constructor(private router: Router,
              private userservice:UserService,
              private route: ActivatedRoute,


  ) {
  }

  ngOnInit(): void {
    this.userservice.getUserbyId(this.route.snapshot.params['id']).subscribe(result => {
      this.user = result;
      console.log(this.user);

      const roleArray = this.user.realmRoles.filter((role: string) =>
        role !== 'default-roles-immobilier' &&
        role !== 'offline_access' &&
        role !== 'uma_authorization'
      );
      this.selectedValues = roleArray.length ? roleArray[0] : '';

      console.log(this.selectedValues);
    });
  }


  updateUser(form: NgForm): void {
    if (form.invalid) {
      form.form.markAllAsTouched();
      this.alertMessage = 'Veuillez corriger les erreurs dans le formulaire.';
      this.alertType = 'error';
      return;
    }


    this.userservice.updateUser(this.user.id, this.user, this.selectedValues).subscribe(
      result => {
        this.alertMessage = 'Mise à jour les données avec success.';
        this.alertType = 'success';
        setTimeout(() => {
          this.router.navigate(['/User']);
        }, 1000);
      },
      error => {
        this.alertMessage = 'Erreur lors de la mise à jour de l\'utilisateur.';
        this.alertType = 'error';
      }
    );
  }


}
