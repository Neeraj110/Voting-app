import mongoose, { Schema } from "mongoose";

const candidateSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  party: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
  },
  votes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      voteAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  totalVotes: {
    type: Number,
    default: 0,
  },
});

export const Candidate = mongoose.model("Candidate", candidateSchema);
