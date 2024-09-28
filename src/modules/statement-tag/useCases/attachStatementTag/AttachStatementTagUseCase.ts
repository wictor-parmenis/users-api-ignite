import { IStatementTagsRepository } from '@modules/statement-tag/repositories/IStatementTagsRepository';
import { IStatementsRepository } from '@modules/statements/repositories/IStatementsRepository';
import { inject, injectable } from 'tsyringe';
import { AttachStatementTagError } from './AttachStatementTagError';
import { IAttachStatementTagDTO } from './IAttachStatementTagDTO';

@injectable()
export class AttachStatementTagUseCase {
  constructor(
    @inject('StatementTagsRepository')
    private statementTagRepository: IStatementTagsRepository,

    @inject('StatementsRepository')
    private statementsRepository: IStatementsRepository
  ) {}
  async execute({
    statement_id,
    tag_id,
  }: IAttachStatementTagDTO): Promise<void> {
    const statement = await this.statementsRepository.findById(statement_id);

    if (!statement) {
      throw new AttachStatementTagError.StatementNotFound();
    }

    const statementTag = await this.statementTagRepository.findById(tag_id);

    if (!statementTag) {
      throw new AttachStatementTagError.StatementTagNotFound();
    }

    statement.tag_id = tag_id;

    await this.statementsRepository.save(statement);
  }
}
