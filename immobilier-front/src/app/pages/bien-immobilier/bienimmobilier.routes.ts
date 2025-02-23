import { Routes } from '@angular/router';
import {ListBienImmobilierComponent} from "./list-bien-immobilier/list-bien-immobilier.component";
import {AddBienImmobillierComponent} from "./list-bien-immobilier/add-bien-immobillier/add-bien-immobillier.component";
import {
  UpdateBienImmobillierComponent
} from "./list-bien-immobilier/update-bien-immobillier/update-bien-immobillier.component";
import {
  DetailsBienImmobillierComponent
} from "./list-bien-immobilier/details-bien-immobillier/details-bien-immobillier.component";



export const bienImmobilierRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all',
        component:ListBienImmobilierComponent ,
      },
      {
        path: 'AddImmobillier',
        component: AddBienImmobillierComponent,
      },
      {
        path:'Update-immobilier/:id',
        component:UpdateBienImmobillierComponent
      },
      {
        path:'details-immobilier/:id',
        component:DetailsBienImmobillierComponent
      },
    ],
  },
];
