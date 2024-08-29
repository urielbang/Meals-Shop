import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext";
import { userProgressContextProvider } from "./store/UserProgressContext";

function App() {
  return (
    <userProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
      </CartContextProvider>
    </userProgressContextProvider>
  );
}

export default App;
