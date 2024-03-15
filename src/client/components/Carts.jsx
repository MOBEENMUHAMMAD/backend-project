import { useEffect, useState } from "react"; // Importing necessary modules from React

const port = import.meta.env.VITE_PORT; // Getting the port number from environment variables
const apiUrl = `http://localhost:${port}`; // Constructing API URL using port number

const Carts = () => {
  // Defining Carts component

  const userDetails = JSON.parse(localStorage.getItem('user'))
  const [cartItems, setCartItems] = useState([]); // Declaring state variable 'cartItems' using useState hook
  const [totalPrice, setTotalPrice] = useState(0); // Add state for total price
  const [loading, setLoading] = useState(false); // State to track loading state

  useEffect(() => {
    // Using useEffect hook to fetch cart items from localStorage when component mounts
    const cart = localStorage.getItem("cart") || []; // Retrieving cart items from localStorage
    if (cart) {
      // Checking if cart has items
      setCartItems(JSON.parse(cart)); // Parsing and setting the cart items in state
    }
  }, []);

  useEffect(() => {
    // Recalculate total price whenever cart items change
    const totalPrice = cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    setTotalPrice(totalPrice);
  }, [cartItems]);
  const handleCheckout = async () => {
    setLoading(true); // Set loading state to true while making the request
    try {
      // Send a request to your backend API to process the order
      const data = {
        customerId: userDetails.id,
        products: cartItems,
      };
      fetch(`${apiUrl}/api/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            // Handle success response, e.g., clear cart, show success message, etc.
            localStorage.removeItem("cart"); // Clear the cart after successful checkout
            setCartItems([]); // Clear cart items state
            alert("Order placed successfully!");
            window.location.href = "/home";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error placing order:", error);
      // Handle error response, e.g., show error message to the user
      alert("Failed to place order. Please try again later.");
    } finally {
      setLoading(false); // Reset loading state after request is complete
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    // Function to handle quantity change for cart items

    console.log("iteid", itemId); // Logging the item ID to the console

    if (newQuantity < 1) {
      // Checking if new quantity is less than 1
      newQuantity = 1; // Setting new quantity to 1 if it's less than 1
    }
    // Update the quantity of the item in the cart
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity }; // Updating quantity for the selected item
      }
      return item;
    });

    setCartItems(updatedCart); // Updating cart items state with the updated quantity
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Saving updated cart items to localStorage
  };

  // const totalPrice = cartItems.reduce((total, item) => { // Calculating total price of items in the cart
  //     return total + (item.price * item.quantity); // Summing up the total price
  // }, 0);

  const clearCart = () => {
    localStorage.removeItem("cart");
  };

  return (
    // Returning JSX for the Carts component
    <div className="container">
      {" "}
      {/* Container for the cart items */}
      <div className="search-bar">
        {" "}
        {/* Search bar */}
        <h3 style={{ textAlign: "center" }}>Cart Items</h3>{" "}
        {/* Heading for cart items */}
        <button onClick={clearCart}>Clear</button>
        <div className="main-card-item">
          {" "}
          {/* Container for displaying cart items */}
          {cartItems.map(
            (
              item // Mapping through cart items and rendering each item
            ) => (
              <div className="card-item" key={item.id}>
                {" "}
                {/* Container for each cart item */}
                <img
                  src="https://dummyimage.com/600x400/000/fff"
                  alt={item.name}
                  className="card-image"
                />{" "}
                {/* Image of the product */}
                <div className="card-content">
                  {" "}
                  {/* Container for card content */}
                  <h4>{item.name}</h4> {/* Name of the product */}
                  <p>{item.description}</p> {/* Description of the product */}
                  <p>
                    <b>Price:</b> {item.price}
                  </p>{" "}
                  {/* Price of the product */}
                  <button
                    className="increment-btn"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>{" "}
                  {/* Button to decrement quantity */}
                  <span className="inc-dec-value">
                    <b>{item.quantity}</b>
                  </span>{" "}
                  {/* Displaying quantity */}
                  <button
                    className="decrement-btn"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>{" "}
                  {/* Button to increment quantity */}
                </div>
              </div>
            )
          )}
        </div>
        <div>
          <h4>Total Price: {totalPrice}</h4>{" "}
          {/* Total price of all items in the cart */}
        </div>
        <button
          className="checkout-btn"
          onClick={handleCheckout}
          disabled={loading || cartItems.length === 0}
        >
          {loading ? "Processing..." : "Checkout"}
        </button>
      </div>
    </div>
  );
};

export default Carts; // Exporting the Carts component as default
