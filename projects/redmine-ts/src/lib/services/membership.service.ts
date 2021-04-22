import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators'; 
import { Membership, MembershipAddRequest, MembershipResultWrapper } from '../models/membership.model';
import { Pagination } from '../models/pagination.model';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class MembershipService  extends AbstractService {

  constructor(private http: HttpClient) { super(); }

    public getAllForProjectId(projectId:number,pagination?:Pagination): Observable<MembershipResultWrapper> {
      let pagination_query=super.buildPagination(pagination);
        const headers = new HttpHeaders() 
        .set('Content-Type', 'application/json'); 
        return this.http.get<MembershipResultWrapper>(`/projects/${projectId}/memberships.json?${pagination_query}`,{headers});
    }

    public addToProject(projectId:number,data:MembershipAddRequest): Observable<Membership> {

        const headers = new HttpHeaders() 
        .set('Content-Type', 'application/json'); 
        return this.http.post<Membership>(`/projects/${projectId}/memberships.json`,`{"membership":${JSON.stringify(data)}}` ,{headers}).pipe(
            map(result => {
              return result['membership']; 
            })
          );
    }


    public getById(id:number): Observable<Membership> {

        const headers = new HttpHeaders() 
        .set('Content-Type', 'application/json'); 
        return this.http.get<Membership>(`/memberships/${id}.json`,{headers}).pipe(
            map(result => {
              return result['membership']; 
            })
          );
    }
 
    public update(id:number,role_ids :number[]): Observable<void> {

        const request ={
            role_ids:role_ids
        }
        const headers = new HttpHeaders() 
        .set('Content-Type', 'application/json'); 
        return this.http.put<void>(`/memberships/${id}.json`,`{"membership":${JSON.stringify(request)}}`,{headers});
    }


    public delete(id:number): Observable<void> {

        const headers = new HttpHeaders() 
        .set('Content-Type', 'application/json'); 
        return this.http.delete<void>(`/memberships/${id}.json`,{headers});
    }


}
