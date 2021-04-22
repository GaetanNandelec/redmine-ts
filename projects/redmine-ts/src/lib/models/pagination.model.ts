
export interface  ResultWrapper{

    limit:number;
    offset:number;
    total_count:number;
}

export interface Pagination {
    limit?:number;
    offset?:number;
    sort?:string;
    sortDesc?:boolean;
    
}

