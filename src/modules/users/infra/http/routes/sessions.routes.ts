import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();

const sessionsCOntroller = new SessionsController();

sessionsRouter.post('/', sessionsCOntroller.create);

export default sessionsRouter;