export namespace CreateStatementTagError {
  export class StatementTagAlreadyExists extends Error {
    constructor() {
      super('Statement tag already exists');
      this.name = 'StatementTagAlreadyExists';
    }
  }
}
