import { Router } from 'express';
import { userDetail } from '../../controllers/api/userController';

const router = Router();

router.get('/', userDetail);

export default router;
