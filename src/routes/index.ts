import { Router } from 'express';
import drone from './drone';
import medication from './medication';

const router = Router();

router.use('/drone', drone);
router.use('/medication', medication);

export default router;
