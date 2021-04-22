import { CustomFieldSimplified } from "./customfield.model";
import { IssueSimplified } from "./issue.model";
import { ResultWrapper } from "./pagination.model";
import { ProjectSimplified } from "./project.model";
import { UserSimplified } from "./user.model";


export interface TimeEntryResultWrapper extends ResultWrapper{

    time_entries:TimeEntry[]; 
}


export interface TimeEntryActivity {
    id: number;
    name: string;
    is_default: boolean;
    active:boolean;
    custom_fields: CustomFieldSimplified[];
}

export interface TimeEntryActivitySimplified {
    id: number;
    name: string;
}


export interface TimeEntry{
    id: number;
    project: ProjectSimplified;
    issue: IssueSimplified;
    user:UserSimplified;
    activity:TimeEntryActivitySimplified
    hours: number;
    comments: string;
    spent_on:Date;
    created_on:Date;
    updated_on:Date;
    custom_fields: CustomFieldSimplified[];
}


export interface TimeEntryChangeRequest{ 
    issue_id: number;
    project_id: number;
    spent_on:Date;
    hours: number;
    activity_id: number;
    comments: string;
    user_id: number;
}

