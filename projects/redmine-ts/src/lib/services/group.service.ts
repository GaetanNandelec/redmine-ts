import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Group, GroupResultWrapper } from '../models/group.model';
import { Pagination } from '../models/pagination.model';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends AbstractService {
 
  constructor(private http: HttpClient) { super(); }

  public getAll(pagination?:Pagination): Observable<GroupResultWrapper> {
    let pagination_query=super.buildPagination(pagination);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.get<GroupResultWrapper>(`/groups.json?${pagination_query}`, { headers });
  }


  public create(name:string): Observable<Group> {

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

      const modal: Group = {
        id: undefined,
        custom_fields:undefined,
        users:undefined,
        name: name
    };
    return this.http.post<Group>('/groups.json',`{"group":${JSON.stringify(modal)}}`, { headers }).pipe(
      map(result => {
        return result['group'];
      })
    );
  }

  public getById(id:number): Observable<Group> {

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.get<Group>(`/groups/${id}.json?include=users`, { headers }).pipe(
      map(result => {
        return result['group'];
      })
    );
  }

  public update(id:number,name:string): Observable<void> {

    const modal: Group = {
      id: undefined,
      custom_fields:undefined,
      users:undefined,
      name: name
  };
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.put<void>(`/groups/${id}.json`,`{"group":${JSON.stringify(modal)}}`, { headers });
  }

  public delete(id:number): Observable<void> {

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.delete<void>(`/groups/${id}.json`, { headers });
  }

  public addExistingUserToGroup(id:number,userId:number): Observable<void> {

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post<void>(`/groups/${id}/users.json`,`{"user_id":${userId}}` ,{ headers });
  }


  public removeExistingUserFromGroup(id:number,userId:number): Observable<void> {

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.delete<void>(`/groups/${id}/users/${userId}.json`, { headers });
  }


}
