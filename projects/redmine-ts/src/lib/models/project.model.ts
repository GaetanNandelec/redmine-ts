import { CustomFieldSimplified } from "./customfield.model";
import { IssueCategorySimplified } from "./issue-category.model";
import { ResultWrapper } from "./pagination.model";
import { TrackerSimplified } from "./tracker.model";
import { UserSimplified } from "./user.model";
import { VersionSimplified } from "./version.model";

export interface ProjectResultWrapper extends ResultWrapper{

    projects:Project[]; 
}

export interface Project {
    id: number;
    name: string;
    identifier: string;
    description? : string;
    homepage?: string;
    parent?:ProjectSimplified;
    status: number;
    is_public?:boolean;
    inherit_members?:boolean;
    default_version?:VersionSimplified;
    default_assignee?:UserSimplified;

    custom_fields?: CustomFieldSimplified[];
    
    trackers?:TrackerSimplified[];
    enabled_modules:EnabledModule[];
    issue_categories?:IssueCategorySimplified[];

    created_on: Date;
    updated_on: Date;
}

export interface ProjectCreate {
    name: string;
    identifier: string;
    description?: string;
    homepage?:string;
    is_public?:boolean;
    parent_id?: number;
    inherit_members?:boolean;
    default_assigned_to_id?: number;
    default_version_id?: number;

    tracker_ids?: number[];
    enabled_module_names?:string[];
    issue_custom_field_ids?: number[];
 
}
 
 export interface EnabledModule {
    id: number;
    label: string;
    name:string;
}

export interface ProjectSimplified {
    id: number;
    name: string;
}


