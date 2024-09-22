import { StatementTags } from '../entities/StatementTag';
import { ICreateStatementTagDTO } from '../useCases/createStatementTag/ICreateStatementTagDTO';

export interface IStatementTagsRepository {
  create(data: ICreateStatementTagDTO): Promise<StatementTags>;
  listAll(): Promise<StatementTags[]>;
  findById(id: string): Promise<StatementTags>;
  findByUserId(userId: string): Promise<StatementTags[]>;
  findByDescription(description: string): Promise<StatementTags>;
  delete(id: string): Promise<void>;
  update(statementTag: StatementTags): Promise<StatementTags>;
}
