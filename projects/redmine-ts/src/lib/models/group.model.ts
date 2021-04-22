import { CustomFieldSimplified } from "./customfield.model";
import { ResultWrapper } from "./pagination.model";


export interface GroupResultWrapper extends ResultWrapper{

    groups:Group[]; 
}



export interface Group {
    id: number;
    name: string;
    custom_fields: CustomFieldSimplified[];
    users:UserGroup[]
}


export interface UserGroup {
    id: number;
    name: string;
}