import React from 'react';

import Input from '../Input/Input.jsx';

import './Item-of-calculation.scss';

export default function ItemOfCalculation(props) {
  const classes = ['item-of-calculation'];
  const { name, type, propertyName, onUpdateProperty, msrp } = props;
  return (
    <div className={classes.join(' ')}>
      {name}
      <Input
        type={type}
        name={name}
        propertyName={propertyName}
        msrp={msrp}
        onUpdateProperty={onUpdateProperty}
      />
    </div>
  );
}
