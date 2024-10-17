export abstract class GenericRepository<T> {
  abstract create(entity: T): Promise<T>;

  abstract findOne(id: string): Promise<T | null>;

  abstract findAll(): Promise<T[]>;

  abstract update(id: string, entity: Partial<T>): Promise<T>;

  abstract remove(id: string): Promise<void>;

  abstract save(entity: T): Promise<T>;
}
