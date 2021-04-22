import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, forkJoin, from, merge, Observable, zip } from 'rxjs';
import { catchError, concatMap, distinct, distinctUntilChanged, distinctUntilKeyChanged, flatMap, map, mergeAll, mergeMap, scan, switchMap, tap } from 'rxjs/operators';

import { of, combineLatest } from "rxjs";
import { Issue, IssueCreate, IssueRequestFilter, IssueResultWrapper, IssueUpdate } from '../models/issue.model';
import { Pagination } from '../models/pagination.model';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class IssuesService extends AbstractService {


  constructor(private http: HttpClient) { super(); }

  public getAllByProjectId(projectId: number,pagination?:Pagination,filters?:IssueRequestFilter): Observable<IssueResultWrapper> {

    let pagination_query=super.buildPagination(pagination);

    const headers = new HttpHeaders() 
    .set('Content-Type', 'application/json'); 
    return this.http.get<IssueResultWrapper>(`/issues.json?include=attachments,relations&project_id=${projectId}&${pagination_query}`,{headers});
 
  }

  public getById(id: number): Observable<Issue> {

    const headers = new HttpHeaders() 
    .set('Content-Type', 'application/json'); 
    return this.http.get<Issue>(`/issues/${id}.json?include=attachments,journals,children,relations,changesets,watchers`,{headers}).pipe(
      map(result => {
        return result['issue']; 
      })
    );
 
  }

  public create(issue: IssueCreate): Observable<Issue> {

    const headers = new HttpHeaders() 
    .set('Content-Type', 'application/json');

    return this.http.post<Issue>(`/issues.json`, `{"issue":${JSON.stringify(issue)}}`,{headers}).pipe(
      map(result => {
        return result['issue']; 
      })
    );
  }

  public update(id: number,issue: IssueUpdate): Observable<void> {

    const headers = new HttpHeaders() 
    .set('Content-Type', 'application/json');

    return this.http.put<void>(`/issues/${id}.json`, `{"issue":${JSON.stringify(issue)}}`,{headers});
  }
 
  public delete(id: number): Observable<void> {

    const headers = new HttpHeaders() 
    .set('Content-Type', 'application/json'); 
    return this.http.delete<void>(`/issues/${id}.json`,{headers});
 
  }

  public addWatcher(id: number,user_id: number): Observable<void> {

    const headers = new HttpHeaders() 
    .set('Content-Type', 'application/json'); 
    return this.http.post<void>(`/issues/${id}/watchers.json`,`{"user_id":${user_id}}`,{headers});
 
  }

  public removeWatcher(id: number,user_id: number): Observable<void> {

    const headers = new HttpHeaders() 
    .set('Content-Type', 'application/json'); 
    return this.http.delete<void>(`/issues/${id}/watchers/${user_id}.json`,{headers});
 
  }

}
