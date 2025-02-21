import { Router } from 'express';
import { getUsers, createUser } from '../../controllers/userController.js';

const router = Router();

router.route('/')
        .get(getUsers)
        .post(createUser);

router.route('/:userId')  // --> req.params  { userId: '123' }
        .get(getUsers)
        .put(createUser)
//export default router;
export { router as userRouter } ;

