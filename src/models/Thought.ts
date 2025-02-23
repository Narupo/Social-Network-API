import { Schema, model, Document } from 'mongoose';
import ReactionSchema from './Reaction.js';

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: Array<{ reactionBody: string; username: string; createdAt: Date }>;
  reactionCount: number;
}

const ThoughtSchema = new Schema<IThought>({
  thoughtText: {
    type: String,
    required: [true, 'thoughtText is required!'],
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: [true, 'username is required!'],
  },
  reactions: [ReactionSchema],
}, {
  toJSON: { virtuals: true },
  id: false,
});

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

export default model<IThought>('Thought', ThoughtSchema);