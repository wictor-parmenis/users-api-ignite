import { Statement } from '../../entities/Statement';

export type ICreateStatementDTO = Pick<
  Statement,
  'user_id' | 'description' | 'amount' | 'account_id' | 'type'
>;
