import {Component, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UserService} from "../../../services/user.service";
import Swal from 'sweetalert2';
import {interval} from "rxjs";
import {MatFabButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-list-user',
  imports: [
    MatFabButton,
    RouterLink,
    MatFormField,
    MatTable,
    MatInput,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    NgForOf,
    NgIf,
    MatIcon,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatPaginator,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    NgClass,
    NgStyle
  ],
  templateUrl: './list-user.component.html',
  standalone: true,
  styleUrl: './list-user.component.scss'
})
export class ListUserComponent implements OnInit{
  page = 0;
  perPage = 5;
  sortDirection = 'ASC';
  searchValue:string = '';
  data:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator; // ViewChild pour accéder au paginator
  displayedColumns: string[] = [ 'element1', 'element2', 'element3','actions'];
  user: any;

  constructor(private userservice:UserService) {
  }
  ngOnInit(): void {
      this.loadData()

  }


  loadData() {
    this.userservice.findAllFullFeature(this.page, this.perPage, this.sortDirection, this.searchValue)
      .subscribe(data => {
        this.data= data;
      });
  }

  onPageChanged(pageEvent: any) {
    this.page = pageEvent.pageIndex;
    this.perPage = pageEvent.pageSize;
    this.loadData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchValue = filterValue;
    this.loadData();
  }

  toggleUserEnabledStatus(userId: string) {
    this.userservice.toggleUserEnabledStatus(userId).subscribe(
      response => {
        console.log('User status toggled successfully');
      },
      error => {
        console.error('Error toggling user status', error);
      }
    );
  }
  async GetById(id: any): Promise<void> {
    try {
      const result = await this.userservice.getUserbyId(id).toPromise();
      this.user = result;
    } catch (error) {
      console.error('Error fetching user', error);
    }
  }

  async confirmBox(id: any) {
    await this.GetById(id);

    if (this.user.enabled) {
      Swal.fire({
        title: 'Êtes-vous sûr de vouloir désactiver l\'utilisateur ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, désactiver !',
        cancelButtonText: 'Non, garder activé'
      }).then((result) => {
        if (result.value) {
          this.toggleUserEnabledStatus(id);
          Swal.fire(
            'Désactivé !',
            'Le compte utilisateur a été désactivé.',
            'success'
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Annulé',
            'Le compte utilisateur est toujours activé :)',
            'error'
          );
        }
      });
    } else {
      Swal.fire({
        title: 'Êtes-vous sûr de vouloir activer l\'utilisateur ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, activer !',
        cancelButtonText: 'Non, garder désactivé'
      }).then((result) => {
        if (result.value) {
          this.toggleUserEnabledStatus(id);
          Swal.fire(
            'Activé !',
            'Le compte utilisateur a été activé.',
            'success'
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Annulé',
            'Le compte utilisateur est toujours désactivé :(',
            'error'
          );
        }
      });
    }
  }
  getRoleColor(role: string): string {
    switch (role.toLowerCase()) {
      case 'ADMIN':
        return 'role-admin';
      case 'AGENT':
        return 'role-agent';
      case 'CLIENT':
        return 'role-client';
      default:
        return '';
    }
  }
  exportToExcel() {
    const dataToExport = this.data?.content.map((user: any) => ({
      Nom: user.firstName,
      Email: user.email,
      Role: user.realmRoles.join(', '),
      "État du compte": user.enabled ? "Activé" : "Désactivé"
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook: XLSX.WorkBook = { Sheets: { 'Utilisateurs': worksheet }, SheetNames: ['Utilisateurs'] };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'Utilisateurs.xlsx');
  }
}
