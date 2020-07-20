import React from 'react';
import PropTypes from 'prop-types';

import './Tab.scss';

export default function Tab(props) {
  let classes = ['tab'];
  const { tabName, isLease } = props;
  if (tabName === 'Lease') {
    classes.push('tab__lease');
    if (isLease) {
      classes = [...classes, 'tab_active-lease', 'tab_active'];
    }
  } else if (tabName === 'Loan') {
    classes.push('tab__loan');
    if (!isLease) {
      classes = [...classes, 'tab_active-loan', 'tab_active'];
    }
  }
  return (
    <button
      onClick={() => {
        props.onChangeTab(tabName);
      }}
      className={classes.join(' ')}
    >
      {tabName}
    </button>
  );
}

Tab.propTypes = {
  tabName: PropTypes.string.isRequired,
  isLease: PropTypes.bool.isRequired,
  onChangeTab: PropTypes.func.isRequired,
};
