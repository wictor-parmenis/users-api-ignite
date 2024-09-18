import { getRepository, Repository } from 'typeorm';
import { Account } from '../entities/Account';
import { ICreateAccountDTO } from '../useCases/createAccount/ICreateAccountDTO';
import { IAccountRepository } from './IAccountsRepository';

export class AccountsRepository implements IAccountRepository {
  private repository: Repository<Account>;

  constructor() {
    this.repository = getRepository(Account);
  }

  async create({
    user_id,
    description,
    icon,
    title,
    amount,
  }: ICreateAccountDTO): Promise<Account> {
    const account = this.repository.create({
      user_id,
      icon,
      description,
      title,
      amount,
    });

    return this.repository.save(account);
  }

  async findById(id: string): Promise<Account> {
    return this.repository.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async update(account: Account): Promise<Account> {
    return this.repository.save(account);
  }

  async list(): Promise<Account[]> {
    return this.repository.find();
  }

  async show(id: string): Promise<Account> {
    return this.repository.findOne(id);
  }
}
