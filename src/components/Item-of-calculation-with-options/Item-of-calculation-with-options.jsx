import React from 'react';
import PropTypes from 'prop-types';

import './Item-of-calculation-with-options.scss';

export default function ItemOfCalculationWithOptions(props) {
  const { name, items, propertyName, onUpdateProperty } = props;
  return (
    <div className="item-of-calculation-with-options">
      {name}
      <div className="wrapper-buttons">
        {items.map((item, index) => {
          const classes = ['wrapper-buttons__item'];
          if (item.active) {
            classes.push('wrapper-buttons__item_active');
          }
          return (
            <button
              type="button"
              className={classes.join(' ')}
              key={item.value}
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
    </div>
  );
}

ItemOfCalculationWithOptions.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  propertyName: PropTypes.string.isRequired,
  onUpdateProperty: PropTypes.func.isRequired,
};
