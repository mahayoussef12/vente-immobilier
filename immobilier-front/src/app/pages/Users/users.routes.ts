import { Routes } from '@angular/router';


import {ListUserComponent} from "./list-user/list-user.component";
import {AddUserComponent} from "./list-user/add-user/add-user.component";
import {UpdateUserComponent} from "./list-user/update-user/update-user.component";

export const UsersRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all',
        component: ListUserComponent,
      },
      {
        path: 'AddCompte',
        component: AddUserComponent,
      },
      {
        path:'Update-user/:id',
        component:UpdateUserComponent
      },
    ],
  },
];
