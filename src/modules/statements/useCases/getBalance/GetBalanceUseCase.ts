import { titlesCaches } from '@config/titlesCaches';
import { inject, injectable } from 'tsyringe';
import { redisPreConfigured } from '../../../../cache-mgmt/cacheMgmtConfig';
import { IUsersRepository } from '../../../users/repositories/IUsersRepository';
import { Statement } from '../../entities/Statement';
import { IStatementsRepository } from '../../repositories/IStatementsRepository';
import { GetBalanceError } from './GetBalanceError';
interface IRequest {
  user_id: string;
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
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new GetBalanceError();
    }

    const balance = await this.statementsRepository.getUserBalance({
      user_id,
      with_statement: true,
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
