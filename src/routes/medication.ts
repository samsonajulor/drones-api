import { Router } from 'express';
import { droneController } from '../controllers';
import { MedicationMiddleware, UploadsMiddleware, multerUploads } from '../middlewares';

const { loadMedication, getMedicationBySerialNumber, uploadImageForMedication } = droneController;
const { inspectCreate, inspectGetMedication } = MedicationMiddleware;
const { fileExtLimiter, fileSizeLimiter, filesPayloadExists } = UploadsMiddleware;

const router = Router();

router.post('/', inspectCreate, loadMedication);
router.get('/:droneSerialNumber', getMedicationBySerialNumber);
router.post(
  '/image',
  inspectGetMedication,
  multerUploads.array('drone-images'),
  filesPayloadExists,
  fileExtLimiter(['.png', '.jpg', '.jpeg']),
  fileSizeLimiter,
  uploadImageForMedication
);

export default router;
