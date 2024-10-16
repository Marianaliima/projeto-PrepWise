export abstract class GenericRepository<T> {
  // Método para criar um novo registro
  abstract create(entity: T): Promise<T>;

  // Método para buscar um registro por ID
  abstract findOne(id: string): Promise<T | null>;

  // Método para buscar todos os registros
  abstract findAll(): Promise<T[]>;

  // Método para atualizar um registro específico
  abstract update(id: string, entity: Partial<T>): Promise<T>;

  // Método para remover um registro específico
  abstract remove(id: string): Promise<void>;

  // Método para salvar (criar ou atualizar) um registro
  abstract save(entity: T): Promise<T>;
}
