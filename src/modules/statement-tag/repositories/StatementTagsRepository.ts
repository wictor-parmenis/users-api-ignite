import { getRepository, Repository } from 'typeorm';
import { StatementTags } from '../entities/StatementTag';
import { ICreateStatementTagDTO } from '../useCases/createStatementTag/ICreateStatementTagDTO';
import { IStatementTagsRepository } from './IStatementTagsRepository';

export class StatementTagsRepository implements IStatementTagsRepository {
  private repository: Repository<StatementTags>;

  constructor() {
    this.repository = getRepository(StatementTags);
  }
  listAll(): Promise<StatementTags[]> {
    throw new Error('Method not implemented.');
  }

  async create({
    user_id,
    description,
  }: ICreateStatementTagDTO): Promise<StatementTags> {
    const statementTag = this.repository.create({
      user_id,
      description,
    });

    return this.repository.save(statementTag);
  }

  async findById(id: string): Promise<StatementTags> {
    return this.repository.findOne(id);
  }

  async findByDescription(description: string) {
    return this.repository.findOne({
      description,
    });
  }

  async findByUserId(userId: string) {
    return this.repository.find({
      where: {
        user_id: userId,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async update(statementTag: StatementTags): Promise<StatementTags> {
    return this.repository.save(statementTag);
  }

  async list(): Promise<StatementTags[]> {
    return this.repository.find();
  }

  async show(id: string): Promise<StatementTags> {
    return this.repository.findOne(id);
  }
}
