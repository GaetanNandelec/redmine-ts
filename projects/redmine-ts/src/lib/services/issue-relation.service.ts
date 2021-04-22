import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators'; 
import { IssueRelation, IssueRelationChangeRequest } from '../models/issue-relation.model';
import { Membership, MembershipAddRequest, MembershipResultWrapper } from '../models/membership.model';
import { NewsResultWrapper } from '../models/news.model';
import { Pagination } from '../models/pagination.model';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class IssueRelationService extends AbstractService {

  constructor(private http: HttpClient) { super(); }

    public getRelationsToIssue(issueId:number): Observable<IssueRelation[]> {
      
        const headers = new HttpHeaders() 
        .set('Content-Type', 'application/json'); 
        return this.http.get<IssueRelation[]>(`/issues/${issueId}/relations.json`,{headers}).pipe(
            map(result => {
              return result['relations'];
            })
          );
    }
 

    public addRelationToIssue(issueId:number,data:IssueRelationChangeRequest): Observable<IssueRelation> {
    
        const headers = new HttpHeaders() 
        .set('Content-Type', 'application/json'); 
 
        return this.http.post<IssueRelation>(`/issues/${issueId}/relations.json`,`{"relation":${JSON.stringify(data)}}`,{headers});
    }
  

    
    public getById(id:number): Observable<IssueRelation> {
    
        const headers = new HttpHeaders() 
        .set('Content-Type', 'application/json'); 
 
        return this.http.get<IssueRelation>(`/relations/${id}.json`,{headers});
    }

    public delete(id:number): Observable<void> {
    
        const headers = new HttpHeaders() 
        .set('Content-Type', 'application/json'); 
 
        return this.http.delete<void>(`/relations/${id}.json`,{headers});
    }

}
