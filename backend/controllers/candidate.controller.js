import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Candidate } from "../models/candidate.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import { isValidObjectId } from "mongoose";

const checkIsAdminRole = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found in admin check");
    }

    if (user.role !== "admin") {
      throw new ApiError(403, "You are not authorized to perform this action");
    }

    return user.role === "admin";
  } catch (error) {
    throw new ApiError(500, error.message, "Internal Server Error");
  }
};

export const createCandidate = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const isAdmin = await checkIsAdminRole(userId);
    const candidateData = req.body;

    if (!isAdmin) {
      throw new ApiError(403, "You are not authorized to perform this action");
    }

    const candidate = new Candidate(candidateData);
    const newCandidate = await candidate.save();

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { data: newCandidate },
          "Candidate created successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      error.message,
      "Internal problem in server to create candidate"
    );
  }
});

export const updateCandidate = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const isAdmin = await checkIsAdminRole(userId);
    const candidateId = req.params.candidateId;
    const { name, age, party } = req.body; // Destructure the candidate data

    if (!isAdmin) {
      throw new ApiError(403, "You are not authorized to perform this action");
    }

    if (!isValidObjectId(candidateId)) {
      throw new ApiError(400, "Candidate ID is invalid");
    }

    if (!name || !age || !party) {
      throw new ApiError(
        400,
        "All candidate fields (name, age, party) are required"
      );
    }

    const candidate = await Candidate.findByIdAndUpdate(
      candidateId,
      { $set: { name, age, party } }, // Directly update fields
      { new: true }
    );

    if (!candidate) {
      throw new ApiError(404, "Candidate not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { data: candidate },
          "Candidate updated successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      error.message,
      "Internal Server Error in updating candidate"
    );
  }
});

export const deleteCandidate = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.user._id;
    const isAdmin = await checkIsAdminRole(userId);
    const candidateId = req.params.candidateId;

    if (!isAdmin) {
      throw new ApiError(403, "You are not authorized to perform this action");
    }

    if (!isValidObjectId(candidateId)) {
      throw new ApiError(400, "Candidate ID is invalid");
    }

    const candidate = await Candidate.findByIdAndDelete(candidateId);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { data: candidate },
          "Candidate deleted successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      error.message,
      "Internal Server Error in deleting candidate"
    );
  }
});

export const getCandidate = asyncHandler(async (req, res) => {
  try {
    const candidateId = req.params.candidateId;

    if (!isValidObjectId(candidateId)) {
      throw new ApiError(400, "Candidate ID is invalid");
    }

    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
      throw new ApiError(404, "Candidate not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, candidate, "Candidate retrieved successfully")
      );
  } catch (error) {
    throw new ApiError(
      500,
      error.message,
      "Internal Server Error in getting candidate"
    );
  }
});

export const getAllCandidates = asyncHandler(async (req, res) => {
  try {
    const candidates = await Candidate.find();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { data: candidates },
          "Candidates retrieved successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      error.message,
      "Internal Server Error in getting all candidates"
    );
  }
});

export const voting = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const candidateId = req.params.candidateId;
    const user = await User.findById(userId);

    const candidate = await Candidate.findByIdAndUpdate(candidateId);

    if (!candidate) {
      throw new ApiError(400, "candidate not found");
    }

    if (!user) {
      throw new ApiError(400, "user not found in voting");
    }
    if (user.role === "admin") {
      throw new ApiError(403, "admin can't vote");
    }
    if (user.isVoted) {
      throw new ApiError(
        401,
        "you have already vote anyone can vote only ones"
      );
    }

    candidate.votes.push({ user: userId });
    candidate.totalVotes++;
    await candidate.save();

    // update the user document
    user.isVoted = true;
    await user.save();

    return res
      .status(200)
      .json(
        new ApiResponse(200, { data: candidate }, "voting done successfully")
      );
  } catch (error) {
    throw new ApiError(
      500,
      error.message,
      "Internal Server Error in getting all candidates"
    );
  }
});

export const votingCount = asyncHandler(async (req, res) => {
  try {
    const candidate = await Candidate.find().sort({ totalVotes: "descending" });

    const records = candidate.map((candidate) => {
      return {
        _id: candidate._id,
        name: candidate.name,
        party: candidate.party,
        totalVotes: candidate.totalVotes,
      };
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { data: records },
          "Candidates voting count retrieved successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      error.message,
      "Internal Server Error in  counting votes"
    );
  }
});
