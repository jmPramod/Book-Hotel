 import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';
import SideMenu from '../SideMenu/SideMenu';

const Navbar = () => {
    const location = useLocation();
    const { darkMode, toggleDarkMode } = useUserStore();
  const user = useUserStore((state) => state.user);
const logout = useUserStore((state) => state.logout);

   const navigation=useNavigate()

  return (
    <>
      <nav className={`w-full px-6 py-4 flex justify-between items-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-md`}>
        <div className="text-xl font-bold">
          <Link to="/">Money Tracker</Link>
        </div>

        <ul className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-indigo-400 transition">Home</Link>
      
         {user&& <li>
            <Link to="/dashboard" className="hover:text-indigo-400 transition">Dashboard</Link>
          </li>}
          {user&& <li>
            <Link to="/income" className="hover:text-indigo-400 transition">income</Link>
          </li>}
        {user&&  <li>
            <Link to="/expense" className="hover:text-indigo-400 transition">expense</Link>
          </li>}
          <li>
            {
!user?
    <Link to="/login" className="hover:text-indigo-400 transition">Sign Up</Link>
        :
            <div  onClick={()=>{
              navigation("/")
                   localStorage.removeItem("token");
  
              logout()

            }} className="hover:text-indigo-400 transition">Logout</div>
   
            }
          </li>
             </ul> 
        <button
          onClick={toggleDarkMode}
          className="ml-4 p-2 rounded-full hover:bg-gray-700 transition"
        > 
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </nav>
    {user&&(location.pathname === '/sign-up'||location.pathname === '/login'||location.pathname !== '/')&&  <SideMenu/>}

   {(location.pathname === '/sign-up'||location.pathname === '/login'||location.pathname === '/')&&<Outlet />}
    </>
  );
};

export default Navbar;
