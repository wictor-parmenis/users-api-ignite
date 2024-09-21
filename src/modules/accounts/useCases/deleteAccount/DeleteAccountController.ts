import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteAccountUseCase } from './DeleteAccountUseCase';

export class DeleteAccountController {
  async delete(request: Request, response: Response) {
    const { id: user_id } = request.user;
    const { account_id } = request.params;

    const deleteAccount = container.resolve(DeleteAccountUseCase);

    await deleteAccount.execute({
      id: account_id,
      user_id,
    });

    return response.status(204).send();
  }
}
