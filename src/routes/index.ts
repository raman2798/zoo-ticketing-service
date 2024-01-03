import { Router } from 'express';
import ticketRoute from './tickets';

const router: Router = Router();

router.use('/tickets', ticketRoute);

export default router;
