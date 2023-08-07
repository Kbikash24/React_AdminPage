import React, { useState, useEffect } from "react";

const App = () => {
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [productName, setProductName] = useState([]);

  // Load data from local storage on component mount
  useEffect(() => {
    const storedProductName = localStorage.getItem("productName");
    if (storedProductName) {
      setProductName(JSON.parse(storedProductName));
    }
  }, []);

  const addProduct = () => {
    // Create a new product object containing the name and price
    const newProduct = {
      name: product,
      price: price,
    };

    setProductName((previous) => [...previous, newProduct]);

    // Reset the product and price input fields after adding the product
    setProduct("");
    setPrice("");
  };

  const onProductChangeHandler = (event) => {
    setProduct(event.target.value);
  };

  const onPriceChangeHandler = (event) => {
    setPrice(event.target.value);
  };

  // Calculate the total cost of items
  const getTotalCost = () => {
    let total = 0;
    productName.forEach((item) => {
      total += parseInt(item.price, 10);
    });
    return total;
  };

  // Delete item by index
  const deleteItem = (index) => {
    setProductName((previous) => previous.filter((_, i) => i !== index));
  };

  // Save data to local storage whenever productName changes
  useEffect(() => {
    localStorage.setItem("productName", JSON.stringify(productName));
  }, [productName]);

  return (
    <>
      <h1>Admin Page</h1>
      <input
        type="text"
        placeholder="Enter the Product name"
        onChange={onProductChangeHandler}
        value={product}
      />
      <input
        type="number"
        placeholder="Price"
        onChange={onPriceChangeHandler}
        value={price}
      />
      <button onClick={addProduct}>Add</button>
      <h2>Product List</h2>
      <ul>
        {productName.map((item, index) => (
          <li key={index}>
            {item.name} - Rs-{item.price}
            <button onClick={() => deleteItem(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Total Cost</h2>
      <p>Rs-{getTotalCost()}</p>
    </>
  );
};

export default App;
