import { RedmineFileUpload } from "./file.model";

export interface WikiPage {
    title:              string;
    parent:WikiPageSimplified;
    version:number;
    created_on: Date;
    updated_on: Date;

}


interface WikiPageSimplified {
    title:              string; 
}


export interface WikiPageCreateRequest {
    text:string;
    comments:string;
    uploads:RedmineFileUpload[];

}


export interface WikiPageUpdateRequest extends WikiPageCreateRequest {
    version:number; 

}
