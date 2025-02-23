import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environement} from "../../environement/environement";
import {KeycloakService} from "./keycloak.service";

@Injectable({
  providedIn: 'root'
})
export class ImmobilierService {

  constructor(private http: HttpClient) {}

  findAllFullFeature(page: number, perPage: number, sortDirection: string, searchValue: string): Observable<any> {
    let params = new HttpParams()
        .set('page', page.toString())
        .set('perPage', perPage.toString())
        .set('sortDirection', sortDirection)
    if (searchValue !== null && searchValue !== '') {
      params = params.set('searchValue', searchValue);
    }
    return this.http.get<any>(environement.apiUrlImmobilier+'/findSearchPagination', { params
    });

  }

  /** Ajouter un bien immobilier */
  ajouterBien(bien: any): Observable<any> {
    return this.http.post<any>(environement.apiUrlImmobilier, bien);
  }
  /** Obtenir un bien immobilier par ID */
  obtenirBienParId(id: number): Observable<any> {
    return this.http.get<any>(`${environement.apiUrlImmobilier}/${id}`);
  }

  /** Supprimer un bien immobilier */
  supprimerBien(id: number): Observable<void> {
    return this.http.delete<void>(`${environement.apiUrlImmobilier}/${id}`);
  }

}
