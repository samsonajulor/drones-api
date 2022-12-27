import { Router } from 'express';
import { uploads } from '../controllers';
import { multerUploads, UploadsMiddleware } from '../middlewares';

const { fileExtLimiter, fileSizeLimiter, filesPayloadExists } = UploadsMiddleware;

const router = Router();

router.post(
  '/',
  multerUploads.array('drone-images'),
  filesPayloadExists,
  fileExtLimiter(['.png', '.jpg', '.jpeg']),
  fileSizeLimiter,
  uploads
);

export default router;
