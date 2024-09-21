import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateAccountUseCase } from './UpdateAccountUseCase';

export class UpdateAccountController {
  async update(request: Request, response: Response) {
    const { id: user_id } = request.user;
    const { account_id, amount, description, icon, title } = request.body;

    const updateAccount = container.resolve(UpdateAccountUseCase);

    await updateAccount.execute({
      amount,
      description,
      icon,
      id: account_id,
      title,
      user_id,
    });

    return response.status(204).send();
  }
}
