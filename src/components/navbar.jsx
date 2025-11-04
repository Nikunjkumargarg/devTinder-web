import { useSelector } from 'react-redux'
import { removeUser } from '../Utils/userSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../Utils/constant'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async() => {
    try {
      const response = await axios.post(BASE_URL + "/logout", {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
    } catch (error) {
      console.log('Error:', error.response?.data || error.message);
    }
    dispatch(removeUser());
    navigate('/login');
  }

  const user = useSelector((store)=>store.user);
  console.log("user",user);
    return (
        <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
        </div>
        <div className="flex gap-2">
          {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
          {user && (
            <div className='flex items-center gap-2'>
              <div className='form-control'>Welcome, {user.firstname}</div>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user?.photoUrl} />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                  <li>
                    <Link to="/profile" className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li><a>Settings</a></li>
                  <li><a onClick={handleLogout}>Logout</a></li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    )
}
export default NavBar;  