import { AppError } from '@shared/errors/AppError';

export namespace UpdateStatementTagError {
  export class StatementTagNotFound extends AppError {
    constructor() {
      super('Statement tag not found');
    }
  }

  export class UserNotFound extends AppError {
    constructor() {
      super('User not found');
    }
  }
}
