import { PaginationDto } from "../dtos/pagination.dto";

/**
 * This function takes a PaginationDto object and returns an object with the
 * required properties for pagination: page, limit and skip.
 * If the page or limit is invalid (less than or equal to 0), it will
 * default to 1 and 10 respectively.
 * @param {PaginationDto} paginationDto - The PaginationDto object to be processed.
 * @returns {Object} - An object with the required properties for pagination.
 */
export function paginationSolver(PaginationDto: PaginationDto) {
 let {page=1, limit = 10} = PaginationDto;
 if(!page || page <= 1) {
    page = 1;
 }
 else {
     page= page -1
 }
 if(!limit || limit <= 0) {
    limit = 10;
 }
 else {
    limit = 10;
 }
 const skip = page * limit;
 return { 
    page :page ===0 ? 1 : page,
    limit,
    skip
  };
}
export function paginationGenerator(count: number, limit: number, page: number) {

  const totalPages = Math.ceil(count / limit);
  return {
    totalPages,
    page: +page,
    limit: +limit,
    pageCount:totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}