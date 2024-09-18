import { AppError } from '../../../../shared/errors/AppError';

export namespace DeleteAccountError {
  export class AccountNotFound extends AppError {
    constructor() {
      super('Account not found', 404);
    }
  }
}
