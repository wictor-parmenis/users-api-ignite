import { Account } from '@modules/accounts/entities/Account';

export type ICreateAccountDTO = Pick<
  Account,
  'icon' | 'user_id' | 'description' | 'title' | 'amount'
>;
