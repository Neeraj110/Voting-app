import { Link } from "react-router-dom";
import { useLogoutMutation } from "../redux/features/UserAuthApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutSuccess } from "../redux/features/authSlices";
import "./style.css";

function Header() {
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      try {
        await logout();
        dispatch(logoutSuccess());
        navigate("/login");
        toast.success("Logged out successfully");
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="bg-blue-500 py-3 px-4 md:px-8 flex items-center justify-between">
      <div className="text-xl md:text-2xl hover:text-white Logo">
        <Link to="/">Secure Voting App</Link>
      </div>
      {userInfo ? (
        <div className="flex items-center gap-3 md:gap-5">
          <Link
            to="/profile"
            className="text-sm md:text-base hover:text-white bg-white px-2 md:px-4 py-1 md:py-2 rounded-full hover:bg-black"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="text-sm md:text-base hover:text-white bg-white px-2 md:px-4 py-1 md:py-2 rounded-full hover:bg-black"
          >
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3 md:gap-5">
          <Link
            to="/login"
            className="text-sm md:text-base hover:text-white bg-white px-2 md:px-4 py-1 md:py-2 rounded-full hover:bg-black"
          >
            Login
          </Link>
          <Link
            to="/sign-up"
            className="text-sm md:text-base hover:text-white bg-white px-2 md:px-4 py-1 md:py-2 rounded-full hover:bg-black"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
