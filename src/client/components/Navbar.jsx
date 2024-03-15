import { useEffect, useState } from 'react'; // Importing necessary modules from React
import { Link, useNavigate } from 'react-router-dom'; // Importing Link and useNavigate from react-router-dom

const Navbar = () => { // Defining Navbar component

    const navigate = useNavigate(); // Getting the navigate function from useNavigate hook

    const [token, setToken] = useState(null); // Declaring state variable 'token' using useState hook

    useEffect(() => { // Using useEffect hook to perform side effects
        const storedToken = localStorage.getItem('authToken'); // Retrieving 'authToken' from localStorage
        if (storedToken) { // Checking if 'authToken' exists
            setToken(storedToken); // Setting 'token' state to the retrieved token
        }
    }, []); // Empty dependency array ensures this effect runs only once on component mount

    console.log("token", token); // Logging the value of 'token' to the console

    const handleLogOut = () => { // Defining handleLogOut function to handle logout functionality
        localStorage.removeItem("authToken"); // Removing 'authToken' from localStorage
        alert("User Log Out successfully"); // Alerting user about successful logout
        navigate('/login'); // Navigating to '/login' route after logout
    };

    return ( // Returning JSX for the Navbar component
        <div>
            <nav className="navbar"> {/* Navbar container */}
                <div className="navbar-container container"> {/* Navbar container with a container class */}
                    <ul className="menu-items"> {/* Unordered list for menu items */}
                        <li><a href="/home">Home</a></li> {/* Home link */}
                    </ul>
                    <ul className="menu-items"> {/* Another unordered list for menu items */}
                        {
                            token ? // Conditional rendering based on the existence of 'token'
                                <> {/* Fragment shorthand */}
                                    <li><a href="#">Profile</a></li> {/* Profile link */}
                                    <li><Link to={'/cart'}>Cart</Link></li>
                                    <button className='logout-btn' onClick={handleLogOut}>Logout</button> {/* Logout button */}
                                    
                                </> :
                                <> {/* Another fragment */}
                                    <li><Link to={'/login'}>Login</Link></li> {/* Login link */}
                                    <li><Link to={'/register'}>Register</Link></li> {/* Register link */}
                                </>
                        }
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar; // Exporting the Navbar
