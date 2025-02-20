import { Request, Response } from 'express';
import Thought from '../models/Thought';

export const addReaction = async (req: Request, res: Response) => {
  try {
    const { thoughtId } = req.params;
    const reactionData = req.body; // { reactionBody, username }

    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: reactionData } }, // Push the reaction into the reactions array
      { new: true, runValidators: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found!' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const removeReaction = async (req: Request, res: Response) => {
  try {
    const { thoughtId, reactionId } = req.params;

    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { _id: reactionId } } }, // Remove the reaction by ID
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found!' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};
