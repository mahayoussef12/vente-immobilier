import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatStep, MatStepper, MatStepperNext} from "@angular/material/stepper";
import {UserService} from "../../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-user',
  imports: [
    MatCardHeader,
    MatCardTitle,
    ReactiveFormsModule,
    MatCard,
    MatCardContent,
    MatLabel,
    MatFormField,
    MatInput,
    NgIf,
    MatButton,
    MatSelect,
    MatOption,
    MatStepper,
    MatStep,
    NgForOf,
    MatStepperNext,
    NgClass,
    MatError
  ],
  templateUrl: './add-user.component.html',
  standalone: true,
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit {
  form: FormGroup;
  form2: FormGroup;
  isLinear = false;
  roles = [
    { value: 'ADMIN', viewValue: 'Administrateur' },
    { value: 'AGENT', viewValue: 'Agent' },
    { value: 'CLIENT', viewValue: 'Client' }
  ];
  alertMessage: string = '';
  alertType: string = '';
  private data: any;
  private id: any;


  constructor(private fb: FormBuilder ,private userservice:UserService, private router:Router) {
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.form2 = this.fb.group({
      roleNames: [[], Validators.required],
    });
  }
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.alertMessage = "Veuillez corriger les erreurs dans le formulaire.";
      this.alertType = 'error';
      return;
    } else {

      this.userservice.addUser(this.form.value).subscribe(
        result => {
          this.data = result;
          this.id = this.data.id;
          this.alertMessage = "Utilisateur ajouté avec succès";
          this.alertType = 'success';
          setTimeout(() => {
            this.stepper.next();
          }, 2500);
        },
        (error) => {
          // Error handler for 409 Conflict (Email already exists)
          if (error.status === 409) {
            this.alertMessage = "L'email existe déjà. Veuillez utiliser un autre email.";
          } else {
            // General error handler for other errors
            this.alertMessage = "Erreur lors de la création de l'utilisateur.";
          }
          this.alertType = 'error';

        }
      );
    }
  }

  save() {
    if (this.form2.invalid) {
      this.form2.markAllAsTouched();
      this.alertMessage = "Veuillez corriger les erreurs dans le formulaire de rôle.";
      this.alertType = 'error';
      return;
    } else {


      const selectedRoles = this.form2.get('roleNames')?.value;

      this.userservice.assignrole(this.id, selectedRoles).subscribe(
        () => {

          this.alertMessage = "Rôles assignés avec succès";
          this.alertType = 'success';
          setTimeout(() => {
            this.router.navigate(['/User']);
          }, 3000);
        },
        (error) => {

        });
    }
  }

  @ViewChild('stepper') stepper!: MatStepper;

  onStepChange(stepper: MatStepper) {
    if (stepper.selectedIndex === 0 && !this.form.valid) {
      stepper.selectedIndex = 0; // Stay on the current step if invalid
    } else if (stepper.selectedIndex === 1 && !this.form2.valid) {
      stepper.selectedIndex = 1; // Stay on the current step if invalid
    }
  }

  get username() { return this.form.get('username'); }
  get email() { return this.form.get('email'); }
  get firstName() { return this.form.get('firstName'); }
  get lastName() { return this.form.get('lastName'); }
  get password() { return this.form.get('password'); }
  get roleNames() { return this.form2.get('roleNames'); }
}
