import { Statement } from '../entities/Statement';
import { ICreateStatementDTO } from '../useCases/createStatement/ICreateStatementDTO';
import { IGetBalanceDTO } from '../useCases/getBalance/IGetBalanceDTO';
import { IGetStatementOperationDTO } from '../useCases/getStatementOperation/IGetStatementOperationDTO';

export interface IStatementsRepository {
  create: (data: ICreateStatementDTO) => Promise<Statement>;
  save: (statement: Statement) => Promise<Statement>;
  findById: (id: string) => Promise<Statement | undefined>;
  findStatementOperation: (
    data: IGetStatementOperationDTO
  ) => Promise<Statement | undefined>;
  getUserBalance: (
    data: IGetBalanceDTO
  ) => Promise<
    { balance: number } | { balance: number; statement: Statement[] }
  >;
  findStatementByTag: (tag_id: string) => Promise<Statement[]>;
}
