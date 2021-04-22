import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pagination } from '../models/pagination.model';
import { EnabledModule, Project, ProjectCreate, ProjectResultWrapper } from '../models/project.model';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService  extends AbstractService {
 
  constructor(private http: HttpClient) { super(); }

  public getAll( pagination?:Pagination): Observable<ProjectResultWrapper> {
    let pagination_query=super.buildPagination(pagination);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.get<ProjectResultWrapper>(`/projects.json?include=trackers,issue_categories,enabled_modules&${pagination_query}`, { headers });
  }


  public create(project:ProjectCreate): Observable<Project> {

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    return this.http.post<Project>('/projects.json',`{"project":${JSON.stringify(project)}}`, { headers }).pipe(
      map(result => {
        return result['project'];
      })
    );
  }

  public getById(id:number): Observable<Project> {

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.get<Project>(`/projects/${id}.json?include=trackers,issue_categories,enabled_modules`, { headers }).pipe(
      map(result => {
        return result['project'];
      })
    );
  }

  public update(id:number,project:Project): Observable<void> {

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.put<void>(`/projects/${id}.json`,`{"project":${JSON.stringify(project)}}`, { headers });
  }

  public delete(id:number): Observable<void> {

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.delete<void>(`/projects/${id}.json`, { headers });
  }


  public getProjectModules(): EnabledModule[] {

    return [
      { id: 1, label: "Issue tracking",name:"issue_tracking" },
      { id: 2, label: "Time tracking",name:"time_tracking" },
      { id: 3, label: "News",name:"news" },
      { id: 4, label: "Documents",name:"documents" },
      { id: 5, label: "Files",name:"files" },
      { id: 6, label: "Wiki",name:"wiki" },
      { id: 7, label: "Repository",name:"repository" },
      { id: 8, label: "Forums",name:"boards" },
      { id: 9, label: "Calendar",name:"calendar" },
      { id: 10, label: "Gantt",name:"gantt" }
  ];
  }

}
