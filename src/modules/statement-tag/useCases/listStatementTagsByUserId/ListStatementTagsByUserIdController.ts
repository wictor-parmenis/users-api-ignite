import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListStatementTagsByUserIdUseCase } from './ListStatementTagsByUserIdUseCase';

export class ListStatementTagsByUserIdController {
  async list(request: Request, response: Response) {
    const { id: user_id } = request.user;

    const listStatementTagsByUserIdUseCase = container.resolve(
      ListStatementTagsByUserIdUseCase
    );

    const statementTag =
      await listStatementTagsByUserIdUseCase.execute(user_id);
    return response.status(200).json(statementTag);
  }
}
