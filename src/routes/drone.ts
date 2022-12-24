import { Router } from 'express';
import { droneController } from '../controllers';

import { DroneMiddleware } from '../middlewares';

const router = Router();

router.post('/', DroneMiddleware.inspectCreate, droneController.create);
router.get('/idle', droneController.getAvailableDrones);

export default router;
