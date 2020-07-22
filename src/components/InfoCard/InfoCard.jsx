import React from 'react';

import './InfoCard.scss';

export default function InfoCard(props) {
  const {
    msrp,
    loan,
    vehicleName,
    dealerURL,
    dealerPhone,
    dealerRating,
  } = props;
  return (
    <>
      <div className="info-card__item">
        <span className="info-card__item-title">MSRP</span>
        <span className="info-card__item-value">
          <s>{`$${msrp}`}</s>
        </span>
      </div>
      <div className="info-card__item">
        <span className="info-card__item-title">Est. Loan Payment</span>
        <span className="info-card__item-value">{`$${loan}/mo`}</span>
      </div>
      <hr />
      <span className="info-card__vehicle-name">{vehicleName}</span>
      <a className="info-card__dealer-url" href={dealerURL}>
        {dealerURL}
      </a>
      <a className="info-card__dealer-phone" href={`tel:${dealerPhone}`}>
        {dealerPhone}
      </a>
      <div className="info-card__item">
        <span className="info-card__item-title">Rating</span>
        <meter
          className="info-card__item-value"
          min="0"
          max="5"
          value={dealerRating}
        ></meter>
      </div>
    </>
  );
}
