import { Router } from 'express';
import { droneController } from '../controllers';
import { MedicationMiddleware } from '../middlewares';

const { loadDroneWithMedication, getMedicationByDroneSerialNumber } = droneController;

const router = Router();

router.post('/', MedicationMiddleware.inspectCreateMedication, loadDroneWithMedication);
router.get('/', MedicationMiddleware.inspectGetMedications);
router.get('/:droneSerialNumber', getMedicationByDroneSerialNumber);

export default router;
