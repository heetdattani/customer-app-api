// src/utils/paginationHelper.ts
export interface PaginationResults<T> {
  totalRecords: number;
  totalPage: number;
  page: number;
  result: T[];
}

export function createPaginationResults<T>(
  rows: T[],
  count: number,
  totalCount: number,
  pageNo: number,
  limit: number,
): PaginationResults<T> {
  return {
    totalRecords: count === 0 ? totalCount : count,
    totalPage: Math.ceil(totalCount / limit),
    page: pageNo,
    result: count === 0 ? [] : rows,
  };
}
