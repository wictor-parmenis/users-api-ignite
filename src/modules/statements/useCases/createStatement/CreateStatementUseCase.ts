import { inject, injectable } from 'tsyringe';

import { titlesCaches } from '@config/titlesCaches';
import { IAccountRepository } from '@modules/accounts/repositories/IAccountsRepository';
import { redisPreConfigured } from '../../../../cache-mgmt/cacheMgmtConfig';
import { IUsersRepository } from '../../../users/repositories/IUsersRepository';
import { IStatementsRepository } from '../../repositories/IStatementsRepository';
import { CreateStatementError } from './CreateStatementError';
import { ICreateStatementDTO } from './ICreateStatementDTO';

@injectable()
export class CreateStatementUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StatementsRepository')
    private statementsRepository: IStatementsRepository,

    @inject('AccountsRepository')
    private accountsRepository: IAccountRepository
  ) {}

  async execute({
    user_id,
    type,
    amount,
    description,
    account_id,
  }: ICreateStatementDTO) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new CreateStatementError.UserNotFound();
    }

    const account = await this.accountsRepository.findById(account_id);
    console.log('account', account);

    if (!account) {
      throw new CreateStatementError.AccountNotFound();
    }

    if (type === 'withdraw') {
      const { balance } = await this.statementsRepository.getUserBalance({
        user_id,
        account_id,
      });

      if (balance < amount) {
        throw new CreateStatementError.InsufficientFunds();
      }
    }

    const statementOperation = await this.statementsRepository.create({
      user_id,
      type,
      amount,
      description,
      account_id,
    });

    await redisPreConfigured.del(titlesCaches.USER_BALANCE);

    return statementOperation;
  }

  async cleanBalanceUserCache() {}
}
