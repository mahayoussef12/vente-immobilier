import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../../services/user.service";
import {ImmobilierService} from "../../../../services/immobilier.service";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-add-bien-immobillier',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    NgIf,
    NgClass,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatInput,
    MatError,
    MatSelect,
    MatOption,
    NgForOf,
    MatButton
  ],
  templateUrl: './add-bien-immobillier.component.html',
  standalone: true,
  styleUrl: './add-bien-immobillier.component.scss'
})
export class AddBienImmobillierComponent implements OnInit{
  form: FormGroup;
  alertMessage: string | null = null;
  alertType: 'success' | 'error' | null = null;

  types = [
    { value: 'Maison', viewValue: 'Maison' },
    { value: 'Appartement', viewValue: 'Appartement' },
    { value: 'Terrain', viewValue: 'Terrain' }
  ];

  constructor(private fb: FormBuilder,private service:ImmobilierService) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      titre: ['', [Validators.required, Validators.pattern('.*')]], // string obligatoire
      description: ['', Validators.pattern('.*')], // string optionnel
      adresse: ['', [Validators.required, Validators.pattern('.*')]], // string obligatoire
      surface: [0, [Validators.required, Validators.min(1)]], // nombre obligatoire, min 1
      nombrePieces: [0, [Validators.required, Validators.min(1)]], // nombre obligatoire, min 1
      type: ['', [Validators.required, Validators.pattern('.*')]], // string obligatoire
      prix: [0, [Validators.required, Validators.min(0)]], // nombre obligatoire, min 0
      imageUrl: ['', Validators.pattern('.*')] // string optionnel
    });
  }

    onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value)
     this.service.ajouterBien(this.form.value).subscribe(res=>{
       this.alertMessage = 'Bien immobilier ajouté avec succès !';
       this.alertType = 'success';

     })
    } else {
      this.alertMessage = 'Veuillez remplir tous les champs obligatoires.';
      this.alertType = 'error';
    }
  }

}
