import { Router } from 'express';
import { addReaction, removeReaction } from '../../controllers/reactionController.js';

const router = Router();

router.route('/:thoughtId/reactions')
.post(addReaction); // POST /api/thoughts/:thoughtId/reactions → Add a reaction to a thought

router.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction); // DELETE /api/thoughts/:thoughtId/reactions/:reactionId → Remove a reaction from a thought

export { router as reactionRouter };