import { Router } from 'express';

import { MedicationMiddleware } from '../middlewares';

const router = Router();

router.post('/', MedicationMiddleware.inspectCreateMedication);
router.get('/', MedicationMiddleware.inspectGetMedications);

export default router;
