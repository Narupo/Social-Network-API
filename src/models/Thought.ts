import { Schema, model, Document } from 'mongoose';
import ReactionSchema from './Reaction';

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: typeof ReactionSchema[];
  reactionCount: number;
}

const ThoughtSchema = new Schema<IThought>({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
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