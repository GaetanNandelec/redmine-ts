import { Component, OnInit } from '@angular/core'; 
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnabledModule,CustomfieldService, EnumerationsService, FileService, GroupService, UserAccount, IssueCreate, IssuesService, IssueUpdate, LoginService, MembershipAddRequest, MembershipService, Pagination, Project, ProjectCreate, ProjectService, RoleService, UserService, UserChangeRequest, TimeEntryService, ProjectResultWrapper, IssueStatusResultWrapper, TrackerResultWrapper, IssueStatusesService, TrackersService, CustomField } from 'projects/redmine-ts/src/public-api';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  user: UserAccount;

  projectModules: EnabledModule[];
  
  projectsWrapper: ProjectResultWrapper;
  currentProject:Project;

  projectCreationForm: FormGroup;
  projectCreation = false;
  projectCreationSubmitted= false;

  trackerResultWrapper:TrackerResultWrapper

  customFields:CustomField[];

  constructor(private formBuilder: FormBuilder, private loginService: LoginService,  private projectService: ProjectService
    ,private trackerService: TrackersService,private customfieldService: CustomfieldService) {

    this.loginService.currentUser.subscribe(x => this.user = x);
  }

  minLengthArray(min: number) {
    return (c: AbstractControl): {[key: string]: any} => {
        if (c.value.length >= min)
            return null;

        return { 'minLengthArray': {valid: false }};
    }
}

  ngOnInit(): void {
    this.projectService.getAll().subscribe(projectsWrapper => { 
      this.projectsWrapper = projectsWrapper;
    });

    this.customfieldService.getAll().subscribe(customFields=>{
      this.customFields=customFields;
    });

    this.trackerService.getAll().subscribe(result =>{
      this.trackerResultWrapper=result;
    });

    this.projectCreationForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      homepage: [undefined],
      is_public: [false],
      parent_id: [undefined],
      inherit_members: [false],
      default_assigned_to_id: [undefined],
      default_version_id: [undefined],
  
      tracker_ids: [undefined],
      enabled_module_names: [ [] , this.minLengthArray(1)],
      issue_custom_field_ids: [undefined],

    });

    this.projectModules= this.projectService.getProjectModules();
  }

 
  get f_project_creation() { return this.projectCreationForm.controls; }
 
  
  onProjectCreationSubmit() {

    this.projectCreationSubmitted = true;
 
    // stop here if form is invalid
    if (this.projectCreationForm.invalid) {
      return;
    }
 
    const enabled_module_names= this.f_project_creation.enabled_module_names.value.map(element => element.name);
    
    const project: ProjectCreate = {
      name: this.f_project_creation.name.value,
      identifier: this.f_project_creation.name.value.replace(/\s+/g, "-"),
      description: this.f_project_creation.description.value,
      homepage:this.f_project_creation.homepage.value,
      is_public:this.f_project_creation.is_public.value,
      parent_id: this.f_project_creation.parent_id.value,
      inherit_members:this.f_project_creation.inherit_members.value,
      default_assigned_to_id: this.f_project_creation.default_assigned_to_id.value,
      default_version_id: this.f_project_creation.default_version_id.value,
      tracker_ids: this.f_project_creation.tracker_ids.value,
      enabled_module_names:enabled_module_names.join(','),
      issue_custom_field_ids: this.f_project_creation.issue_custom_field_ids.value
    };

    Object.keys(project).forEach(key=>{
      if(!Boolean(project[key])) delete project[key];
    });

    this.projectService.create(project).subscribe(data => {
      this.projectCreationSubmitted = false;
      this.projectService.getAll().subscribe(projectsWrapper => { 
        this.projectsWrapper = projectsWrapper;
      });
    })
  }
 

  loadProjectById(projectId: number) {
    this.projectService.getById(projectId).subscribe(project => {
      console.log("Project", project);
      this.currentProject=project;
    })
  }

  addProject(){
    this.projectCreation=true;
  }
  
  deleteProject(projectId: number) {
    this.projectService.delete(projectId).subscribe(data => {
      this.currentProject=undefined;
      this.projectsWrapper.projects=this.projectsWrapper.projects.filter(project => project.id !== projectId);
    })
  }

 

}
