import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';
import { CustomField } from '../models/customfield.model';
import { Pagination } from '../models/pagination.model';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class CustomfieldService extends AbstractService{

  constructor(private http: HttpClient) { super(); }

    public getAll(pagination?:Pagination): Observable<CustomField[]> {
      let pagination_query=super.buildPagination(pagination);
        const headers = new HttpHeaders() 
        .set('Content-Type', 'application/json'); 
        return this.http.get<CustomField[]>(`/custom_fields.json?${pagination_query}`,{headers}).pipe(
          map(result => {
            return result['custom_fields'];
          })
        );
    }
 
}
