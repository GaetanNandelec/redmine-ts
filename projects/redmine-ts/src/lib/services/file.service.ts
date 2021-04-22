import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators'; 
import { Attachement, RedmineFile, RedmineFileUpload } from '../models/file.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) {}

    public getAllForProjectId(projectId:number): Observable<RedmineFile[]> {

        const headers = new HttpHeaders() 
        .set('Content-Type', 'application/json'); 
        return this.http.get<RedmineFile[]>(`/projects/${projectId}/files.json`,{headers}).pipe(
            map(result => {
              return result['files']; 
            })
          );
    }

    public addFileToProject(id:number,fileUpload:RedmineFileUpload): Observable<RedmineFile[]> {

        const headers = new HttpHeaders() 
        .set('Content-Type', 'application/json'); 
        return this.http.post<RedmineFile[]>(`/projects/${id}/files.json`,`{"file":${JSON.stringify(fileUpload)}}`,{headers});
    }


    public uploadFile(fileToUpload: File): Observable<RedmineFileUpload> {
        const headers = new HttpHeaders()
          .set("Content-Type", "application/octet-stream");
    
        return this.http.post<RedmineFileUpload>(`/uploads.json?filename=${fileToUpload.name}`, fileToUpload, { headers }).pipe(
          map(result => { 
            var data: RedmineFileUpload = result['upload'];
            data.content_type = fileToUpload.type;
            data.filename = fileToUpload.name;
            return data;
    
          })
        );
      }


      public getAttachementById(id:number): Observable<Attachement> {

        const headers = new HttpHeaders() 
        .set('Content-Type', 'application/json'); 
        return this.http.get<Attachement>(`/attachments/${id}.json`,{headers});
    }

    
    public updateAttachement(): void {
      //TODO 
  }

  
  public deleteAttachement(id:number): Observable<void> {

    const headers = new HttpHeaders() 
    .set('Content-Type', 'application/json'); 
    return this.http.delete<void>(`/attachments/${id}.json`,{headers});
}
 
}

