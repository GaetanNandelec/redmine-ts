import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnabledModule,CustomfieldService, EnumerationsService, FileService, GroupService, UserAccount, IssueCreate, IssuesService, IssueUpdate, LoginService, MembershipAddRequest, MembershipService, Pagination, Project, ProjectCreate, ProjectService, RoleService, UserService, UserChangeRequest, TimeEntryService, ProjectResultWrapper } from 'projects/redmine-ts/src/public-api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'redmine-ts-showcase';
  user: UserAccount;
 
  loginForm: FormGroup;
  loginSubmitted = false;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private enumerationsService: EnumerationsService, private customfieldService: CustomfieldService
    , private groupService: GroupService, private roleService: RoleService, private projectService: ProjectService
    , private fileService: FileService, private issuesService: IssuesService, private membershipService: MembershipService
    , private userService: UserService, private timeEntryService: TimeEntryService) {

    this.loginService.currentUser.subscribe(x => this.user = x);

  }

 
  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: ['admin', Validators.required],
      password: ['admin56420', Validators.required]
    });
 
  }

  get f_login() { return this.loginForm.controls; }

 
  onLoginSubmit() {

    this.loginSubmitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.login(this.f_login.username.value, this.f_login.password.value).subscribe(user => {
      console.log("user", user);
      this.loginSubmitted = false;
    })
  }
 

  logout() {
    this.loginService.logout()
  }


  loadIssuePriorities() {
    this.enumerationsService.getIssuePriorities().subscribe(data => {
      console.log("IssuePriorities", data);

    })
  }

  loadDocumentCategories() {
    this.enumerationsService.getDocumentCategories().subscribe(data => {
      console.log("DocumentCategories", data);

    })
  }

  loadTimeTrackingActivities() {
    this.enumerationsService.getTimeEntryActivities().subscribe(data => {
      console.log("TimeEntryActivities", data);

    })
  }


  loadCustomFields() {
    this.customfieldService.getAll().subscribe(data => {
      console.log("Custumfields", data);
    })
  }

  loadGroups() {
    this.groupService.getAll().subscribe(data => {
      console.log("Groups", data);
    })
  }

  createGroup() {
    this.groupService.create('test2s').subscribe(data => {
      console.log("Groups", data);
    })
  }


  loadGroupById() {
    this.groupService.getById(7).subscribe(data => {
      console.log("Group 7", data);
    })
  }


  updateGroupId() {
    this.groupService.update(7, 'bb').subscribe(data => {
      console.log("Group 7", data);
    })
  }

  deleteGroup() {
    this.groupService.delete(10).subscribe(data => {
      console.log("Group 7", data);
    })
  }



  addUserToGroup() {
    this.groupService.addExistingUserToGroup(7, 6).subscribe(data => {
      console.log("Group 7", data);
    })
  }

  removeUserFromGroup() {
    this.groupService.removeExistingUserFromGroup(7, 6).subscribe(data => {
      console.log("Group 7", data);
    })
  }



  loadRoles() {
    this.roleService.getAll().subscribe(data => {
      console.log("Roles", data);
    })
  }
  loadRoleById() {
    this.roleService.getById(3).subscribe(data => {
      console.log("Roles", data);
    })
  }
 

  loadFilesForProject() {
    this.fileService.getAllForProjectId(1).subscribe(data => {
      console.log("Files 1", data);
    })
  }

  handleFileInput(files: FileList) {

    for (let i = 0; i < files.length; i++) {
      this.fileService.uploadFile(files[i]).subscribe(upload => {

        console.log("upload", upload)
        this.fileService.addFileToProject(1, upload).subscribe(result => {
          console.log("result up;pad", result)
        })

      })
    }

  }


  loadIssues() {
    const pagination: Pagination = {
      limit: 1,
      offset: 1,
      sort: 'subject',
      sortDesc: false
    };

    this.issuesService.getAllByProjectId(1, pagination).subscribe(data => {
      console.log("Issues 1", data);
    })
  }


  loadIssue() {
    this.issuesService.getById(1).subscribe(data => {
      console.log("Issue 1", data);
    })
  }

  createIssue() {

    const modal: IssueCreate = {
      project_id: 1,
      tracker_id: 1,
      status_id: 1,
      subject: 'test',
      description: 'desc'
    };

    this.issuesService.create(modal).subscribe(data => {
      console.log("Issue 1", data);
    })
  }


  updateIssue() {
    const modal: IssueUpdate = {
      project_id: 1,
      tracker_id: 1,
      status_id: 1,
      subject: 'testabbbaab',
      description: 'desc',

      notes: 'fffff',
      private_notes: false
    };

    this.issuesService.update(6, modal).subscribe(data => {
      console.log("Issue 1", data);
    })
  }


  deleteIssue() {
    this.issuesService.delete(5).subscribe(data => {
      console.log("Issue 1", data);
    })
  }


  addWatcherIssue() {
    this.issuesService.addWatcher(1, 5).subscribe(data => {
      console.log("addWatcher", data);
    })
  }

  removeWatcherIssue() {
    this.issuesService.removeWatcher(1, 5).subscribe(data => {
      console.log("removeWatcher", data);
    })
  }

  loadMembershipsForProject() {
    this.membershipService.getAllForProjectId(1).subscribe(data => {
      console.log("loadMembershipsForProject", data);
    })
  }

  addMembershipToProject() {

    const data: MembershipAddRequest = {
      user_id: 1,
      role_ids: [3]
    };

    this.membershipService.addToProject(1, data).subscribe(data => {
      console.log("addMembershipToProject", data);
    })
  }

  getMembershipById() {
    this.membershipService.getById(2).subscribe(data => {
      console.log("getMembershipById", data);
    })
  }

  updateMembership() {

    this.membershipService.update(2, [3]).subscribe(data => {
      console.log("updateMembership", data);
    })
  }

  deleteMembership() {
    this.membershipService.delete(1).subscribe(data => {
      console.log("deleteMembership", data);
    })
  }

  getAllUsers() {
    this.userService.getAll().subscribe(data => {
      console.log("getAllUsers", data);
    })
  }

  createUser() {

    const data: UserChangeRequest = {
      login: 'tessst',
      // password: 'fffff5642!',
      firstname: 'A',
      lastname: 'B',
      mail: 'gaetan.nandelec@gmail.com',
      // auth_source_id: number,
      // mail_notification: string,
      must_change_passwd: false,
      generate_password: true
    };

    this.userService.create(data, true).subscribe(data => {
      console.log("createUser", data);
    })
  }

  getUserById() {

    this.userService.getById(12).subscribe(data => {
      console.log("getUserById", data);
    })
  }

  updateUser() {
    const data: UserChangeRequest = {
      login: 'tessst',
      // password: 'fffff5642!',
      firstname: 'AB',
      lastname: 'BB',
      mail: 'gaetan.nandelec@gmail.com',
      // auth_source_id: number,
      // mail_notification: string,
      must_change_passwd: false,
      generate_password: true
    };

    this.userService.update(12, data).subscribe(data => {
      console.log("updateUser", data);
    })
  }

  deleteUser() {
    this.userService.delete(12).subscribe(data => {
      console.log("deleteUser", data);
    })
  }

  listTimeEntries() {
    this.timeEntryService.getAll().subscribe(data => {
      console.log("listTimeEntries", data);
    })
  }
  showTimeEntry() {
    this.timeEntryService.getById(1).subscribe(data => {
      console.log("showTimeEntry", data);
    })
  }
  updateTimeEntry() {

  }
  deleteTimeEntry() {

  }


  getAllNews() {

  }

  getAllNewsForProjectId() {

  }


  getRelationsForIssue() {

  }

  createRelationForIssue() {

  }

  getRelationById() {

  }

  deleteRelation() {

  }


  getVersionsForProject() {

  }

  createVersionForProject() {

  }

  getVersionById() {

  }

  updateVersionById() {

  }

  deleteVersion() {

  }


  getWikiPagesForProject() {

  }

  getWikiPageForProject() {

  }

  getVersionWikiPageForProject() {

  }

  createWikiPageForProject() {

  }

  updateWikiPageForProject() {

  }

  deleteWikiPage() {

  }


  getAllQueries() {

  }


  getAttachement() {

  }


  updateAttachement() {

  }


  deleteAttachement() {

  }

  getTrackers() {

  }


  loadIssueCategoriesForProject() {

  }

  addIssueCategoryToProject() {

  }

  getIssueCategoryById() {

  }

  updateIssueCategory() {

  }

  deleteIssueCategory() {

  }




}
