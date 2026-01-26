import { PaginationDto } from '../dtos/pagination.dto';

export function paginationSolver(paginationDto: PaginationDto) {
  let { page = 1, limit = 10 } = paginationDto;

  page = page > 0 ? page : 1;
  limit = limit > 0 ? limit : 10;

  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip
  };
}

export function paginationGenerator(count: number, limit: number, page: number) {
  const totalPages = Math.ceil(count / limit);

  return {
    totalPages,
    page,
    limit,
    // count,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  };
}
