import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DetachStatementTagUseCase } from './DetachStatementTagUseCase';

export class DetachStatementTagController {
  async detach(request: Request, response: Response) {
    const { statement_id, tag_id } = request.params;

    const detachStatementTag = container.resolve(DetachStatementTagUseCase);

    await detachStatementTag.execute({
      statement_id,
      tag_id,
    });
    return response.status(204).send();
  }
}
