import { StatementTags } from '@modules/statement-tag/entities/StatementTag';
import { IStatementTagRepository } from '@modules/statement-tag/repositories/IStatementTagRepository';
import { inject, injectable } from 'tsyringe';
import { CreateStatementTagError } from './CreateStatementTagError';
import { ICreateStatementTagDTO } from './ICreateStatementTagDTO';

@injectable()
export class CreateStatementTagUseCase {
  constructor(
    @inject('StatementTagRepository')
    private statementTagRepository: IStatementTagRepository
  ) {}

  async execute({
    user_id,
    description,
  }: ICreateStatementTagDTO): Promise<StatementTags> {
    const statementTagAlreadyExists =
      await this.statementTagRepository.findByDescription(description);

    if (statementTagAlreadyExists) {
      throw new CreateStatementTagError.StatementTagAlreadyExists();
    }

    const statementTag = await this.statementTagRepository.create({
      user_id,
      description,
    });

    return statementTag;
  }
}
