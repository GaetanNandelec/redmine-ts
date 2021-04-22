import { CustomFieldSimplified } from "./customfield.model";
import { ResultWrapper } from "./pagination.model";
import { ProjectSimplified } from "./project.model";

export interface VersionResultWrapper extends ResultWrapper{

    versions:Version[]; 
}

export interface Version {
    id:              string;
    project:         ProjectSimplified;
    name:            string;
    description:     string;
    status:          string;
    due_date:        Date;
    sharing:         string;
    created_on:      Date;
    updated_on:      Date;
    wiki_page_title: string;
    custom_fields: CustomFieldSimplified[];
}
 
export interface VersionChangeRequest {
    name:            string;
    status:            string;
    sharing:            string;
    due_date:        Date;
    description:            string;
    wiki_page_title:            string;
}
 


export interface VersionSimplified {
    id: number;
    name: string;
 
}