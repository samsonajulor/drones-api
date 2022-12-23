import { Router } from 'express';
import { droneController } from '../controllers';
import { MedicationMiddleware } from '../middlewares';

const { loadDroneWithMedication } = droneController;

const router = Router();

router.post('/', MedicationMiddleware.inspectCreateMedication, loadDroneWithMedication);
router.get('/', MedicationMiddleware.inspectGetMedications);

export default router;
