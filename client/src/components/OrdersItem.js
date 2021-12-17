import React from 'react';

function OrdersItem({ title, price, imageUrl }) {
  return (
    <div className="card">
      <img className="card_image" src={imageUrl} alt="Card" />
      <div className="card_title">{title}</div>
      <div className="buttonsBlock">
        <div className="item_price">{price} $</div>
      </div>
    </div>
  );
}

export default OrdersItem;
