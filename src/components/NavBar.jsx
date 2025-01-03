import { Link } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  return (
    <nav className="bg-ocean-700 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo and site name */}
        <Link to="/" className="text-2xl font-bold text-white">
          NZ Fish Guide
        </Link>

        {/* Navigation Links is their own flex! */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link 
                to="/cooking-logs" 
                className="text-ocean-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                My Cooking Logs
              </Link>
              <button
                onClick={handleLogout}
                className="bg-ocean-600 text-white hover:bg-ocean-800 px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-ocean-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-ocean-500 text-white hover:bg-ocean-600 px-4 py-2 rounded-md text-sm font-medium"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar