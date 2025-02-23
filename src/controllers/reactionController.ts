import { Request, Response } from 'express';
import Thought from '../models/Thought.js';

export const addReaction = async (req: Request, res: Response) => {
  try {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;

    if (!reactionBody || !username) {
      return res.status(400).json({ message: "reactionBody and username are required." });
    }

    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: { reactionBody, username, createdAt: new Date() } } },
      { new: true, runValidators: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found!' });
    }

    return res.json({ message: "Reaction successfully added!", updatedThought });
  } catch (err) {
    return res.status(500).json(err);
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

    return res.json({message: "Reaction successfully removed!"});
  } catch (err) {
    return res.status(500).json(err);
  }
};
