import React, { useContext } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
  const ctxMeals = useContext(CartContext);
  const ctxProgress = useContext(UserProgressContext);

  const totalCartItems = ctxMeals.items.reduce((totalNumber, item) => {
    return totalNumber + item.quantity;
  }, 0);

  const handleShowCart = () => {
    ctxProgress.showCart();
  };

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="logo" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button onClick={handleShowCart} textOnly>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
