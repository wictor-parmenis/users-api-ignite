import { inject, injectable } from 'tsyringe';

import { Account } from '@modules/accounts/entities/Account';
import { IAccountRepository } from '@modules/accounts/repositories/IAccountsRepository';
import { IUpdateAccountDTO } from './IUpdateAccountDTO';
import { UpdateAccountError } from './UpdateAccountError';

@injectable()
export class UpdateAccountUseCase {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountRepository
  ) {}

  async execute({
    id,
    amount,
    description,
    icon,
    title,
    user_id,
  }: IUpdateAccountDTO): Promise<Account> {
    const account = await this.accountsRepository.findById(id);

    if (!account) {
      throw new UpdateAccountError.AccountNotFound();
    }

    if (account.user_id !== user_id) {
      throw new UpdateAccountError.UserNotAllowed();
    }

    const updateAccountResult = await this.accountsRepository.update({
      amount: amount || account.amount,
      description: description || account.description,
      icon: icon || account.icon,
      title: title || account.title,
      user_id: account.user_id,
      id,
    });

    return updateAccountResult;
  }
}
