import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { IssueCategory, IssueCategoryAddRequest, IssueCategoryResultWrapper } from '../models/issue-category.model';
import { IssueStatusResultWrapper } from '../models/issue-status.model';
import { Pagination } from '../models/pagination.model';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class IssueCategoryService  extends AbstractService {

  constructor(private http: HttpClient) { super(); }


  public getAllForProjectId(projectId:number,pagination?:Pagination): Observable<IssueCategoryResultWrapper> {
    let pagination_query=super.buildPagination(pagination);
      const headers = new HttpHeaders() 
      .set('Content-Type', 'application/json'); 
      return this.http.get<IssueCategoryResultWrapper>(`/projects/${projectId}/issue_categories.json?${pagination_query}`,{headers});
  }

  public addToProject(projectId:number,data:IssueCategoryAddRequest): Observable<IssueCategory> {

      const headers = new HttpHeaders() 
      .set('Content-Type', 'application/json'); 
      return this.http.post<IssueCategory>(`/projects/${projectId}/issue_categories.json`,`{"issue_category":${JSON.stringify(data)}}` ,{headers}).pipe(
          map(result => {
            return result['issue_category']; 
          })
        );
  }


  public getById(id:number): Observable<IssueCategory> {

      const headers = new HttpHeaders() 
      .set('Content-Type', 'application/json'); 
      return this.http.get<IssueCategory>(`/issue_categories/${id}.json`,{headers}).pipe(
          map(result => {
            return result['issue_category']; 
          })
        );
  }

  public update(id:number,data:IssueCategoryAddRequest): Observable<void> {

 
      const headers = new HttpHeaders() 
      .set('Content-Type', 'application/json'); 
      return this.http.put<void>(`/issue_categories/${id}.json`,`{"issue_category":${JSON.stringify(data)}}`,{headers});
  }


  public delete(id:number): Observable<void> {

      const headers = new HttpHeaders() 
      .set('Content-Type', 'application/json'); 
      return this.http.delete<void>(`/issue_categories/${id}.json`,{headers});
  }

  public deleteAndReAssignToId(id:number,categoryId:number): Observable<void> {

    const headers = new HttpHeaders() 
    .set('Content-Type', 'application/json'); 
    return this.http.delete<void>(`/issue_categories/${id}.json?reassign_to_id=${categoryId}`,{headers});
}

}
