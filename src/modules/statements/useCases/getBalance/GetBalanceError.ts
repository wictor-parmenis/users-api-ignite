import { AppError } from '../../../../shared/errors/AppError';

export namespace GetBalanceError {
  export class UserNotFound extends AppError {
    constructor() {
      super('User not found', 404);
    }
  }

  export class AccountNotFound extends AppError {
    constructor() {
      super('Account not found', 404);
    }
  }
}
