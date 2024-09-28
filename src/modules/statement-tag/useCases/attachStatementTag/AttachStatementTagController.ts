import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AttachStatementTagUseCase } from './AttachStatementTagUseCase';

export class AttachStatementTagController {
  async attach(request: Request, response: Response) {
    const { statement_id, tag_id } = request.params;

    const attachStatementTag = container.resolve(AttachStatementTagUseCase);

    await attachStatementTag.execute({
      statement_id,
      tag_id,
    });
    return response.status(204).send();
  }
}
