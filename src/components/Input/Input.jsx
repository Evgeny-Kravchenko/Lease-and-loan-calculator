import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Input.scss';

const DOWN_PAYMENT = 'Down Payment';
const TRADE_IN_VALUE = 'Trade in value';
const ESTIMATED_APR = 'Estimated APR';
const POST_CODE = 'Post code';

export default function Input(props) {
  const { type, name, propertyName, onUpdateProperty, msrp } = props;
  const maxlength = Input.getMaxLength(name, msrp);
  const classes = Input.getClasses(name);
  const [isValid, setIsValid] = useState(true);
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
          setIsValid(Input.isValid(event.target.value, msrp, name));
          if (isValid) {
            onUpdateProperty(propertyName, false, event.target.value);
          }
        }}
      />
      {name === ESTIMATED_APR && <span className="sign">%</span>}
      {!isValid && (
        <span className="invalid-error">Incorrect data, Try again!</span>
      )}
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  propertyName: PropTypes.string.isRequired,
  onUpdateProperty: PropTypes.func.isRequired,
  msrp: PropTypes.number.isRequired,
};

Input.isValid = (value, msrp, name) => {
  switch (name) {
    case DOWN_PAYMENT:
    case TRADE_IN_VALUE:
      return Number(value) <= msrp * 0.25 && Number(value) >= 0;
    case ESTIMATED_APR:
      return Number(value) >= 0 && Number(value) <= 100;
    default:
  }
  return Number(value) < 9999999999;
};

Input.getMaxLength = (name, msrp) => {
  switch (name) {
    case DOWN_PAYMENT:
    case TRADE_IN_VALUE:
      return 0.25 * msrp;
    case ESTIMATED_APR:
      return 100;
    default:
  }
  return 9999999999;
};

Input.getClasses = (name) => {
  const classes = ['input'];
  if (name === DOWN_PAYMENT || name === TRADE_IN_VALUE) {
    classes.push('dollar');
  } else if (name === ESTIMATED_APR) {
    classes.push('percent');
  }
  return classes;
};
