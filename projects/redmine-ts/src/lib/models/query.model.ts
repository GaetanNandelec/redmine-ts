import { UserSimplified } from "./user.model";
import { ResultWrapper } from "./pagination.model";
import { ProjectSimplified } from "./project.model";
import { RoleSimplified } from "./role.model"; 

export interface QueryResultWrapper extends ResultWrapper{

    queries:Query[]; 
}

export interface Query {
    id: number;
    name:string;
    is_public:boolean;
    project_id:number; 
  
}

 