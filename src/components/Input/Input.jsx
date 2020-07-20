import React, { useState } from 'react';

import './Input.scss';

const DOWN_PAYMENT = 'Down Payment';
const TRADE_IN_VALUE = 'Trade in value';
const ESTIMATED_APR = 'Estimated APR';
const POST_CODE = 'Post code';

export default function Input(props) {
  const { type, name, propertyName, onUpdateProperty, msrp } = props;
  let maxlength;
  if (name === DOWN_PAYMENT || name === TRADE_IN_VALUE) {
    maxlength = 0.25 * msrp;
  } else if (name === ESTIMATED_APR) {
    maxlength = 100;
  }
  const classes = ['input'];
  if (name === DOWN_PAYMENT || name === TRADE_IN_VALUE) {
    classes.push('dollar');
  } else if (name === ESTIMATED_APR) {
    classes.push('percent');
  }
  const [isNotValid, setIsNotValid] = useState(false);
  return (
    <div className="input-wrapper">
      {(name === DOWN_PAYMENT || name === TRADE_IN_VALUE) && (
        <span className="sign">$</span>
      )}
      {name === POST_CODE && <span className="sign">〒</span>}
      <input
        type={type}
        min="0"
        max={maxlength}
        className={classes.join(' ')}
        onChange={(event) => {
          setIsNotValid(
            Input.checkData(event.target.value, msrp, propertyName)
          );
          if (!isNotValid) {
            onUpdateProperty(propertyName, false, event.target.value);
          }
        }}
      />
      {name === ESTIMATED_APR && <span className="sign">%</span>}
      {isNotValid && (
        <span className="invalid-error">Incorrect data, Try again!</span>
      )}
    </div>
  );
}

Input.checkData = function (value = 0, msrp, propertyName) {
  if (propertyName === 'downPayment' || propertyName === 'tradeIn') {
    return Number(value) > msrp * 0.25 || Number(value) < 0;
  }
  return Number(value) < 0 || Number(value) > 100;
};
