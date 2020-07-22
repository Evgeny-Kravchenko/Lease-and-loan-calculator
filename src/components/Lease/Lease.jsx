import React from 'react';
import PropTypes from 'prop-types';

import './Lease.scss';

import ItemOfCalculation from '../Item-of-calculation/Item-of-calculation.jsx';
import ItemOfCalculationWithSelect from '../Item-of-calculation-with-select/Item-of-calculation-with-select.jsx';

export default function Lease(props) {
  const {
    downPayment,
    tradeIn,
    postCode,
    msrp,
    onUpdateProperty,
    termsLease,
    mileages,
    creditScoreLease
  } = props;
  return (
    <>
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
      <ItemOfCalculationWithSelect
        name="Terms (months)"
        items={termsLease}
        onUpdateProperty={onUpdateProperty}
        propertyName="termsMockLease"
      />
      <ItemOfCalculationWithSelect
        name="Mileages"
        items={mileages}
        onUpdateProperty={onUpdateProperty}
        propertyName="mileages"
      />
      <ItemOfCalculationWithSelect
        name="Credit Score"
        items={creditScoreLease}
        onUpdateProperty={onUpdateProperty}
        propertyName="creditScoreLeaseMock"
      />
    </>
  );
}
