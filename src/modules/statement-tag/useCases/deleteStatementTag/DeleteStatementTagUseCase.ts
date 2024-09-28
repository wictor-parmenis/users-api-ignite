import { IStatementTagsRepository } from '@modules/statement-tag/repositories/IStatementTagsRepository';
import { IStatementsRepository } from '@modules/statements/repositories/IStatementsRepository';
import { inject, injectable } from 'tsyringe';
import { DeleteStatementTagError } from './DeleteStatementTagError';
import { IDeleteStatementTagDTO } from './IDeleteStatementTagDTO';

@injectable()
export class DeleteStatementTagUseCase {
  constructor(
    @inject('StatementTagsRepository')
    private statementTagsRepository: IStatementTagsRepository,

    @inject('StatementsRepository')
    private statementsRepository: IStatementsRepository
  ) {}

  async execute({ user_id, tag_id }: IDeleteStatementTagDTO): Promise<void> {
    const statementTag = await this.statementTagsRepository.findById(tag_id);

    if (!statementTag) {
      throw new DeleteStatementTagError.StatementTagNotFound();
    }

    if (statementTag.user_id !== user_id) {
      throw new DeleteStatementTagError.StatementTagNotFound();
    }

    const statementsWithThisTag =
      await this.statementsRepository.findStatementByTag(tag_id);

    console.log('statementsWithThisTag', statementsWithThisTag);

    if (statementsWithThisTag.length > 0) {
      throw new DeleteStatementTagError.StatementTagStillInUse();
    }

    await this.statementTagsRepository.delete(tag_id);
  }
}
