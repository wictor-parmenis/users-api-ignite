import { StatementTags } from '@modules/statement-tag/entities/StatementTag';
import { IStatementTagsRepository } from '@modules/statement-tag/repositories/IStatementTagsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import { IUpdateStatementTagDTO } from './IUpdateStatementTagDTO';
import { UpdateStatementTagError } from './UpdateStatementTagError';

@injectable()
export class UpdateStatementTagUseCase {
  constructor(
    @inject('StatementTagRepository')
    private statementTagRepository: IStatementTagsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    user_id,
    description,
    tag_id,
  }: IUpdateStatementTagDTO): Promise<StatementTags> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new UpdateStatementTagError.UserNotFound();
    }

    const statementTagExists =
      await this.statementTagRepository.findById(tag_id);

    if (!statementTagExists) {
      throw new UpdateStatementTagError.StatementTagNotFound();
    }

    const statementTag = await this.statementTagRepository.update({
      description,
      created_at: statementTagExists.created_at,
      statements: statementTagExists.statements,
      updated_at: new Date(),
      user_id: statementTagExists.user_id,
      user: statementTagExists.user,
      id: statementTagExists.id,
    });

    return statementTag;
  }
}
