import { AttachStatementTagController } from '@modules/statement-tag/useCases/attachStatementTag/AttachStatementTagController';
import { CreateStatementTagController } from '@modules/statement-tag/useCases/createStatementTag/CreateStatementTagController';
import { ListStatementTagsByUserIdController } from '@modules/statement-tag/useCases/listStatementTagsByUserId/ListStatementTagsByUserIdController';
import { UpdateStatementTagController } from '@modules/statement-tag/useCases/updateStatementTag/UpdateStatementTagController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';

const statementTagsRouter = Router();

const createStatementTagController = new CreateStatementTagController();
const updateStatementTagController = new UpdateStatementTagController();
const listStatementTagsByUserIdController =
  new ListStatementTagsByUserIdController();

const attachStatementTagController = new AttachStatementTagController();

statementTagsRouter.use(ensureAuthenticated);

statementTagsRouter.post('/', createStatementTagController.create);
statementTagsRouter.put('/:tag_id', updateStatementTagController.update);
statementTagsRouter.get('/', listStatementTagsByUserIdController.list);
statementTagsRouter.post(
  '/:statement_id/:tag_id',
  attachStatementTagController.attach
);

export { statementTagsRouter };
