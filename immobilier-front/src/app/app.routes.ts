import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.routes').then(
            (m) => m.UiComponentsRoutes
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./pages/Users/users.routes').then(
            (m) => m.UsersRoutes
          ),
      },
      {
        path: 'immobilier',
        loadChildren: () =>
          import('./pages/bien-immobilier/bienimmobilier.routes').then(
            (m) => m.bienImmobilierRoutes
          ),
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
