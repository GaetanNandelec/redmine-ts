import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators'; 
import { Membership, MembershipAddRequest, MembershipResultWrapper } from '../models/membership.model';
import { NewsResultWrapper } from '../models/news.model';
import { Pagination } from '../models/pagination.model'; 
import { WikiPage, WikiPageCreateRequest, WikiPageUpdateRequest } from '../models/wiki-page.model';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class WikiPageService extends AbstractService {

  constructor(private http: HttpClient) { super(); }

    public getAllForProjectId(projectId:number): Observable<WikiPage[]> {
     
        const headers = new HttpHeaders() 
        .set('Content-Type', 'application/json'); 
        return this.http.get<WikiPage[]>(`/projects/${projectId}/wiki/index.json`,{headers});
    }
 

    public getByTitle(projectId:number,title:string,version?:number): Observable<WikiPage> {
       
        const headers = new HttpHeaders() 
        .set('Content-Type', 'application/json'); 
        return this.http.get<WikiPage>(`/projects/${projectId}/wiki/${title}${version ? '/'+version : ''}.json?include=attachments`,{headers});
    }

    public create(projectId:number,title:string,data:WikiPageCreateRequest): Observable<WikiPage> {
       
        const headers = new HttpHeaders() 
        .set('Content-Type', 'application/json'); 
        return this.http.put<WikiPage>(`/projects/${projectId}/wiki/${title}.json`,`{"wiki_page":${JSON.stringify(data)}}` ,{headers});
    }


    public update(projectId:number,title:string,data:WikiPageUpdateRequest): Observable<WikiPage> {
       
        const headers = new HttpHeaders() 
        .set('Content-Type', 'application/json'); 
        return this.http.put<WikiPage>(`/projects/${projectId}/wiki/${title}.json`,`{"wiki_page":${JSON.stringify(data)}}` ,{headers});
    }

    public delete(projectId:number,title:string): Observable<void> {
       
        const headers = new HttpHeaders() 
        .set('Content-Type', 'application/json'); 
        return this.http.get<void>(`/projects/${projectId}/wiki/${title}.json`,{headers});
    }
  
  

}
