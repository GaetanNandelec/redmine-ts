import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        let currentUser = JSON.parse(localStorage.getItem('redmine-ts-currentUser'));
        
        if (currentUser && currentUser.api_key) {
            request = request.clone({
                setHeaders: { 
                    'X-Redmine-API-Key': `${currentUser.api_key}`
                }
            });
        }

        return next.handle(request);
    }
}