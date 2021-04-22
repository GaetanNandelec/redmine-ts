import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';
import { DocumentCategory } from '../models/category.model';
import { IssuePriority } from '../models/issue-priority.model';
import { TimeEntryActivity } from '../models/time-entry.model';
 

@Injectable({
  providedIn: 'root'
})
export class EnumerationsService {

  constructor(private http: HttpClient) {}

    public getIssuePriorities (): Observable<IssuePriority[]> {

        const headers = new HttpHeaders() 
        .set('Content-Type', 'application/json'); 
        return this.http.get<IssuePriority[]>('/enumerations/issue_priorities.json',{headers}).pipe(
            map(result => {
              return result['issue_priorities']; 
            })
          );
    }

    public getTimeEntryActivities (): Observable<TimeEntryActivity[]> {

        const headers = new HttpHeaders() 
        .set('Content-Type', 'application/json'); 
        return this.http.get<TimeEntryActivity[]>('/enumerations/time_entry_activities.json',{headers}).pipe(
            map(result => {
              return result['time_entry_activities']; 
            })
          );
    }

    public getDocumentCategories (): Observable<DocumentCategory[]> {

        const headers = new HttpHeaders() 
        .set('Content-Type', 'application/json'); 
        return this.http.get<DocumentCategory[]>('/enumerations/document_categories.json',{headers}).pipe(
            map(result => {
              return result['document_categories']; 
            })
          );
    }

}
