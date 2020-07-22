import React from 'react';

import './InfoCard.scss';

export default function InfoCard(props) {
  const {
    msrp,
    loan,
    vehicleName,
    dealerName,
    dealerURL,
    dealerPhone,
    dealerRating,
    postCode,
  } = props;

  const taxes = String(postCode)
    .split('')
    .map((num) => num * 11)
    .join('');

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
      <div className="info-card__item">
        <span className="info-card__item-title">Vehicle name</span>
        <span className="info-card__item-value">{vehicleName}</span>
      </div>
      <div className="info-card__item">
        <span className="info-card__item-title">Dealer name</span>
        <span className="info-card__item-value">{dealerName}</span>
      </div>
      <div className="info-card__item">
        <span className="info-card__item-title">Dealer url</span>
        <a target='_blank' className="info-card__dealer-url" href={dealerURL}>
          {dealerURL}
        </a>
      </div>
      <div className="info-card__item">
        <span className="info-card__item-title">Dealer phone</span>
        <a className="info-card__dealer-phone" href={`tel:${dealerPhone}`}>
          {dealerPhone}
        </a>
      </div>
      <div className="info-card__item">
        <span className="info-card__item-title">Rating</span>
        <meter
          className="info-card__item-value"
          min="0"
          max="5"
          value={dealerRating}
        >
        </meter>
      </div>
      <div className="info-card__item">
        <span className="info-card__item-title">Taxes</span>
        <span className="info-card__item-value">{`${taxes}$`}</span>
      </div>
    </>
  );
}
