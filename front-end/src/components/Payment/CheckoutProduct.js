import React from "react";

function CheckoutProduct({
  id,
  original_title,
  titile,
  original_language,
  price,
  image,
  rating,
  release,
}) {
  return (
    <div>
      <img src={image} alt="" />
    </div>
  );
}

export default CheckoutProduct;
