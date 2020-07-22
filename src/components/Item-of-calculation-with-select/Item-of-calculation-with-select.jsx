import React from 'react';

import './Item-of-calculation-with-select.scss';

export default function ItemOfCalculationWithSelect(props) {
  const { name, items, onUpdateProperty, propertyName } = props;
  const activeValue = items.find((item) => item.active).value;
  const classes = ['item-of-calculation'];
  return (
    <div className={classes.join(' ')}>
      {name}
      <select
        className="select"
        value={activeValue}
        onChange={(event) => {
          const { selectedIndex } = event.target;
          onUpdateProperty(propertyName, selectedIndex);
        }}
      >
        {items.map((item, index) => (
          <option key={index} value={item.value}>
            {item.value}
          </option>
        ))}
      </select>
    </div>
  );
}
