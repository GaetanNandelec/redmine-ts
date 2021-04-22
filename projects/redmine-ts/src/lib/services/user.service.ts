import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { Pagination } from '../models/pagination.model';
import { User, UserChangeRequest, UserResultWrapper } from '../models/user.model';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class UserService  extends AbstractService {

  constructor(private http: HttpClient) { super(); }

  public getAll(pagination?:Pagination): Observable<UserResultWrapper> {
    let pagination_query=super.buildPagination(pagination);
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.get<UserResultWrapper>(`/users.json?${pagination_query}`, { headers });
  }

  public create(user:UserChangeRequest,send_information:boolean): Observable<User> {

    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.post<User>(`/users.json`,`{"user":${JSON.stringify(user)} , "send_information":${send_information} }`, { headers }).pipe(
      map(result => {
        return result['user'];
      })
    );
  }

  public getById(id:number): Observable<User> {

    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.get<User>(`/users/${id}.json?include=memberships,groups`,{ headers }).pipe(
      map(result => {
        return result['user'];
      })
    );
  }

  public update(id:number,user:UserChangeRequest): Observable<void> {

    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.put<void>(`/users/${id}.json`,`{"user":${JSON.stringify(user)}}`, { headers });
  }


  public delete(id:number): Observable<void> {

    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.delete<void>(`/users/${id}.json`,{ headers });
  }


}
