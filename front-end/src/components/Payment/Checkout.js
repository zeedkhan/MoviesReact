import React from "react";
import { useStateValue } from "../redux/StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import SubTotal from "./SubTotal";

function Checkout() {
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div>
      <SubTotal />

      {basket.map((item) => (
        <CheckoutProduct
          id={item.id}
          original_title={item.original_title}
          titile={item.title}
          original_language={item.original_language}
          price={item.amount}
          image={item.image}
          rating={item.vote_average}
          release={item.release_date}
        />
      ))}
    </div>
  );
}

export default Checkout;
