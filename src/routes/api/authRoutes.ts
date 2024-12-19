import { Router } from 'express';
import { signin, signUp } from '../../controllers/api/authController';
import { validateRequest } from '../../middlewares/validateRequest';
import { authValidation } from '../../validators/auth';

const router = Router();

router.post('/signin', authValidation, validateRequest, signin);
router.post('/signup', authValidation, validateRequest, signUp);

export default router;
