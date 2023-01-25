import React from 'react';

function OrdersItem({ title, price, imageUrl }) {
  return (
    <div className="card">
      <div className="img_wrapper">
        <img src={imageUrl[0]} alt="Card" />
      </div>
      <div>
        <div className="card_title">{title}</div>
        <div className="item_price">{price} $</div>
      </div>
    </div>
  );
}

export default OrdersItem;
