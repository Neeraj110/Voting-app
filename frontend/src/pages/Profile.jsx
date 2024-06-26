/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useProfileMutation } from "../redux/features/UserAuthApi";
import { setCredentials } from "../redux/features/authSlices";
import axios from "axios";
import { toast } from "react-toastify";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);
  // console.log(userInfo.token);

  const token = userInfo.data.token;

  const handleEditClick = () => {
    navigate("/update-profile");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/api/v1/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log(data);
        dispatch(setCredentials(data));
        setUser(data.data.data); // Set the user state with fetched data
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, [dispatch, token]);

  if (!user) {
    return <div className="text-center text-2xl mt-[5rem]">Loading...</div>;
  }

  return (
    <>
      <div className="container mx-5 mt-8 ">
        <h2 className="text-2xl font-bold mb-4">Your Profile</h2>

        <div className="bg-white shadow-md rounded-lg p-6">
          <p>
            <strong>Name:</strong> {user.fullname}
          </p>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Aadhaar Card Number: {user.addharCardNumber}</strong>
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>

          <button
            onClick={handleEditClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
