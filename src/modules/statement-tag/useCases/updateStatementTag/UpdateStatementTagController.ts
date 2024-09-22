import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateStatementTagUseCase } from './UpdateStatementTagUseCase';

export class UpdateStatementTagController {
  async update(request: Request, response: Response) {
    const { description } = request.body;
    const { id: user_id } = request.user;
    const { tag_id } = request.params;

    const updateStatementTagUseCase = container.resolve(
      UpdateStatementTagUseCase
    );

    const statementTag = await updateStatementTagUseCase.execute({
      user_id,
      description,
      tag_id,
    });
    return response.status(201).json(statementTag);
  }
}
