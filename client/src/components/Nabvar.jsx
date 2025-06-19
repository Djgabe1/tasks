import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

function Nabvar() {
    const {isAuthenticated, logout, user} = useAuth();
  return (
    <nav className="bg-zinc-800 text-white flex justify-between items-center py-4 px-10">
      <Link to="/"><h1>Task Organizer</h1></Link>
        <ul className="flex gap-x-2 items-center">
            {isAuthenticated ?  (
                <>
                <li> 
                <div className="flex items-center gap-x-2">
                  <img
          alt=""
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          className="inline-block size-10 rounded-full ring-2 ring-black"
        /> 
                </div>
                
                </li>
                <li >{user.username}</li>
                <li><Link to="/tasks">Tasks</Link></li>
                <li><Link to="/add-task">Add Tasks</Link></li>
                <li><Link to="/" onClick={()=>{
                    logout();
                }}
                className="bg-red-600 px-4 py-1 rounded-sm">Logout</Link></li>
                </>
            ):( 
                <>
                <li><Link to="/login" className="bg-teal-800  px-4 py-1 rounded-sm">Login</Link></li>
                <li><Link to="/register" className="bg-teal-800  px-4 py-1 rounded-sm">Register</Link></li>
                </>
            )}

            
        </ul>
    </nav>
  )
}

export default Nabvar
