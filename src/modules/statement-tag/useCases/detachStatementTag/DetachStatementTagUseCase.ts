import { IStatementTagsRepository } from '@modules/statement-tag/repositories/IStatementTagsRepository';
import { IStatementsRepository } from '@modules/statements/repositories/IStatementsRepository';
import { inject, injectable } from 'tsyringe';
import { DetachStatementTagError } from './DetachStatementTagError';
import { IDetachStatementTagDTO } from './IDetachStatementTagDTO';

@injectable()
export class DetachStatementTagUseCase {
  constructor(
    @inject('StatementTagsRepository')
    private statementTagRepository: IStatementTagsRepository,

    @inject('StatementsRepository')
    private statementsRepository: IStatementsRepository
  ) {}
  async execute({
    statement_id,
    tag_id,
  }: IDetachStatementTagDTO): Promise<void> {
    const statement = await this.statementsRepository.findById(statement_id);

    if (!statement) {
      throw new DetachStatementTagError.StatementNotFound();
    }

    const statementTag = await this.statementTagRepository.findById(tag_id);

    if (!statementTag) {
      throw new DetachStatementTagError.StatementTagNotFound();
    }

    const hasTag = statement.tag_id === tag_id;
    if (!hasTag) {
      throw new DetachStatementTagError.StatementTagNotFound();
    }

    statement.tag_id = null;

    await this.statementsRepository.save(statement);
  }
}
