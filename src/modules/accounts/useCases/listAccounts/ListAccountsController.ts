import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAccountUseCase } from './ListAccountUseCase';

export class ListAccountsController {
  async index(request: Request, response: Response) {
    const { id: user_id } = request.user;

    const accountsList = container.resolve(ListAccountUseCase);

    const accountsListResult = await accountsList.execute({
      user_id,
    });

    return response.status(200).json(accountsListResult);
  }
}
