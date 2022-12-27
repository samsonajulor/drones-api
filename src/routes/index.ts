import { Router } from 'express';
import drone from './drone';
import medication from './medication';
import uploads from './uploads';

const router = Router();

router.use('/drone', drone);
router.use('/medication', medication);
router.use('/uploads', uploads);

export default router;
