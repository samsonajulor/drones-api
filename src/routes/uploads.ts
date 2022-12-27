import { Router } from 'express';
import fileUpload from 'express-fileupload';
// import { UploadsController } from '../controllers';
import { UploadsMiddleware } from '../middlewares';

const { fileExtLimiter, fileSizeLimiter, filesPayloadExists } = UploadsMiddleware;

const router = Router();

router.post(
  '/',
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter(['.png', '.jpg', '.jpeg']),
  fileSizeLimiter
);

export default router;