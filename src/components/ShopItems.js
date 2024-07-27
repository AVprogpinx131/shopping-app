import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";
import { Link } from "react-router-dom";
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
        <div className="search-bar-container">
          <div>
            <Select
              options={options}
              placeholder="Search for a product..."
              onInputChange={handleInputChange}
              onChange={handleSelectChange}
            />
            <div className="cart-link">
              <Link
                to="/shopping-app/cart"
                style={{ textDecoration: "none", color: "black" }}
              >
                Cart
              </Link>
            </div>
          </div>
        </div>
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
            className="cart-icon"
          />
          {cartItems.length > 0 && (
            <div className="cart-count">
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
            }}
            className="items-wrapper"
          >
            <div className="image-container">
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "200px" }}
              />
            </div>
            <div className="items-container">
              <div>
                <h2>{item.title}</h2>
                <p className="item-desc">{item.description}</p>
                <p>${item.price}</p>
                <button className="add-to-cart" onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ShopItems;
