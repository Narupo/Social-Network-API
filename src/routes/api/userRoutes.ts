import { Router } from 'express';
import { getUsers, createUser } from '../../controllers/userController';

const router = Router();

router.route('/').get(getUsers).post(createUser);

export { router as userRouter } ;

