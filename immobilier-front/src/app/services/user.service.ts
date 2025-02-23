import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environement} from "../../environement/environement";
import {KeycloakService} from "./keycloak.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,private Keycloakservice:KeycloakService) {}


  findAllFullFeature(page: number, perPage: number, sortDirection: string, searchValue: string): Observable<any> {
    // Paramètres de la requête
    let params = new HttpParams()
        .set('page', page.toString())
        .set('perPage', perPage.toString())
        .set('sortDirection', sortDirection)
    if (searchValue !== null && searchValue !== '') {
      params = params.set('searchValue', searchValue);
    }
    // Appel de l'API avec les paramètres
    return this.http.get<any>(environement.apiUrlUser+'/All', { params
    });

  }

  addUser(data:any):Observable<any>{
    return this.http.post(environement.apiUrlUser,data)
  }
  assignrole(id:number,roles: string):Observable<any>{
    const url = `${environement.apiUrlUser}/assign-role/user/${id}`;
    return this.http.put(url,roles);
  }
  getUserbyId(id:number):Observable<any>{
    const url = `${environement.apiUrlUser}/${id}`;
    return  this.http.get<any>(url)
  }

  updateUser(userId: string, userDTO: any, rolesToUpdate: any): Observable<any> {
    const url = `${environement.apiUrlUser}/${userId}/update-user`; // URL complète comprenant l'ID de l'utilisateur

    // Construction des paramètres de requête
    let queryParams = new HttpParams();
      queryParams = queryParams.append('rolesToUpdate', rolesToUpdate);


    return this.http.put(url, userDTO, { params: queryParams });
  }
  toggleUserEnabledStatus(userId: string): Observable<any> {
    const url = `${environement.apiUrlUser}/${userId}/toggle-enabled-status`;
    return this.http.put(url, {});
  }



}
