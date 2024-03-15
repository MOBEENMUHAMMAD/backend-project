import { useState } from 'react'; // Importing necessary modules from React
import './style.css'; // Importing CSS styles for the component
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook from react-router-dom

const LoginForm = () => { // Defining LoginForm component

  const port = import.meta.env.VITE_PORT; // Getting the port number from environment variables
  const apiUrl = `http://localhost:${port}`; // Constructing API URL using port number

  const [username, setUsername] = useState(''); // Declaring state variable 'username' using useState hook
  const [password, setPassword] = useState(''); // Declaring state variable 'password' using useState hook
  const navigate = useNavigate(); // Getting the navigate function from useNavigate hook

  const handleLogin = async (e) => { // Function to handle login submission
    e.preventDefault(); // Preventing default form submission behavior

    try { // Try block to handle asynchronous operations and potential errors
      const data = { username, password }; // Creating data object with username and password
      const options = { // Creating options object for fetch request
        method: 'POST', // POST request method
        headers: { 'Content-Type': 'application/json' }, // Setting request headers
        body: JSON.stringify(data), // Converting data object to JSON string
      };

      const response = await fetch(`${apiUrl}/user/login`, options); // Sending login request to the server
      const responseData = await response.json(); // Parsing response JSON data

      if (response.ok) { // Checking if response is successful
        alert('User Login Successfully!'); // Alerting user about successful login
        localStorage.setItem('authToken', responseData.token); // Storing authentication token in localStorage
        localStorage.setItem('user',JSON.stringify(responseData.user))
        navigate('/home', { replace: true }); // Navigating to '/home' route
      } else {
        console.log(responseData.error); // Logging the error message received from the server
        alert(responseData.error); // Alerting user about login error
      }
    } catch (error) { // Catch block to handle any errors during the login process
      alert(error.message); // Alerting user about the error
    }
  };

  return ( // Returning JSX for the LoginForm component
    <div className='main-container'> {/* Main container for the login form */}
      <div className='card'> {/* Card container for login form */}
        <h2>Login</h2> {/* Heading for login form */}
        <form onSubmit={handleLogin} className='login-input-form'> {/* Form for login inputs */}
          <input
            type='text'
            onChange={(e) => setUsername(e.target.value)}
            className='username-input'
            id='username'
            name='username'
            placeholder='Username'
            required
          /> {/* Input field for username */}
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            className='password-input'
            id='password'
            name='password'
            placeholder='Password'
            required
          /> {/* Input field for password */}
          <button className='submit-btn' type='submit'>
            Login
          </button> {/* Button to submit login form */}
        </form>
      </div>
    </div>
  );
};

export default LoginForm; // Exporting the LoginForm component as default
