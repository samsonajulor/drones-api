import { Router } from 'express';
import { droneController } from '../controllers';
import { MedicationMiddleware } from '../middlewares';

const { loadMedication, getMedicationBySerialNumber } = droneController;

const router = Router();

router.post('/', MedicationMiddleware.inspectCreate, loadMedication);
router.get('/', MedicationMiddleware.inspectGetMedications);
router.get('/:droneSerialNumber', getMedicationBySerialNumber);

export default router;
