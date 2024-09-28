import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteStatementTagUseCase } from './DeleteStatementTagUseCase';

export class DeleteStatementTagController {
  async delete(req: Request, res: Response): Promise<Express.Response> {
    const { tag_id } = req.params;
    const { id: user_id } = req.user;
    const deleteStatementTag = container.resolve(DeleteStatementTagUseCase);
    await deleteStatementTag.execute({ user_id, tag_id });
    return res.status(204).send();
  }
}
