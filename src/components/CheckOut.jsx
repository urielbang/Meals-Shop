import React, { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../utils/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const configObject = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function CheckOut() {
  const ctxCart = useContext(CartContext);
  const ctxProgress = useContext(UserProgressContext);

  const { data, isLoading, error, sendRequest } = useHttp(
    "https://backend-meals.onrender.com/orders",
    configObject
  );

  const cartTotal = ctxCart.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const handleClose = () => {
    ctxProgress.hideCheckout();
  };
  const handleFinish = () => {
    ctxProgress.hideCheckout();
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData(e.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest({
      body: JSON.stringify({
        order: {
          items: ctxCart.items,
          customer: customerData,
        },
      }),
    });
  };

  let actions = (
    <>
      <Button onClick={handleClose} type="button" textOnly>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isLoading) {
    actions = <span>Sending order data</span>;
  }
  if (data && !error) {
    return (
      <Modal open={ctxProgress.progress === "checkout"} onClose={handleClose}>
        <h2>Success</h2>
        <p>Your order was success send!</p>
        <p className="modal-actions">
          <Button onClick={handleClose}>Okay</Button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal open={ctxProgress.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount:{currencyFormatter.format(cartTotal)} </p>
        <Input label="Full name" type="text" id="name" />
        <Input label="E-mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="Postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="failed to fetch items" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
