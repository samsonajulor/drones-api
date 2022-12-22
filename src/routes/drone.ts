import { Router } from 'express';
import { droneController } from '../controllers';

import { DroneMiddleware } from '../middlewares';

const router = Router();

router.post('/', DroneMiddleware.inspectCreateDrone, droneController.createDrone);
router.get('/idle',);

export default router;
