import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateStatementTagUseCase } from './CreateStatementTagUseCase';

export class CreateStatementTagController {
  async create(request: Request, response: Response) {
    const { description } = request.body;
    const { id: user_id } = request.user;

    const createStatementTag = container.resolve(CreateStatementTagUseCase);

    const statementTag = await createStatementTag.execute({
      user_id,
      description,
    });
    return response.status(201).json(statementTag);
  }
}
