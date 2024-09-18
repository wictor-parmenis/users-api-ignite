import { container } from 'tsyringe';

import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';
import { UsersRepository } from '../../modules/users/repositories/UsersRepository';

import { IStatementsRepository } from '../../modules/statements/repositories/IStatementsRepository';
import { StatementsRepository } from '../../modules/statements/repositories/StatementsRepository';

import { AccountsRepository } from '@modules/accounts/repositories/AccountsRepository';
import { IAccountRepository } from '@modules/accounts/repositories/IAccountsRepository';
import { IUsersTokensRepository } from '../../modules/users/repositories/IUsersTokensRepository';
import { UsersTokensRepository } from '../../modules/users/repositories/UsersTokensRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IStatementsRepository>(
  'StatementsRepository',
  StatementsRepository
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository
);

container.registerSingleton<IAccountRepository>(
  'AccountsRepository',
  AccountsRepository
);
