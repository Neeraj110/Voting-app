/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateCandidateMutation } from "../redux/features/candidateApi";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux"; // Import useSelector to access the Redux store

function UpdateCandidatePage() {
  const { candidateId } = useParams();
  const [updateCandidate, { isloading }] = useUpdateCandidateMutation();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [party, setParty] = useState("");

  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await axios.patch(
  //       `/api/v1/candidate/update-candidate/${candidateId}`,
  //       {
  //         name,
  //         age,
  //         party,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${userInfo?.data?.token}`,
  //         },
  //       }
  //     );
  //     toast.success("Candidate updated successfully");
  //     navigate("/voting");
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Failed to update candidate");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateCandidate({
        candidateId,
        name,
        age,
        party,
      }).unwrap();
      toast.success("Candidate updated successfully");
      navigate("/voting");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update candidate");
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-5"> Update Candidate Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="block text-sm font-medium text-gray-700">Name</div>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <div className="block text-sm font-medium text-gray-700">Age</div>
            <input
              type="number"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <div className="block text-sm font-medium text-gray-700">Party</div>
            <input
              type="text"
              name="party"
              value={party}
              onChange={(e) => setParty(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateCandidatePage;
