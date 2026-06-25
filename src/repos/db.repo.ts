import { Model, ProjectionType, QueryFilter, QueryOptions } from 'mongoose';

type QueryParams<T> = {
  filter?: QueryFilter<T>;
  projection?: ProjectionType<T>;
  options?: QueryOptions<T>;
  path: string | string[];
  select?: string;
  page: number;
  limit: number;
  sort?: any;
};

export class DbRepo<T> {
  constructor(private model: Model<T>) {
    this.model = model;
  }

  async findWithPagination({
    filter,
    projection,
    options,
    path = '',
    select,
    page = 1,
    limit = 20,
    sort,
  }: QueryParams<T>) {
    const skip = (page - 1) * limit;

    const docs = await this.model
      .find(filter, projection, options)
      .populate(path, select)
      .skip(skip)
      .limit(limit)
      .sort(sort);

    return docs;
  }
}
