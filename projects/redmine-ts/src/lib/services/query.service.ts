import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';
import { DocumentCategory } from '../models/category.model';
import { IssuePriority } from '../models/issue-priority.model';
import { QueryResultWrapper } from '../models/query.model';
import { TimeEntryActivity } from '../models/time-entry.model';
 

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private http: HttpClient) {}

    public getAll (): Observable<QueryResultWrapper> {

        const headers = new HttpHeaders() 
        .set('Content-Type', 'application/json'); 
        return this.http.get<QueryResultWrapper>('/queries.json',{headers}) ;
    }

 
}
