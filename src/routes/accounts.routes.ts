import { CreateAccountController } from '@modules/accounts/useCases/createAccount/CreateAccountController';
import { DeleteAccountController } from '@modules/accounts/useCases/deleteAccount/DeleteAccountController';
import { ListAccountsController } from '@modules/accounts/useCases/listAccounts/ListAccountsController';
import { UpdateAccountController } from '@modules/accounts/useCases/updateAccount/UpdateAccountController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';

const accountsRouter = Router();

const createAccountController = new CreateAccountController();
const deleteAccountController = new DeleteAccountController();
const listAccountsController = new ListAccountsController();
const updateAccountController = new UpdateAccountController();

accountsRouter.use(ensureAuthenticated);

accountsRouter.post('/', createAccountController.create);
accountsRouter.delete('/:account_id', deleteAccountController.delete);
accountsRouter.get('/', listAccountsController.index);
accountsRouter.put('/', updateAccountController.update);

export { accountsRouter };
