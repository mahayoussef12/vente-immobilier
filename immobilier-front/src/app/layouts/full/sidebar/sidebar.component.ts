import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BrandingComponent } from './branding.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import {KeycloakService} from "../../../services/keycloak.service";
import {navItems} from "./sidebar-data";
import {NavItem} from "./nav-item/nav-item";

@Component({
  selector: 'app-sidebar',
  imports: [BrandingComponent, TablerIconsModule, MaterialModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

  @Input() showToggle = true;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();
  private navItemsFiltered: NavItem[];



  constructor(private authService: KeycloakService) {}

  ngOnInit() {
    const userRoles = this.authService.getUserRoles(); // Récupération des rôles (tableau de strings)
    this.navItemsFiltered = navItems.filter(item =>
      !item.roles || item.roles.some(role => userRoles.includes(role)) // Vérifie si au moins un rôle correspond
    );
  }

}
