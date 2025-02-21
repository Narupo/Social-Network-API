import { Router } from 'express';
import { 
  getAllThoughts, 
  getThoughtById, 
  createThought, 
  updateThought, 
  deleteThought 
} from '../../controllers/thoughtController.js';

const router = Router();

// Routes for thoughts
router.route('/')
  .get(getAllThoughts)  // GET /api/thoughts → Get all thoughts
  .post(createThought); // POST /api/thoughts → Create a thought

router.route('/:thoughtId')
  .get(getThoughtById)   // GET /api/thoughts/:thoughtId → Get a thought by ID
  .put(updateThought)    // PUT /api/thoughts/:thoughtId → Update a thought
  .delete(deleteThought); // DELETE /api/thoughts/:thoughtId → Delete a thought

export { router as thoughtRouter };
