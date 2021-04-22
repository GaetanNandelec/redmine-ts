import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DocumentCategory } from '../models/category.model';
import { IssuePriority } from '../models/issue-priority.model';
import { Pagination } from '../models/pagination.model';
import { TimeEntry, TimeEntryActivity, TimeEntryChangeRequest, TimeEntryResultWrapper } from '../models/time-entry.model';
import { AbstractService } from './abstract.service';


@Injectable({
    providedIn: 'root'
})
export class TimeEntryService extends AbstractService {

    constructor(private http: HttpClient) { super(); }


    public getTimeEntryActivities(): Observable<TimeEntryActivity[]> {

        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');
        return this.http.get<TimeEntryActivity[]>('/enumerations/time_entry_activities.json', { headers }).pipe(
            map(result => {
                return result['time_entry_activities'];
            })
        );
    }

    public getAll(pagination?: Pagination): Observable<TimeEntryResultWrapper> {

        let pagination_query = super.buildPagination(pagination);
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');
        return this.http.get<TimeEntryResultWrapper>(`/time_entries.json?${pagination_query}`, { headers });
    }


    public getById(id: number): Observable<TimeEntry> {

        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');
        return this.http.get<TimeEntry>(`/time_entries/${id}.json`, { headers }).pipe(
            map(result => {
                return result['time_entry'];
            })
        );
    }


    public create(data: TimeEntryChangeRequest): Observable<TimeEntry> {

        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');
        return this.http.post<TimeEntry>(`/time_entries.json`,`{"time_entry":${JSON.stringify(data)}}`, { headers }).pipe(
            map(result => {
                return result['time_entry'];
            })
        );
    }


    public update(id:number,data: TimeEntryChangeRequest): Observable<TimeEntry> {

        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');
        return this.http.put<TimeEntry>(`/time_entries/${id}.json`,`{"time_entry":${JSON.stringify(data)}}`, { headers }).pipe(
            map(result => {
                return result['time_entry'];
            })
        );
    }


    public delete(id:number): Observable<void> {

        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');
        return this.http.delete<void>(`/time_entries/${id}.json`, { headers });
    }

}
