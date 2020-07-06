import React, { Component } from 'react';

import './Tab.scss';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let classes = ['tab'];
    const { tabName, isLease } = this.props;
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
    return <button onClick={() => {this.props.onChangeTab(tabName)}} className={classes.join(' ')}>{this.props.tabName}</button>;
  }
}
