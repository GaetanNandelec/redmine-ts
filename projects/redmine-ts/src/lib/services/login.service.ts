import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserAccount } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private currentUserSubject: BehaviorSubject<UserAccount>;
  public currentUser: Observable<UserAccount>;

  constructor(private http: HttpClient) {  
    this.currentUserSubject = new BehaviorSubject<UserAccount>(JSON.parse(localStorage.getItem('redmine-ts-currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
 
  public get currentUserValue(): UserAccount {
    return this.currentUserSubject.value;
}

  public login(username:string, password:string):Observable<UserAccount> {
 
    const headers = new HttpHeaders()
              .set('Authorization', 'Basic '+ btoa(username+':'+password))
              .set('Content-Type', 'application/json'); 

    return this.http.get<UserAccount>(`/my/account.json`,{headers})
    .pipe(map(result => { 
      var user = result['user'];
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('redmine-ts-currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
  }));
 }

 logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('redmine-ts-currentUser');
  this.currentUserSubject.next(null);
}

 
}
