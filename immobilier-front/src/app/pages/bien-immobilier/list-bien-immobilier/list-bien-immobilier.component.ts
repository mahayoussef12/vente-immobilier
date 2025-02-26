import {Component, OnInit, ViewChild} from '@angular/core';
import {ImmobilierService} from "../../../services/immobilier.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-list-bien-immobilier',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatInput,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    NgForOf,
    NgIf,
    RouterLink,
    MatHeaderCellDef
  ],
  templateUrl: './list-bien-immobilier.component.html',
  standalone: true,
  styleUrl: './list-bien-immobilier.component.scss'
})
export class ListBienImmobilierComponent  implements OnInit{
  protected data: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator; // ViewChild pour accéder au paginator
  displayedColumns: string[] = [ 'element1', 'element2', 'element3','element4', 'element5','actions'];
  page = 0;
  perPage = 5;
  sortDirection = 'ASC';
  searchValue:string = '';
  constructor(private service:ImmobilierService) {
  }
  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.service.findAllFullFeature(this.page,this.perPage,this.sortDirection,this.searchValue).subscribe(ress=>{
      this.data=ress
    })
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

  delete(id: any) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Cette action est irréversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.supprimerBien(id).subscribe({
          next: () => {
            Swal.fire(
              'Supprimé!',
              'Le bien a été supprimé avec succès.',
              'success'
            );
          },
          error: (err) => {
            if (err.status === 409) {
              Swal.fire({
                icon: 'error',
                title: 'Suppression impossible',
                text: 'Ce bien est associé à une vente ou une visite.'
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Erreur!',
                text: 'Une erreur est survenue lors de la suppression.'
              });
            }
          }
        });
      }
    });
  }

}
