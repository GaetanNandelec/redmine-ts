import { ResultWrapper } from "./pagination.model";

export interface CustomField {
    id:              number;
    name:            string;
    customized_type: string;
    field_format:    string;
    regexp:          string;
    min_length:      number;
    max_length:      number;
    is_required:     boolean;
    is_filter:       boolean;
    searchable:      boolean;
    multiple:        boolean;
    default_value:   string;
    visible:         boolean;
    possible_values: PossibleValue[];

    //TODO roles: []
    //TODO trackers: []
    
}

export interface PossibleValue {
    value: string;
}


export interface CustomFieldSimplified{
    id: number;
    name: string; 
    value: string;
}
