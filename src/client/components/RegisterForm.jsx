import  { useState } from 'react'; // Importing necessary modules from React
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook from react-router-dom

const RegisterForm = () => { // Defining RegisterForm component

  const navigate = useNavigate(); // Getting the navigate function from useNavigate hook

  const port = import.meta.env.VITE_PORT; // Getting the port number from environment variables
  const apiUrl = `http://localhost:${port}`; // Constructing API URL using port number

  const [username, setUsername] = useState(''); // Declaring state variable 'username' using useState hook
  const [password, setPassword] = useState(''); // Declaring state variable 'password' using useState hook

  const handleRegister = async (e) => { // Function to handle registration submission
    console.log('woprking??'); // Logging a message to console for debugging
    e.preventDefault(); // Preventing default form submission behavior

    const data = { // Creating data object with username and password
      username,
      password
    };

    console.log("data", data); // Logging the data object to console for debugging

    const options = { // Creating options object for fetch request
      method: "POST", // POST request method
      headers: { "Content-Type": "application/json" }, // Setting request headers
      body: JSON.stringify(data), // Converting data object to JSON string
    };

    try { // Try block to handle asynchronous operations and potential errors
      const response = await fetch(`${apiUrl}/user/register`, options); // Sending register request to the server
      const responseData = await response.json(); // Parsing response JSON data

      if (response.ok) { // Checking if response is successful
        console.log("1233", responseData); // Logging the response data to console for debugging
        alert('User Created Successfully!'); // Alerting user about successful registration
        localStorage.setItem("authToken", responseData.token); // Storing authentication token in localStorage
        navigate('/home', { replace: true }); // Navigating to '/home' route
      } else {
        console.error(responseData.error); // Logging the error message received from the server
        alert(responseData.error); // Alerting user about registration error
      }
    } catch (error) { // Catch block to handle any errors during the registration process
      alert(error); // Alerting user about the error
    }
  };

  return ( // Returning JSX for the RegisterForm component
    <div className='main-container'> {/* Main container for the registration form */}
      <div className="card"> {/* Card container for registration form */}
        <h2>Register</h2> {/* Heading for registration form */}
        <form onSubmit={handleRegister} className='login-input-form'> {/* Form for registration inputs */}
          <input onChange={(e) => setUsername(e.target.value)} type="text" className='username-input' placeholder="Username" required /> {/* Input field for username */}
          <input type="password" onChange={(e) => setPassword(e.target.value)} className='password-input' placeholder="Password" required /> {/* Input field for password */}
          <button className='submit-btn' type="submit">Register</button> {/* Button to submit registration form */}
        </form>
      </div>
    </div>
  );
}

export default RegisterForm; // Exporting the RegisterForm component as default
