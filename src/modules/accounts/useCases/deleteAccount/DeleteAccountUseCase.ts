import { inject, injectable } from 'tsyringe';

import { IAccountRepository } from '@modules/accounts/repositories/IAccountsRepository';
import { DeleteAccountError } from './DeleteAccountError';
import { IDeleteAccountDTO } from './IDeleteAccountDTO';

@injectable()
export class DeleteAccountUseCase {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountRepository
  ) {}

  async execute({ id, user_id }: IDeleteAccountDTO): Promise<void> {
    const account = await this.accountsRepository.findById(id);

    if (!account) {
      throw new DeleteAccountError.AccountNotFound();
    }

    if (account.user_id !== user_id) {
      throw new DeleteAccountError.UserNotAllowed();
    }

    const deleteAccountResult = await this.accountsRepository.delete(id);

    return deleteAccountResult;
  }
}
