import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateAccountUseCase } from './CreateAccountUseCase';

export class CreateAccountController {
  async execute(request: Request, response: Response) {
    const { id: user_id } = request.user;
    const { amount, description, title, icon } = request.body;

    const createAccount = container.resolve(CreateAccountUseCase);

    const account = await createAccount.execute({
      user_id,
      icon,
      title,
      amount,
      description,
    });

    return response.status(201).json(account);
  }
}
