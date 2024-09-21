import { AppError } from '../../../../shared/errors/AppError';

export namespace CreateAccountError {
  export class UserNotFound extends AppError {
    constructor() {
      super('User not found', 404);
    }
  }
  export class AccountAlreadyExists extends AppError {
    constructor() {
      super('Account already exists', 400);
    }
  }
}
