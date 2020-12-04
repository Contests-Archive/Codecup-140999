import React from "react";

function StockCard() {
  return (
    <div className="stockContainer">
      <div className="header">
        <div id="arrow" data-testid="arrow-element" />
        <div className="title" data-testid="title-element"></div>
      </div>
      <div className="info">
        <div id="percentage" data-testid="percentage-element"></div>
        <div className="price" data-testid="price-element"></div>
      </div>
    </div>
  );
}
export default StockCard;
