import { Router } from 'express';

import { accountsRouter } from './accounts.routes';
import { authenticationRouter } from './authentication.routes';
import { statementRouter } from './statements.routes';
import { userProfileRouter } from './userProfile.routes';
import { usersRouter } from './users.routes';

const router = Router();

router.use('/', authenticationRouter);
router.use('/users', usersRouter);
router.use('/profile', userProfileRouter);

router.use('/accounts', accountsRouter);

router.use('/statements', statementRouter);

export { router };
