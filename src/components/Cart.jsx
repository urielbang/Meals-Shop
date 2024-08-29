import React, { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import Button from "./UI/Button";

import { currencyFormatter } from "../utils/formatting";
import UserProgressContext from "../store/UserProgressContext";
import CardItem from "./CardItem";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const ctxProgress = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const handleCloseClick = () => {
    ctxProgress.hideCart();
  };

  return (
    <Modal open={ctxProgress.progress === "cart"} className="cart">
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => {
          return (
            <CardItem
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              onDecrease={() => cartCtx.removeItem(item.id)}
              onIncrease={() => cartCtx.addItem(item)}
            />
          );
        })}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseClick}>
          Close
        </Button>
        {cartCtx.items.length > 0 && <Button>Go to Checkout</Button>}
      </p>
    </Modal>
  );
}
