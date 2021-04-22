import { ResultWrapper } from "./pagination.model";


export interface IssueStatusResultWrapper extends ResultWrapper{

    issue_statuses :IssueStatus[]; 
}

export interface IssueStatus {
    id:         number;
    name:       string;
    is_closed:  boolean;
}


export interface IssueStatusSimplified {
    id:         number;
    name:       string;
}
