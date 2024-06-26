/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import IsAdmin from "../components/IsAdmin";

function Home() {
  const { userInfo } = useSelector((state) => state.auth);

  // Check if user is logged in and is an admin
  const isAdmin =
    userInfo &&
    userInfo.data &&
    userInfo.data.data &&
    userInfo.data.data.role === "admin";

  return (
    <div className="p-4 md:p-8">
      {!userInfo ? (
        <div className="mt-12 md:mt-16">
          <h1 className="text-center text-2xl md:text-3xl lg:text-4xl">
            You are not logged in. Please login or create an account.
          </h1>
          <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-9">
            <Link
              to="/login"
              className="text-lg md:text-xl lg:text-2xl text-white px-8 py-3 rounded-full bg-black hover:text-white hover:bg-blue-500"
            >
              Login
            </Link>
            <Link
              to="/sign-up"
              className="text-lg md:text-xl lg:text-2xl text-white px-8 py-3 rounded-full bg-black hover:text-white hover:bg-blue-500"
            >
              Register
            </Link>
          </div>
        </div>
      ) : isAdmin ? (
        <IsAdmin />
      ) : (
        <div className="text-center mt-12">
          <h1 className="text-2xl md:text-3xl mb-5">Secure Voting Platform</h1>
          <hr style={{ height: "2px" }} />
          <br />
          <p className="text-[1rem] md:text-[1.3rem]">
            Welcome to the Secure Voting Platform, where your voice matters and
            your vote counts! Our platform ensures a safe, transparent, and
            user-friendly voting experience. With advanced security measures, we
            protect your data and uphold the integrity of every election. Join
            us in fostering a democratic process that you can trust.
          </p>
          <hr />
          <br />
          <Link
            to="/voting"
            className="text-[1.1rem] bg-blue-500 text-white rounded-lg p-2 mt-2 underline"
          >
            Voting is now open! Click here to vote.
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
