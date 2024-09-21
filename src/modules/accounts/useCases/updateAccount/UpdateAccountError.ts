import { AppError } from '../../../../shared/errors/AppError';

export namespace UpdateAccountError {
  export class AccountNotFound extends AppError {
    constructor() {
      super('Account not found', 404);
    }
  }

  export class AccountAlreadyExists extends AppError {
    constructor() {
      super('Account already exists', 400);
    }
  }

  export class UserNotAllowed extends AppError {
    constructor() {
      super('User not allowed', 401);
    }
  }
}
