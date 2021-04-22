import { ResultWrapper } from "./pagination.model";

export interface Role {
    id: number;
    name: string;
    assignable: boolean;
    issues_visibility: string;
    permissions: string[];
    time_entries_visibility: string;
    users_visibility: string;
 
}


export interface RoleSimplified {
    id: number;
    name: string;
    inherited:boolean;
 
}


export interface RoleResultWrapper extends ResultWrapper{

    roles:Role[]; 
}
