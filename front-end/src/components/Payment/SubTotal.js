import React from "react";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../redux/StateProvider";
import { getBasketTotal } from "../redux/reducer/reducer";

function SubTotal() {
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"฿"}
      />
    </div>
  );
}

export default SubTotal;
