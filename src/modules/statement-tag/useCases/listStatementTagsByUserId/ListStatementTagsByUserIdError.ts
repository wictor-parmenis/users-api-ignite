import { AppError } from '@shared/errors/AppError';

export namespace ListStatementTagsByUserIdError {
  export class UserNotFound extends AppError {
    constructor() {
      super('User not found');
    }
  }
}
