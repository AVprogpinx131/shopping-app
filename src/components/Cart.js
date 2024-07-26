import { useContext } from "react";
import { CartContext } from "../CartContext";
import { Link } from "react-router-dom";
import "./Shopping.css";

function Cart() {
  const { cartItems, removeFromCart, totalPrice, updateQuantity } =
    useContext(CartContext);

  return (
    <div style={{ padding: "2em" }}>
      <p style={{ textAlign: "center", fontSize: "22px", marginBottom: "3em" }}>
        {cartItems.length === 1
          ? `Your Cart (${cartItems.length} item)`
          : cartItems.length === 0
          ? ""
          : `Your Cart (${cartItems.length} items)`}
      </p>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              gap: "100px",
              marginTop: "2em",
            }}
          >
            <div>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "200px", marginBottom: "2em" }}
              />
            </div>
            <div>
              <h2>{item.title}</h2>
              <div
                style={{
                  background: "#AEAEAE",
                  width: "100px",
                  padding: "0.8em 0",
                  display: "flex",
                  justifyContent: "center",
                  gap: "15px",
                  borderRadius: "50px",
                }}
              >
                <button
                  style={{
                    borderRadius: "50px",
                    border: "none",
                    width: "25px",
                  }}
                  onClick={() => updateQuantity(item, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  style={{
                    borderRadius: "50px",
                    border: "none",
                    width: "25px",
                  }}
                  onClick={() => updateQuantity(item, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <div>
                <button
                  className="add-to-cart remove-from-cart"
                  onClick={() => removeFromCart(item)}
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p style={{ padding: "1em 0 2em 0", fontSize: "18px" }}>
          No items in cart.
        </p>
      )}
      {cartItems.length > 0 && (
        <p style={{ fontSize: "20px", marginBottom: "3em" }}>
          Total Price: ${totalPrice.toFixed(2)}
        </p>
      )}
      <Link to="/shopping-app" className="add-to-cart back-to-shop">
        Back to shop
      </Link>
    </div>
  );
}

export default Cart;
