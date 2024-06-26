/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useCreateCandidateMutation } from "../redux/features/candidateApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function IsAdmin() {
  const [candidateData, setCandidateData] = useState([]);
  const [createCandidate, { isLoading }] = useCreateCandidateMutation();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    party: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createCandidate(formData).unwrap();
      setFormData({
        name: "",
        age: "",
        party: "",
      });
      console.log(data);
      setCandidateData([...candidateData, data.data.data]);
      toast.success("Candidate created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create candidate");
    }
  };

  return (
    <div className="">
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-5"> Add Candidate Here!!</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="block text-sm font-medium text-gray-700">Name</div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <div className="block text-sm font-medium text-gray-700">Age</div>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <div className="block text-sm font-medium text-gray-700">Party</div>
            <input
              type="text"
              name="party"
              value={formData.party}
              onChange={handleChange}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.isArray(candidateData) &&
          candidateData.map((candidate) => (
            <div
              key={candidate._id}
              className="mt-5 border p-4 rounded shadow-sm"
            >
              <h2 className="text-xl font-bold">Name: {candidate.name}</h2>
              <p className="mt-2">Age: {candidate.age}</p>
              <p className="mt-2">Party: {candidate.party.toUpperCase()}</p>
            </div>
          ))}
      </div>
      <br />
      <div className="text-center mt-2">
        <Link
          to="/voting"
          className="text-[1.1rem]  text-black font-bold rounded-lg  mt-2 underline "
        >
          Voting is now open! Click here to see all Candidate.
        </Link>
      </div>
    </div>
  );
}

export default IsAdmin;
