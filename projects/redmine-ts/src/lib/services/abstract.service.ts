import { Pagination } from "../models/pagination.model";

export abstract class AbstractService {
 

 buildPagination(pagination?:Pagination):string{
    let pagination_parameters: string[]=[];
    if(pagination){
      if(pagination.limit){
        pagination_parameters.push('limit='+pagination.limit);
      }
      if(pagination.offset){
        pagination_parameters.push('offset='+pagination.offset);
      }
      if(pagination.sort){
        if(pagination.sortDesc){
          pagination_parameters.push('sort='+pagination.sort+':desc');
        }
        else{
          pagination_parameters.push('sort='+pagination.sort);
        }
      }
    }

    return pagination_parameters.join("&");

 }

}
