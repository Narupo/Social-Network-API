import { Router } from 'express';
import { 
  getAllUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser, 
  addFriend, 
  removeFriend 
} from '../../controllers/userController.js';

const router = Router();

// Routes for users
router.route('/')
  .get(getAllUsers)     // GET /api/users → Get all users
  .post(createUser); // POST /api/users → Create a new user

router.route('/:userId')
  .get(getUserById)   // GET /api/users/:userId → Get a user by ID
  .put(updateUser)    // PUT /api/users/:userId → Update a user
  .delete(deleteUser); // DELETE /api/users/:userId → Delete a user and associated thoughts

// Routes for adding/removing friends
router.route('/:userId/friends/:friendId')
  .post(addFriend)     // POST /api/users/:userId/friends/:friendId → Add a friend
  .delete(removeFriend); // DELETE /api/users/:userId/friends/:friendId → Remove a friend

export { router as userRouter };

