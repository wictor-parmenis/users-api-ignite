import { Account } from '../entities/Account';
import { ICreateAccountDTO } from '../useCases/createAccount/ICreateAccountDTO';

export interface IAccountRepository {
  create: (data: ICreateAccountDTO) => Promise<Account>;
  update: (account: Partial<Account>) => Promise<Account>;
  delete: (id: string) => Promise<void>;
  list: () => Promise<Account[]>;
  show: (id: string) => Promise<Account>;
  findById: (id: string) => Promise<Account>;
  findByTitle: (title: string) => Promise<Account>;
}
