/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  useGetCandidateMutation,
  useVotingMutation,
} from "../redux/features/candidateApi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../redux/features/authSlices";
import { Link } from "react-router-dom";
import axios from "axios";

function VotingPage() {
  const [allCandidates, setAllCandidates] = useState([]);
  const dispatch = useDispatch();
  const [voted, setVoted] = useState(false);
  const [getCandidate] = useGetCandidateMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const token = userInfo?.data?.token;

  const [voting] = useVotingMutation();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const { data } = await getCandidate();
        setAllCandidates(data.data.data);
        // Check if the user has already voted
        if (userInfo.data.data.isVoted) {
          setVoted(true);
        }
      } catch (error) {
        toast.error("Failed to fetch candidates");
        console.log(error);
      }
    };
    if (userInfo) {
      fetchCandidates();
    }
  }, [getCandidate, userInfo]);

  const handleVote = async (candidateId) => {
    if (voted) {
      toast.error("You have already voted");
      return;
    }
    try {
      await voting(candidateId);
      toast.success("Voted successfully");
      window.confirm("Voted successfully");
      setVoted(true);
    } catch (error) {
      toast.error("Failed to vote");
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/api/v1/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setCredentials(data));
      } catch (error) {
        console.log(error);
      }
    };
    if (token) {
      fetchProfile();
    }
  }, [dispatch, token]);

  const isVotedCheck =
    userInfo &&
    userInfo?.data &&
    userInfo?.data?.data &&
    userInfo.data?.data?.isVoted;

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center mb-8">
        Voting Page
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allCandidates.map((candidate) => (
          <div key={candidate._id} className="border p-4 rounded shadow-sm">
            <h2 className="text-xl font-bold">{candidate.name}</h2>
            <p className="mt-2">Age: {candidate.age}</p>
            <p className="mt-2">Party: {candidate.party.toUpperCase()}</p>
            <p className="mt-2">Total Votes: {candidate.totalVotes}</p>
            {userInfo.data.data.role === "admin" ? (
              <div className="flex item-center gap-4">
                <p className="mt-4 px-4 py-2 text-white rounded bg-gray-500 cursor-not-allowed w-auto">
                  Admin cannot vote
                </p>
                <Link to={`/update-candidate/${candidate._id}`}>
                  <button className="mt-4 px-4 py-2 text-white rounded bg-blue-500 hover:bg-blue-600">
                    Update Candidate
                  </button>
                </Link>
              </div>
            ) : (
              <button
                onClick={() => handleVote(candidate._id)}
                className={`mt-4 px-4 py-2 text-white rounded ${
                  isVotedCheck
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={isVotedCheck}
              >
                {isVotedCheck ? "Voted" : "Vote"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VotingPage;
