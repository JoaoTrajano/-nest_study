export interface Client {
  findAll<T>(entity: any): Promise<T[]>;
  findById<T>(entity: any, id: number): Promise<T | null>;
  create<T>(entity: any, data: Partial<T>): Promise<T>;
  update<T>(entity: any, data: Partial<T>): Promise<T>;
  delete<T>(id: number): Promise<T>;
}
