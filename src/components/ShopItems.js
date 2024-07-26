import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";
import "./Shopping.css";

function ShopItems() {
  const [shopItems, setShopItems] = useState([]);
  const [options, setOptions] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      axios.get("https://fakestoreapi.com/products").then((response) => {
        setShopItems(response.data);

        const productTitles = response.data.map((item) => ({
          value: item.id,
          label: item.title,
        }));

        setOptions(productTitles);
        setLoading(false);
      });
    }, 1000);
  }, []);

  const handleInputChange = (inputValue) => {
    setSearchInput(inputValue);
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedItem(selectedOption);
  };

  const filteredItems = selectedItem
    ? shopItems.filter((item) => item.id === selectedItem.value)
    : shopItems.filter((item) =>
        item.title.toLowerCase().includes(searchInput.toLowerCase())
      );

  const navigateToCart = () => {
    navigate("/shopping-app/cart");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2em",
          background: "lightgray",
          position: "relative",
        }}
      >
        <Select
          options={options}
          styles={{
            control: (baseStyle) => ({
              ...baseStyle,
              width: "400px",
              height: "50px",
              fontSize: "20px",
              borderRadius: "10px",
            }),
          }}
          placeholder="Search for a product..."
          onInputChange={handleInputChange}
          onChange={handleSelectChange}
        />
        <div
          style={{
            position: "absolute",
            right: "2em",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={navigateToCart}
        >
          <FaCartShopping
            style={{
              width: "25px",
              height: "25px",
            }}
          />
          {cartItems.length > 0 && (
            <div
              style={{
                background: "white",
                width: "20px",
                height: "20px",
                borderRadius: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 0 1em .3em",
              }}
            >
              <span
                style={{
                  color: "black",
                }}
              >
                {cartItems.length}
              </span>
            </div>
          )}
        </div>
      </div>
      {loading ? (
        <h1 style={{ textAlign: "center", paddingTop: "3em" }}>
          Loading data...
        </h1>
      ) : (
        filteredItems.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              gap: "100px",
              marginTop: "5em",
              paddingRight: "3em",
            }}
          >
            <div>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "200px", marginLeft: "3em" }}
              />
            </div>
            <div>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <p>${item.price}</p>
              <button className="add-to-cart" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ShopItems;
