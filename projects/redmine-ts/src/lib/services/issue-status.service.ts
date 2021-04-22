import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { IssueStatusResultWrapper } from '../models/issue-status.model';
import { Pagination } from '../models/pagination.model';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class IssueStatusesService  extends AbstractService {

  constructor(private http: HttpClient) { super(); }

  public getAll(pagination?:Pagination): Observable<IssueStatusResultWrapper> {
    let pagination_query=super.buildPagination(pagination);
      const headers = new HttpHeaders() 
      .set('Content-Type', 'application/json'); 
      return this.http.get<IssueStatusResultWrapper>(`/issue_statuses.json?${pagination_query}`,{headers});
  }


}
