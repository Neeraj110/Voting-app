/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../redux/features/UserAuthApi";
import { toast } from "react-toastify";

function UpdateProfile() {
  const { userInfo } = useSelector((state) => state.auth);

  const user = userInfo?.data?.data || "";
  const [username, setUsername] = useState(user.username);
  const [addharCardNumber, setAddharCardNumber] = useState(
    user.addharCardNumber
  );
  const [fullname, setFullName] = useState(user.fullname);
  const [updateProfilem, { isLoading }] = useUpdateProfileMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updateProfilem({
        username,
        addharCardNumber,
        fullname,
      }).unwrap();
      console.log(data);
      toast.success("Profile updated successfully");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err.error);
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
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
