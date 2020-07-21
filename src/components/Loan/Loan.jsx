import React from 'react';
import PropTypes from 'prop-types';

import ItemOfCalculation from '../Item-of-calculation/Item-of-calculation.jsx';
import ItemOfCalculationWithOptions from '../Item-of-calculation-with-options/Item-of-calculation-with-options.jsx';

import './Loan.scss';

export default function Loan(props) {
  const {
    terms,
    creditScore,
    onUpdateProperty,
    msrp,
  } = props;

  return (
    <>
      <ItemOfCalculationWithOptions
        name="Terms (months)"
        items={terms}
        propertyName="termsMock"
        onUpdateProperty={onUpdateProperty}
      />
      <ItemOfCalculation
        type="number"
        name="Down Payment"
        propertyName="downPayment"
        msrp={msrp}
        onUpdateProperty={onUpdateProperty}
      />
      <ItemOfCalculation
        type="number"
        name="Trade in value"
        propertyName="tradeIn"
        msrp={msrp}
        onUpdateProperty={onUpdateProperty}
      />
      <ItemOfCalculation
        type="tel"
        name="Post code"
        propertyName="postCode"
        msrp={msrp}
        onUpdateProperty={onUpdateProperty}
      />
      <ItemOfCalculationWithOptions
        propertyName="creditScoreMock"
        name="Approx. Credit Score"
        items={creditScore}
        onUpdateProperty={onUpdateProperty}
      />
      <ItemOfCalculation
        type="number"
        name="Estimated APR"
        propertyName="apr"
        msrp={msrp}
        onUpdateProperty={onUpdateProperty}
      />
    </>
  );
}

Loan.propTypes = {
  terms: PropTypes.arrayOf(PropTypes.object).isRequired,
  creditScore: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUpdateProperty: PropTypes.func.isRequired,
  msrp: PropTypes.number.isRequired
};
