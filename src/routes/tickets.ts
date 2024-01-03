import { Router } from 'express';
import { ticketController } from '../controllers';
import { validate } from '../middlewares';
import { ticketValidation } from '../validations';

const router: Router = Router();

const { create, getTicketById, getTicketByTicketId } = ticketValidation;

const { createTicket, readAllTickets, readById, readByTicketId } = ticketController;

router.post('/', validate(create), createTicket);

router.get('/all', readAllTickets);

router.get('/ticket/:ticketId', validate(getTicketByTicketId), readByTicketId);

router.get('/:ticketId', validate(getTicketById), readById);

export default router;
