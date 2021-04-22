import { CustomFieldSimplified } from "./customfield.model";

export interface IssuePriority {
    id: number;
    name: string;
    is_default: boolean;
    active:boolean;
    custom_fields: CustomFieldSimplified[];
}


export interface IssuePrioritySimplified {
    id: number;
    name: string;
}
