import { AppError } from '@shared/errors/AppError';

export namespace DeleteStatementTagError {
  export class StatementTagNotFound extends AppError {
    constructor() {
      super('Statement tag not found');
    }
  }

  export class StatementTagStillInUse extends AppError {
    constructor() {
      super('Statement tag still in use');
    }
  }
}
