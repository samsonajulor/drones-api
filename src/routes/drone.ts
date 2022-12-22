import { Router } from 'express';

import { DroneMiddleware } from '../middlewares';

const router = Router();

router.post('/', DroneMiddleware.inspectCreateDrone);
router.get('/idle',);

export default router;
