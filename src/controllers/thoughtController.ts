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
    const { thoughtText, username, userId } = req.body;

    // Validate request body manually
    if (!thoughtText || !username || !userId) {
      return res.status(400).json({ message: "thoughtText, username, and userId are required." });
    }

    const newThought = await Thought.create({ thoughtText, username });

    // Associate Thought with User
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { thoughts: newThought._id } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.status(201).json(newThought);
  } catch (err) {
    return res.status(500).json(err);
  }
};


export const getThoughtById = async (req: Request, res: Response) => {
  try {
    const { thoughtId } = req.params;

    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found!' });
    }

    return res.json(thought);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const updateThought = async (req: Request, res: Response) => {
  try {
    const { thoughtId } = req.params;

    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found!' });
    }

    return res.json(updatedThought);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deleteThought = async (req: Request, res: Response) => {
  try {
    const { thoughtId } = req.params;

    const deletedThought = await Thought.findByIdAndDelete(thoughtId);

    if (!deletedThought) {
      return res.status(404).json({ message: 'Thought not found!' });
    }

    return res.json({ message: 'Thought deleted successfully!' });
  } catch (err) {
    return res.status(500).json(err);
  }
};

