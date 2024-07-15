import { inject, injectable } from 'tsyringe';

import { titlesCaches } from '@config/titlesCaches';
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
    private statementsRepository: IStatementsRepository
  ) {}

  async execute({ user_id, type, amount, description }: ICreateStatementDTO) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new CreateStatementError.UserNotFound();
    }

    if (type === 'withdraw') {
      const { balance } = await this.statementsRepository.getUserBalance({
        user_id,
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
    });

    await redisPreConfigured.del(titlesCaches.USER_BALANCE);

    return statementOperation;
  }

  async cleanBalanceUserCache() {}
}
