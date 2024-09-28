import { AttachStatementTagController } from '@modules/statement-tag/useCases/attachStatementTag/AttachStatementTagController';
import { CreateStatementTagController } from '@modules/statement-tag/useCases/createStatementTag/CreateStatementTagController';
import { DeleteStatementTagController } from '@modules/statement-tag/useCases/deleteStatementTag/DeleteStatementTagController';
import { DetachStatementTagController } from '@modules/statement-tag/useCases/detachStatementTag/DetachStatementTagController';
import { ListStatementTagsByUserIdController } from '@modules/statement-tag/useCases/listStatementTagsByUserId/ListStatementTagsByUserIdController';
import { UpdateStatementTagController } from '@modules/statement-tag/useCases/updateStatementTag/UpdateStatementTagController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';

const statementTagsRouter = Router();

const createStatementTagController = new CreateStatementTagController();
const updateStatementTagController = new UpdateStatementTagController();
const listStatementTagsByUserIdController =
  new ListStatementTagsByUserIdController();

const deleteStatementTagController = new DeleteStatementTagController();

const attachStatementTagController = new AttachStatementTagController();
const detachStatementTagController = new DetachStatementTagController();

statementTagsRouter.use(ensureAuthenticated);

statementTagsRouter.post('/', createStatementTagController.create);
statementTagsRouter.put('/:tag_id', updateStatementTagController.update);
statementTagsRouter.get('/', listStatementTagsByUserIdController.list);
statementTagsRouter.post(
  '/detach/:statement_id/:tag_id',
  detachStatementTagController.detach
);
statementTagsRouter.post(
  '/attach/:statement_id/:tag_id',
  attachStatementTagController.attach
);
statementTagsRouter.delete('/:tag_id', deleteStatementTagController.delete);

export { statementTagsRouter };
