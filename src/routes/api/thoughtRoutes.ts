import { Router } from 'express';
import { getThoughts, createThought } from '../../controllers/thoughtController.js';

const router = Router();

router.route('/').get(getThoughts).post(createThought);

export { router as thoughtRouter };