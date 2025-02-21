import { Request, Response } from 'express';
import Thought from '../models/Thought.js';
import User from '../models/User.js';

export const getAllThoughts = async (_: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createThought = async (req: Request, res: Response) => {
  try {
    const newThought = await Thought.create(req.body);
    const updatedUser = await User.findByIdAndUpdate(req.body.userId,
      { $push: { thoughts: newThought._id } },
      { new: true }
    );
    // If the user is not found, return an error
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found!' });
    }
    // Return the thought
    return res.status(201).json(newThought);
  } catch (err) {
    return res.status(500).json(err);
  }
};