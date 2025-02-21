import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Thought from '../models/Thought.js';

export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId)
      .populate('thoughts')
      .populate('friends');

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found!' });
    }

    return res.json(updatedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found!' });
    }
    // Delete all thoughts associated with this user
    await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });

    return res.json({ message: 'User and associated thoughts deleted successfully!' });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const addFriend = async (req: Request, res: Response) => {
  try {
    const { userId, friendId } = req.params;

    // Convert friendId to ObjectId
    const friendObjectId = new mongoose.Types.ObjectId(friendId);

    // Check if both users exist
    const user = await User.findById(userId);
    const friend = await User.findById(friendObjectId);

    if (!user || !friend) {
      return res.status(404).json({ message: 'User or friend not found!' });
    }

    // Prevent adding the same friend twice
    if (user.friends.map(id => id.toString()).includes(friendObjectId.toString())) {
      return res.status(400).json({ message: 'Friend already added!' });
    }

    // Add friendId to user's friends array (convert to ObjectId)
    user.friends.push(friendObjectId as any);
    await user.save();

    return res.json({ message: 'Friend added successfully!', user });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const removeFriend = async (req: Request, res: Response) => {
  try {
    const { userId, friendId } = req.params;

    // Convert friendId to ObjectId properly
    const friendObjectId = new mongoose.Types.ObjectId(friendId);

    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    // Check if the friend exists in the user's friends list (convert to strings for comparison)
    if (!user.friends.map(id => id.toString()).includes(friendObjectId.toString())) {
      return res.status(400).json({ message: 'Friend not found in friend list!' });
    }

    // Remove friendId from user's friends array (filtering with string conversion)
    user.friends = user.friends.filter(id => id.toString() !== friendObjectId.toString());
    await user.save();

    return res.json({ message: 'Friend removed successfully!', user });
  } catch (err) {
    return res.status(500).json(err);
  }
};

