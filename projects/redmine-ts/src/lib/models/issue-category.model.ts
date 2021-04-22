import { ResultWrapper } from "./pagination.model";
import { ProjectSimplified } from "./project.model";
import { UserSimplified } from "./user.model";


export interface IssueCategoryResultWrapper extends ResultWrapper{

    issue_categories:IssueCategory[]; 
}


export interface IssueCategory {
    id:         number;
    project: ProjectSimplified
    name:       string;
    assigned_to : UserSimplified; 
}


export interface IssueCategorySimplified {
    id:         number;
    name:       string;
}

export interface IssueCategoryAddRequest {
    name:       string;
    assigned_to_id:number;
}