import React from 'react';

import './Loan.scss';

import ItemOfCalculation from '../Item-of-calculation/Item-of-calculation.jsx';
import ItemOfCalculationWithOptions from '../Item-of-calculation-with-options/Item-of-calculation-with-options.jsx';

export default function Loan(props) {
  const {
    terms,
    creditScore,
    onUpdateProperty,
    msrp,
    tradeIn,
    downPayment,
    apr,
  } = props;

  const term = terms.find((item) => item.active).value;
  const creditScoreValue = creditScore.find((item) => item.active).factor;
  const result = Loan.calculateLoan(
    term,
    creditScoreValue,
    msrp,
    tradeIn,
    downPayment,
    apr
  );
  console.log(result);

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
        onUpdateProperty={onUpdateProperty}
      />
    </>
  );
}

Loan.calculateLoan = function (
  term,
  creditScoreValue,
  msrp,
  tradeIn,
  downPayment,
  apr
) {
  return (msrp - tradeIn - downPayment) / (term * creditScoreValue * apr);
};
