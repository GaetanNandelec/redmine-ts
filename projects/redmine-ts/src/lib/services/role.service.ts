import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pagination } from '../models/pagination.model';
import { Role, RoleResultWrapper } from '../models/role.model'; 
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService  extends AbstractService {
 
  constructor(private http: HttpClient) { super(); }

  public getAll(pagination?:Pagination): Observable<RoleResultWrapper> {
    let pagination_query=super.buildPagination(pagination);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.get<RoleResultWrapper>(`/roles.json?${pagination_query}`, { headers });
  }
  
  public getById(id:number): Observable<Role> {

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.get<Role>(`/roles/${id}.json`, { headers })
  }

 
}
