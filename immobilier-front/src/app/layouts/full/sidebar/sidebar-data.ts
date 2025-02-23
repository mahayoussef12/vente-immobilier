import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-grid-add',
    route: '/dashboard',
    bgcolor: 'primary',
  },


  {
    navCap: 'Ui Components',
  },
  {
    displayName: 'Badge',
    iconName: 'archive',
    route: '/ui-components/badge',
    bgcolor: 'warning',
  },
  {
    displayName: 'Chips',
    iconName: 'info-circle',
    route: '/ui-components/chips',
    bgcolor: 'success',
  },
  {
    displayName: 'Lists',
    iconName: 'list-details',
    route: '/ui-components/lists',
    bgcolor: 'error',
  },
  {
    displayName: 'Menu',
    iconName: 'file-text',
    route: '/ui-components/menu',
    bgcolor: 'primary',
  },
  {
    displayName: 'Tooltips',
    iconName: 'file-text-ai',
    route: '/ui-components/tooltips',
    bgcolor: 'secondary',
  },
  {
    displayName: 'Forms',
    iconName: 'clipboard-text',
    route: '/ui-components/forms',
    bgcolor: 'warning',
  },
  {
    displayName: 'Tables',
    iconName: 'table',
    route: '/ui-components/tables',
    bgcolor: 'success',
  },
  {
    navCap: 'Utilisateurs',
  },
  {
    displayName: 'Utilisateur',
    iconName: 'users',
    route: '/users/all',
    bgcolor: 'success',
  },
  {
    navCap: 'Bien Immobilier',

  },
  {
    displayName: 'Bien Immobilier',
    iconName: 'home',
    route: '/immobilier/all',
    bgcolor: 'warning',
  },
];
