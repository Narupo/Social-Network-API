import { Router } from 'express';
import { addReaction, removeReaction } from '../../controllers/reactionController.js';

const router = Router();

router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

export { router as reactionRouter };