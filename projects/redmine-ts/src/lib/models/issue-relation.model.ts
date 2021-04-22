import { UserSimplified } from "./user.model";
import { ResultWrapper } from "./pagination.model";
import { ProjectSimplified } from "./project.model";
import { RoleSimplified } from "./role.model"; 

export interface IssueRelation {
    id: number; 
    issue_id: number; 
    issue_to_id: number; 
    relation_type: string;
    delay: string;
  
}

 
export interface IssueRelationChangeRequest {
    issue_to_id: number; 
    relation_type: string;
    delay: string;
  
}
