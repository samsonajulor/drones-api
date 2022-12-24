import { Router } from 'express';
import { droneController } from '../controllers';

import { DroneMiddleware } from '../middlewares';

const { inspectCreate } = DroneMiddleware;
const { create, getAvailableDrones, checkBatteryLevel } = droneController;
const router = Router();

router.post('/', inspectCreate, create);
router.get('/idle', getAvailableDrones);
router.get('/:droneSerialNumber', checkBatteryLevel);

export default router;
