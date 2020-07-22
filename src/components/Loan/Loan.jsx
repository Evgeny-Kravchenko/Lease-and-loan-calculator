import React from 'react';
import PropTypes from 'prop-types';

import ItemOfCalculation from '../Item-of-calculation/Item-of-calculation.jsx';
import ItemOfCalculationWithOptions from '../Item-of-calculation-with-options/Item-of-calculation-with-options.jsx';

import './Loan.scss';

export default function Loan(props) {
  const {
    termsLoan,
    creditScoreLoan,
    onUpdateProperty,
    msrp,
    downPayment,
    tradeIn,
    postCode,
    apr,
  } = props;

  return (
    <>
      <ItemOfCalculationWithOptions
        name="Terms (months)"
        items={termsLoan}
        propertyName="termsMockLoan"
        onUpdateProperty={onUpdateProperty}
      />
      <ItemOfCalculation
        type="number"
        name="Down Payment"
        propertyName="downPayment"
        msrp={msrp}
        onUpdateProperty={onUpdateProperty}
        defaultValue={downPayment}
      />
      <ItemOfCalculation
        type="number"
        name="Trade in value"
        propertyName="tradeIn"
        msrp={msrp}
        onUpdateProperty={onUpdateProperty}
        defaultValue={tradeIn}
      />
      <ItemOfCalculation
        type="tel"
        name="Post code"
        propertyName="postCode"
        msrp={msrp}
        onUpdateProperty={onUpdateProperty}
        defaultValue={postCode}
      />
      <ItemOfCalculationWithOptions
        propertyName="creditScoreLoanMock"
        name="Approx. Credit Score"
        items={creditScoreLoan}
        onUpdateProperty={onUpdateProperty}
      />
      <ItemOfCalculation
        type="number"
        name="Estimated APR"
        propertyName="apr"
        msrp={msrp}
        onUpdateProperty={onUpdateProperty}
        defaultValue={apr}
      />
    </>
  );
}

Loan.propTypes = {
  termsLoan: PropTypes.arrayOf(PropTypes.object).isRequired,
  creditScoreLoan: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUpdateProperty: PropTypes.func.isRequired,
  msrp: PropTypes.number.isRequired,
  downPayment: PropTypes.number.isRequired,
  tradeIn: PropTypes.number.isRequired,
  postCode: PropTypes.number.isRequired,
  apr: PropTypes.number.isRequired,
};
