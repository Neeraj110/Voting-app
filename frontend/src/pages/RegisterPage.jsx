/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../redux/features/UserAuthApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/features/authSlices";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [addharCardNumber, setAddharCardNumber] = useState("");
  const [fullname, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("voter");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [signUp, { isLoading }] = useSignUpMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signUp({
        username,
        password,
        email,
        addharCardNumber,
        fullname,
        role, // Add role to the sign-up data
      }).unwrap();
      console.log(data);
      dispatch(setCredentials(data));
      toast.success("User registered successfully");
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      console.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-xs mt-[2rem]">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <h5 className="block text-gray-700 text-lg font-bold mb-2">
              FullName
            </h5>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullname"
              type="text"
              placeholder="fullname"
              onChange={(e) => setFullName(e.target.value)}
              value={fullname}
            />
          </div>
          <div className="mb-4">
            <h5 className="block text-gray-700 text-lg font-bold mb-2">
              Username
            </h5>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="mb-4">
            <h5 className="block text-gray-700 text-lg font-bold mb-2">
              Email
            </h5>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-4">
            <h5 className="block text-gray-700 text-lg font-bold mb-2">
              AddharCard-Number
            </h5>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="addharCardNumber"
              type="number"
              placeholder="addharCardNumber"
              onChange={(e) => setAddharCardNumber(e.target.value)}
              value={addharCardNumber}
            />
          </div>
          <div className="mb-6">
            <h5 className="block text-gray-700 text-lg font-bold mb-2">
              Password
            </h5>
            <input
              className="shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="flex items-center justify-between">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="shadow border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3"
            >
              <option value="voter">Voter</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
        <Link to="/login">
          <p className="text-center text-black text-lg">
            Already have an account?{" "}
            <span className="text-blue-500 font-medium">Log in here</span>
          </p>
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;
