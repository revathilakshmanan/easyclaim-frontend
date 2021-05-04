import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../model/user.model";
import {Observable} from "rxjs/index";
import {ApiResponse} from "../model/api.response";

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrlUser: string = 'http://192.168.56.101:9910/users/';
  baseUrlClaim: string = 'http://192.168.56.101:9910/claims/';

  login(loginPayload) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>('http://192.168.56.101:9910/' + 'token/generate-token', loginPayload);
  }

  getUsers() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrlUser);
  }

  getUserById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrlUser + id);
  }

  createUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrlUser, user);
  }

  updateUser(user: User): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrlUser + user.id, user);
  }

  deleteUser(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrlUser + id);
  }

  getClaims() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrlClaim);
  }

  getClaimById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrlClaim + id);
  }

  createClaim(claim: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrlClaim, claim);
  }

  updateClaim(claim: User): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrlClaim + claim.id, claim);
  }

  deleteClaim(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrlClaim + id);
  }
}
