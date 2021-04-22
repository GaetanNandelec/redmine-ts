import { UserSimplified } from "./user.model";
import { ResultWrapper } from "./pagination.model";
import { ProjectSimplified } from "./project.model";
import { RoleSimplified } from "./role.model"; 

export interface NewsResultWrapper extends ResultWrapper{

    news:News[]; 
}

export interface News {
    id: number;
    project:ProjectSimplified
    user: UserSimplified
    roles: RoleSimplified[];
  
}

 