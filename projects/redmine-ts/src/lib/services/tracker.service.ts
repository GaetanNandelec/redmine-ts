import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { Pagination } from '../models/pagination.model';
import { TrackerResultWrapper } from '../models/tracker.model'; 
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class TrackersService extends AbstractService {

  constructor(private http: HttpClient) { super(); }

  public getAll(pagination?:Pagination): Observable<TrackerResultWrapper> {
    let pagination_query=super.buildPagination(pagination);
      const headers = new HttpHeaders() 
      .set('Content-Type', 'application/json'); 
      return this.http.get<TrackerResultWrapper>(`/trackers.json?${pagination_query}`,{headers});
  }

}
