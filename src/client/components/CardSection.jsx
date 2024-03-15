import { useEffect, useState, React } from 'react'; // Importing necessary modules from React
import CardItem from './CardItem'; // Importing CardItem component

const CardSection = () => { // Defining CardSection component

    const [productList, setProductList] = useState([]); // Declaring state variable 'productList' using useState hook
    const [SearchValue, setSearchValue] = useState(''); // Declaring state variable 'SearchValue' using useState hook

    const port = import.meta.env.VITE_PORT; // Getting the port number from environment variables
    console.log("productList", productList); // Logging the value of 'productList' to the console

    const apiUrl = `http://localhost:${port}/api/products`; // Constructing API URL using port number

    const getProducts = () => { // Function to fetch products from API
        fetch(apiUrl)
            .then((response) => response.json()) // Convert to JSON
            .then((data) =>
                setProductList(data.data) // Set the data in our state variable
            )
            .catch((err) => {
                console.log(err); // Logging any errors
            });
    };

    useEffect(() => { // Using useEffect hook to fetch products when component mounts
        getProducts();
    }, []);

    const dataSearch = productList.filter((item) => { // Filtering products based on search value
        let newproduct = SearchValue.toLowerCase();
        return SearchValue ? item.name.toLowerCase().includes(newproduct) : true;
    });

    console.log("SearchValue"); // Logging the string "SearchValue" to the console

    return ( // Returning JSX for the CardSection component
        <div className='container'> {/* Container for the card section */}
            <div className='search-bar'> {/* Search bar */}
                <input className='search-input' onChange={(e) => { setSearchValue(e.target.value) }} placeholder='search Products' type='text' /> {/* Input field for searching products */}
            </div>
            <div className='main-card-item'> {/* Container for displaying main card items */}
                {
                    dataSearch.map((item, i) => ( // Mapping through filtered product list and rendering CardItem component for each product
                        <CardItem
                            key={item.id}
                            id={item.id}
                            image="https://dummyimage.com/600x400/000/fff"
                            name={item.name}
                            description={item.description}
                            price={item.price}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default CardSection; // Exporting the CardSection component as default
