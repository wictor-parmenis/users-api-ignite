import { AppError } from '../../../../shared/errors/AppError';

export namespace ListAccountsError {
  export class AccountsNotFound extends AppError {
    constructor() {
      super('Accounts not found', 404);
    }
  }

  export class UserNotFound extends AppError {
    constructor() {
      super('User not found', 404);
    }
  }
}
