import { IssueStatusSimplified } from "./issue-status.model";
import { ResultWrapper } from "./pagination.model";

export interface TrackerSimplified {
    id: number;
    name: string;
 
}

export interface TrackerResultWrapper extends ResultWrapper{

    trackers  :Tracker[]; 
}

export interface Tracker {
    id:         number;
    name:       string;
    description:       string;
    default_status : IssueStatusSimplified; 
}

 