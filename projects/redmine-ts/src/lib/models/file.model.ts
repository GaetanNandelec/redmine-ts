import { UserSimplified } from "./user.model";

 

export interface RedmineFile {
    id: number;
    filename: string;
    filesize: number;
    content_type: string;
    description: string;
    content_url: string;
    author:Author;
    created_on: Date;
    version:Version;
    digest: string;
    downloads: number;
    
}

interface Author {
    id: number;
    name: string;
}

interface Version {
    id: number;
    name: string;
}

export interface RedmineFileUpload {
   
    token: string;
    version_id: number;
    filename: string;
    description: string;
    content_type:string;
    
}

export interface IssueAttachement { 
    author: UserSimplified;
    content_type: string;
    content_url: string;
    created_on: Date;
    description: string;
    filename: string;
    filesize: number;
    id: number;
    thumbnail_url: string;
}


export interface Attachement { 
    author: UserSimplified;
    content_type: string;
    content_url: string;
    created_on: Date;
    description: string;
    filename: string;
    filesize: number;
    id: number;
}
