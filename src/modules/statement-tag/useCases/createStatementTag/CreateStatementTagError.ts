import { AppError } from '@shared/errors/AppError';

export namespace CreateStatementTagError {
  export class StatementTagAlreadyExists extends AppError {
    constructor() {
      super('Statement tag already exists');
    }
  }
}
