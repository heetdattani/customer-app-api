import { Router } from 'express';
import {
  create,
  deleteCustomer,
  listingCustomer,
  profile,
  update,
  view,
} from '../../controllers/api/customerController';
import { validateRequest } from '../../middlewares/validateRequest';
import { createValidation, updateValidation } from '../../validators/customer';

const router = Router();

router.post('/listing', listingCustomer);
router.post('/create',  createValidation, validateRequest, create);
router.get('/view/:id', view);
router.post('/update/:id', updateValidation, validateRequest, update);
router.get('/profile', profile);
router.delete('/delete/:id', deleteCustomer);

export default router;
