import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IssueStatusResultWrapper } from 'projects/redmine-ts/src/lib/models/issue-status.model';
import { IssueStatusesService } from 'projects/redmine-ts/src/lib/services/issue-status.service';
import { LoginService, EnumerationsService, UserAccount } from 'projects/redmine-ts/src/public-api';


@Component({
  selector: 'app-issue-statuses',
  templateUrl: './issue-statuses.component.html',
  styleUrls: ['./issue-statuses.component.css']
})
export class IssueStatusesComponent implements OnInit {

  user: UserAccount;
 
  issueStatusResultWrapper:IssueStatusResultWrapper;
  
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private issueStatusesService: IssueStatusesService) {
    this.loginService.currentUser.subscribe(x => this.user = x);
   }
 
  ngOnInit(): void {
 
    this.issueStatusesService.getAll().subscribe(result =>{
      this.issueStatusResultWrapper=result;
    });
  }
 
}
