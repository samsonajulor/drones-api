import { Router } from 'express';
import { droneController } from '../controllers';
import { MedicationMiddleware } from '../middlewares';

const { loadMedication, getMedicationBySerialNumber } = droneController;
const { inspectCreate, inspectGetMedications } = MedicationMiddleware;

const router = Router();

router.post('/', inspectCreate, loadMedication);
router.get('/', inspectGetMedications);
router.get('/:droneSerialNumber', getMedicationBySerialNumber);

export default router;
