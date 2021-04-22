import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators'; 
import { Membership, MembershipAddRequest, MembershipResultWrapper } from '../models/membership.model';
import { NewsResultWrapper } from '../models/news.model';
import { Pagination } from '../models/pagination.model';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService extends AbstractService {

  constructor(private http: HttpClient) { super(); }

    public getAll(pagination?:Pagination): Observable<NewsResultWrapper> {
      let pagination_query=super.buildPagination(pagination);
        const headers = new HttpHeaders() 
        .set('Content-Type', 'application/json'); 
        return this.http.get<NewsResultWrapper>(`/news.json?${pagination_query}`,{headers});
    }
 

    public getAllForProjectId(projectId:number,pagination?:Pagination): Observable<NewsResultWrapper> {
        let pagination_query=super.buildPagination(pagination);
        const headers = new HttpHeaders() 
        .set('Content-Type', 'application/json'); 
        return this.http.get<NewsResultWrapper>(`/projects/${projectId}/news.json?${pagination_query}`,{headers});
    }
  

}
