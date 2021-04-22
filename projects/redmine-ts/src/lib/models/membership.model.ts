import { UserSimplified } from "./user.model";
import { ResultWrapper } from "./pagination.model";
import { ProjectSimplified } from "./project.model";
import { RoleSimplified } from "./role.model"; 

export interface MembershipResultWrapper extends ResultWrapper{

    memberships:Membership[]; 
}



export interface Membership {
    id: number;
    project:ProjectSimplified
    user: UserSimplified
    roles: RoleSimplified[];
  
}


export interface MembershipAddRequest {
    user_id: number;
    role_ids : number[];
  
}