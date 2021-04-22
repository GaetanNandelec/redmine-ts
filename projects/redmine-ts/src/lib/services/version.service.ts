import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { Pagination } from '../models/pagination.model';
import { Version, VersionChangeRequest, VersionResultWrapper } from '../models/version.model'; 
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class VersionsService   extends AbstractService {

  constructor(private http: HttpClient) { super(); }

  public getVersionsForProjectId(projectId:number,pagination?:Pagination): Observable<VersionResultWrapper> {
    let pagination_query=super.buildPagination(pagination);
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

    return this.http.get<VersionResultWrapper>(`/projects/${projectId}/versions.json?${pagination_query}`, { headers });
  }


  public createVersionForProjectId(projectId:number,data:VersionChangeRequest): Observable<VersionResultWrapper> {
  
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

    return this.http.post<VersionResultWrapper>(`/projects/${projectId}/versions.json`,`{"version":${JSON.stringify(data)}}`, { headers });
  }


  public getById(id:number): Observable<Version> {
    
    const headers = new HttpHeaders() 
    .set('Content-Type', 'application/json'); 

    return this.http.get<Version>(`/versions/${id}.json`,{headers});
}

public update(id:number,data:VersionChangeRequest): Observable<void> {

    const headers = new HttpHeaders() 
    .set('Content-Type', 'application/json'); 

    return this.http.put<void>(`/relations/${id}.json`,`{"version":${JSON.stringify(data)}}`,{headers});
}


public delete(id:number): Observable<void> {

  const headers = new HttpHeaders() 
  .set('Content-Type', 'application/json'); 

  return this.http.delete<void>(`/relations/${id}.json`,{headers});
}

}
