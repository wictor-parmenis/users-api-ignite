import { inject, injectable } from 'tsyringe';

import { IAccountRepository } from '@modules/accounts/repositories/IAccountsRepository';
import { IUsersRepository } from '../../../users/repositories/IUsersRepository';
import { CreateAccountError } from './CreateAccountError';
import { ICreateAccountDTO } from './ICreateAccountDTO';

@injectable()
export class CreateAccountUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AccountsRepository')
    private accountsRepository: IAccountRepository
  ) {}

  async execute({
    user_id,
    icon,
    title,
    amount,
    description,
  }: ICreateAccountDTO) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new CreateAccountError.UserNotFound();
    }

    const createAccountResult = await this.accountsRepository.create({
      user_id,
      icon,
      title,
      description,
      amount,
    });

    return createAccountResult;
  }
}
