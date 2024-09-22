import { StatementTags } from '@modules/statement-tag/entities/StatementTag';
import { IStatementTagsRepository } from '@modules/statement-tag/repositories/IStatementTagsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import { ListStatementTagsByUserIdError } from './ListStatementTagsByUserIdError';

@injectable()
export class ListStatementTagsByUserIdUseCase {
  constructor(
    @inject('StatementTagsRepository')
    private statementTagsRepository: IStatementTagsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(user_id: string): Promise<StatementTags[]> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new ListStatementTagsByUserIdError.UserNotFound();
    }
    const statementTags =
      await this.statementTagsRepository.findByUserId(user_id);

    return statementTags;
  }
}
