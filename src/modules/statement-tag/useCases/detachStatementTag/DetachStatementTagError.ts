import { AppError } from '@shared/errors/AppError';

export namespace DetachStatementTagError {
  export class StatementNotFound extends AppError {
    constructor() {
      super('Statement not found', 404);
    }
  }

  export class StatementTagNotFound extends AppError {
    constructor() {
      super('Statement tag not found', 404);
    }
  }
}
