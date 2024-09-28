import { titlesCaches } from '@config/titlesCaches';
import { IAccountRepository } from '@modules/accounts/repositories/IAccountsRepository';
import { inject, injectable } from 'tsyringe';
import { redisPreConfigured } from '../../../../cache-mgmt/cacheMgmtConfig';
import { IUsersRepository } from '../../../users/repositories/IUsersRepository';
import { Statement } from '../../entities/Statement';
import { IStatementsRepository } from '../../repositories/IStatementsRepository';
import { GetBalanceError } from './GetBalanceError';
interface IRequest {
  user_id: string;
  account_id: string;
}

interface IResponse {
  statement: Statement[];
  balance: number;
}

@injectable()
export class GetBalanceUseCase {
  constructor(
    @inject('StatementsRepository')
    private statementsRepository: IStatementsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AccountsRepository')
    private accountsRepository: IAccountRepository
  ) {}

  async execute({ user_id, account_id }: IRequest): Promise<IResponse> {
    const account = await this.accountsRepository.findById(account_id);
    console.log('account', account);

    if (!account) {
      throw new GetBalanceError.AccountNotFound();
    }

    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new GetBalanceError.UserNotFound();
    }

    // TODO: return tag with id, description and url_icon;
    const balance = await this.statementsRepository.getUserBalance({
      user_id,
      with_statement: true,
      account_id,
    });

    await redisPreConfigured.set(
      titlesCaches.USER_BALANCE,
      JSON.stringify(balance),
      'EX',
      3600
    ); // Cache for 1 hour

    return balance as IResponse;
  }
}
