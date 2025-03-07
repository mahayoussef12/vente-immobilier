import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environement} from "../../environement/environement";
import {KeycloakService} from "./keycloak.service";

@Injectable({
  providedIn: 'root'
})
export class VisiteService {

  constructor(private http: HttpClient) {}

  getAllVisites(): Observable<any[]> {
    return this.http.get<any[]>(environement.apiUrlVisite);
  }

  getVisiteById(id: number): Observable<any> {
    return this.http.get<any>(`${environement.apiUrlVisite}/${id}`);
  }

  createVisite(visite: any): Observable<any> {
    return this.http.post<any>(environement.apiUrlVisite, visite);
  }

  deleteVisite(id: number): Observable<void> {
    return this.http.delete<void>(`${environement.apiUrlVisite}/${id}`);
  }


}
