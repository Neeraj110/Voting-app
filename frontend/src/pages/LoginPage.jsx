/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "../redux/features/UserAuthApi";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/features/authSlices";

function LoginPage() {
  const [addharCardNumber, setAddharCardNumber] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!addharCardNumber || !password) {
      toast.error("Please provide addharCardNumber and password");
      return;
    } else {
      try {
        const data = await login({ addharCardNumber, password }).unwrap();
        toast.success(data.message);
        console.log(data);
        dispatch(setCredentials(data));
        navigate("/");
      } catch (error) {
        if (error === 401) {
          toast.error("Please provide addharCardNumber and password");
        } else if (error === 500) {
          toast.error("Something went wrong in server");
        }
      }
    }
  };
  return (
    <div className="flex justify-center items-center ">
      <div className="w-full max-w-xs mt-[5rem]">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <h5 className="block text-gray-700 text-lg font-bold mb-2">
              addharCardNumber
            </h5>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="addharCardNumber"
              type="text"
              placeholder="addharCardNumber"
              value={addharCardNumber}
              onChange={(e) => setAddharCardNumber(e.target.value)}
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
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
        <Link to="/sign-up">
          <p className="text-center text-black text-lg">
            Don't have an account?{" "}
            <span className="text-blue-500 font-medium">Sign up here</span>
          </p>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
