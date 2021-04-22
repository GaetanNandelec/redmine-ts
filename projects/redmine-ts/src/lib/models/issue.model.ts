import { DocumentCategorySimplified } from "./category.model";
import { CustomFieldSimplified } from "./customfield.model"; 
import { IssueAttachement, RedmineFileUpload } from "./file.model";
import { UserSimplified } from "./user.model";
import { IssuePrioritySimplified } from "./issue-priority.model";
import { IssueStatusSimplified } from "./issue-status.model";
import { ResultWrapper } from "./pagination.model";
import { ProjectSimplified } from "./project.model";
import { TrackerSimplified } from "./tracker.model"; 
import { VersionSimplified } from "./version.model";
import { IssueCategorySimplified } from "./issue-category.model";

export interface IssueResultWrapper extends ResultWrapper{

    issues:Issue[]; 
}

export interface Issue {
    id: number;
    project: ProjectSimplified;
    tracker: TrackerSimplified; 
    status: IssueStatusSimplified;
    priority: IssuePrioritySimplified;
    author: UserSimplified;
    assigned_to: UserSimplified;
    category:IssueCategorySimplified
    fixed_version: VersionSimplified;
    parent:IssueSimplified;

    subject: string;
    description: string;
    start_date: string;
    due_date?: any;
    done_ratio: number;
    is_private: boolean;
    estimated_hours?: any;

    custom_fields?:CustomFieldSimplified[];

    created_on: Date;
    updated_on: Date;
    closed_on?: any;

    attachments?:IssueAttachement[];
    relations?:Relation[];
    changesets?:ChangeSet[];
    journals?:Journal[];
    watchers?:Watcher[];
 
}

export interface IssueCreate {
    project_id:number;
    tracker_id:number;
    status_id:number;
    priority_id?:number;
    subject:string;
    description:string;
    category_id?:number;
    fixed_version_id?:number;
    assigned_to_id?:number;
    parent_issue_id?:number;
    custom_fields?:CustomFieldSimplified[];
    watcher_user_ids?:number[];
    is_private?:boolean
    estimated_hours?:number;
    uploads?:RedmineFileUpload[]; 
 
}

export interface IssueSimplified {
    id: number;
    
}

interface Relation {
    id: number;
    issue_id: number;
    issue_to_id: number;
    relation_type: string;
    delay: string;
}

interface ChangeSet {
    user: UserSimplified;
    comments: string;
    committed_on: Date;
    
}

interface Journal {
    user: UserSimplified;
    notes: string;
    created_on: Date;
    private_notes: boolean;
    details:JournalDetail[];
    
}

interface JournalDetail {
    property: string;
    name: string;
    old_value: string;
    new_value: string;
    
}

interface Watcher {
    user: UserSimplified;
    
}


export interface IssueUpdate extends IssueCreate {

    notes:string;
    private_notes:boolean
 
 
}

export interface IssueRequestFilter {
 
    
}


