import React from 'react';
import PropTypes from 'prop-types';

import Input from '../Input/Input.jsx';

import './Item-of-calculation.scss';

export default function ItemOfCalculation(props) {
  const classes = ['item-of-calculation'];
  const { name, type, propertyName, onUpdateProperty, msrp, defaultValue } = props;
  return (
    <div className={classes.join(' ')}>
      {name}
      <Input
        type={type}
        name={name}
        propertyName={propertyName}
        msrp={msrp}
        onUpdateProperty={onUpdateProperty}
        defaultValue={defaultValue}
      />
    </div>
  );
}

ItemOfCalculation.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  propertyName: PropTypes.string.isRequired,
  onUpdateProperty: PropTypes.func.isRequired,
  msrp: PropTypes.number.isRequired,
  defaultValue: PropTypes.number
};
