import { inject, injectable } from 'tsyringe';

import { Account } from '@modules/accounts/entities/Account';
import { IAccountRepository } from '@modules/accounts/repositories/IAccountsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IListAccountsDTO } from './IListAccountsDTO';
import { ListAccountsError } from './ListAccountsError';

@injectable()
export class ListAccountUseCase {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id }: IListAccountsDTO): Promise<Account[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new ListAccountsError.UserNotFound();
    }

    const listAccountsResult = await this.accountsRepository.list();

    return listAccountsResult;
  }
}
