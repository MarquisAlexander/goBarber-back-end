import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';


import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();

const sessionsCOntroller = new SessionsController();

sessionsRouter.post('/', 
    celebrate({ [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        },
     }),
sessionsCOntroller.create);

export default sessionsRouter;