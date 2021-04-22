import { CustomFieldSimplified } from "./customfield.model";

export interface DocumentCategory {
    id: number;
    name: string;
    is_default: boolean;
    active:boolean;
    custom_fields: CustomFieldSimplified[];
}

export interface DocumentCategorySimplified {
    id: number;
    name: string;
}