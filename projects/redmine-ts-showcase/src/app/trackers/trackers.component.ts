import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrackerResultWrapper } from 'projects/redmine-ts/src/lib/models/tracker.model';
import { TrackersService } from 'projects/redmine-ts/src/lib/services/tracker.service';
import { LoginService, UserAccount } from 'projects/redmine-ts/src/public-api';

@Component({
  selector: 'app-trackers',
  templateUrl: './trackers.component.html',
  styleUrls: ['./trackers.component.css']
}) 
export class TrackersComponent implements OnInit {

  user: UserAccount;
  trackerResultWrapper:TrackerResultWrapper
  
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private trackerService: TrackersService) {
    this.loginService.currentUser.subscribe(x => this.user = x);
   }

  ngOnInit(): void {
    this.trackerService.getAll().subscribe(result =>{
      this.trackerResultWrapper=result;
    });
 
  }

}
