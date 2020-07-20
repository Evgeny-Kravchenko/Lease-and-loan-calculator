import React from 'react';

import './Item-of-calculation-with-options.scss';

export default function ItemOfCalculationWithOptions(props) {
  const { name, items, propertyName, onUpdateProperty } = props;
  return (
    <>
      {name}
      <div className="wrapper-buttons">
        {items.map((item, index) => {
          const classes = ['wrapper-buttons__item'];
          if (item.active) {
            classes.push('wrapper-buttons__item_active');
          }
          return (
            <button
              className={classes.join(' ')}
              key={index}
              onClick={() => {
                onUpdateProperty(propertyName, index);
              }}
            >
              {item.name && <span className="name">{item.name}</span>}
              {item.value}
            </button>
          );
        })}
      </div>
    </>
  );
}
