import React, { useEffect, useState } from 'react'; // Importing necessary modules from React
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook from react-router-dom

const CardItem = ({ image, name, description, price, id }) => { // Defining CardItem component and destructuring props

    const [cartItems, setCartItems] = useState([]); // Declaring state variable 'cartItems' using useState hook

    const navigate = useNavigate(); // Getting the navigate function from useNavigate hook

    useEffect(() => { // Using useEffect hook to fetch cart items from localStorage when component mounts
        const cart = localStorage.getItem("cart") || []; // Retrieving cart items from localStorage
        if (cart.length > 0) { // Checking if cart has items
            const unparsed = JSON.parse(cart); // Parsing the cart items
            setCartItems(unparsed); // Setting the parsed cart items in state
        }
    }, []);

    const addToCart = () => { // Function to add item to cart
        // Get existing cart items from localStorage
        const existingCartItems = JSON.parse(localStorage.getItem('cart')) || [];

        // Create a new item to add to the cart
        const newItem = {
            id,
            name,
            description,
            price,
            quantity: 1
        };

        // Merge the new item with existing cart items
        const updatedCart = [...existingCartItems, newItem];

        // Update state and localStorage with the updated cart
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Saving updated cart items to localStorage
        navigate('/cart'); // Navigating to '/cart' route after adding item to cart
    };

    return ( // Returning JSX for the CardItem component
        <div className='card-item'> {/* Container for each card item */}
            <img src={image} alt={name} className="card-image" /> {/* Image of the product */}
            <div className="card-content"> {/* Container for card content */}
                <h4 className="card-title">{name}</h4> {/* Title of the product */}
                <p className="card-description">{description}</p> {/* Description of the product */}
                <p className="card-price">{price}</p> {/* Price of the product */}
                <button className="add-to-cart-button" onClick={addToCart}>Add to Cart</button> {/* Button to add product to cart */}
            </div>
        </div>
    );
};

export default CardItem; // Exporting the CardItem component as default
