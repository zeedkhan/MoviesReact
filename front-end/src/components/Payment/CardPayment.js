import { Button } from "@material-ui/core";
import React from "react";
import Script from "react-load-script";
import "./CardPayment.css";

function CardPayment({ createCreditCardCharge, cart }) {
  const handleLoadScript = () => {
    const OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      publicKey: "pkey_test_5ma8ch9ygqroi8tn71o",
      currency: "THB",
      frameLabel: "Zack Studio",
      submitLabel: "Pay",
      buttonLabel: "Pay with Omise",
    });
    console.log(OmiseCard);
  };

  const creditCardConfigure = () => {
    const OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      defaultPaymentMethod: "credit_card",
      otherPaymentMethod: [],
    });

    OmiseCard.configureButton("#creditCard__CheckOut");
    OmiseCard.attach();
  };

  //   Receive backend data
  const omiseCardHandler = () => {
    const OmiseCard = window.OmiseCard;
    OmiseCard.open({
      amount: cart.amount * 100,
      currency: "THB",
      defaultPaymentMethod: "credit_card",
      onCreateTokenSuccess: (token) => {
        createCreditCardCharge(cart.email, cart.name, cart.amount, token);

        console.log(token);
      },
      onFormClosed: () => {},
    });
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    creditCardConfigure();
    omiseCardHandler();
  };

  return (
    <div>
      <Script url="https://cdn.omise.co/omise.js" onLoad={handleLoadScript} />
      <form>
        <Button
          type="button"
          onClick={handleOnClick}
          id="creditCard__CheckOut"
          className="button"
        >
          Buy Now
        </Button>
      </form>
    </div>
  );
}

export default CardPayment;
