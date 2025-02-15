import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../Utils/constants";
import { removeUser } from "../Utils/UserSlice";

const NavBar = () => {
  const user = useSelector((store) => store.User);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, {withCredentials: true});
      dispatch(removeUser());
      return navigate("/login");
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <div className="navbar bg-slate-900">
      <div className="flex-1">
        <Link to={'/feed'} className="btn btn-ghost text-xl text-white">🧑🏻‍💻DevTinder</Link>
      </div>
      <div className="text-white mx-6">
        {/* Conditionally render the user's first name if the user exists */}
        {user && `Welcome, ${user.firstName}`}
      </div>
      {user && (
        <div className="flex-none gap-2 mx-6">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.photoUrl ? user.photoUrl : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={'/profile'} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to={'/connections'}>Connections</Link>
              </li>
              <li>
                <Link to = {'/requests'}>Requests</Link>
              </li>
              <li>
                <a onClick={() => handleLogout()}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
