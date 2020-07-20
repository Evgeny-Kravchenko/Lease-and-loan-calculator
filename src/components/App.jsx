import React, { Component } from 'react';

import mockData from '../mock/mock-data.js';

import Tab from './Tab/Tab.jsx';
import Loan from './Loan/Loan.jsx';

import './App.scss';

const termsMock = [
  { value: 12, active: false },
  { value: 24, active: true },
  { value: 36, active: false },
  { value: 48, active: false },
  { value: 72, active: false },
  { value: 84, active: false },
];

const creditScoreMock = [
  { value: 640, name: 'Poor', active: false, factor: 1.2 },
  { value: 700, name: 'Fair', active: false, factor: 1.05 },
  { value: 750, name: 'Good', active: false, factor: 1 },
  { value: 800, name: 'Excellent', active: true, factor: 0.95 },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msrp: '',
      vehicleName: '',
      dealerName: '',
      dealerPhone: '',
      dealerRating: '',
      isLease: true,
      downPayment: 0,
      tradeIn: 0,
      apr: 0,
      postCode: null,
      termsMock,
      creditScoreMock,
    };
    this.onChangeTab = this.onChangeTab.bind(this);
    this.onUpdateProperty = this.onUpdateProperty.bind(this);
  }

  componentDidMount() {
    mockData.then((resolve) => {
      setTimeout(() => {
        this.setState({
          msrp: resolve.msrp,
          vehicleName: resolve.vehicleName,
          dealerName: resolve.dealerName,
          dealerPhone: resolve.dealerPhone,
          dealerRating: resolve.dealerRating,
        });
      }, 1000);
    });
  }

  onChangeTab(tabClick) {
    this.setState({ isLease: tabClick === 'Lease' });
  }

  onUpdateProperty(propertyName, indexA, value) {
    // eslint-disable-next-line react/destructuring-assignment
    if (Array.isArray(this.state[propertyName])) {
      this.setState({
        // eslint-disable-next-line react/destructuring-assignment
        [propertyName]: this.state[propertyName].map((item, indexB) => {
          if (indexA === indexB) {
            return { ...item, active: true };
          }
          return { ...item, active: false };
        }),
      });
    } else {
      this.setState({ [propertyName]: value });
    }
  }

  render() {
    const { isLease } = this.state;
    const { msrp, tradeIn, downPayment, termsMock: terms, creditScoreMock: creditScore, apr } = this.state;
    const { onUpdateProperty } = this;
    const props = {
      terms,
      creditScore,
      msrp,
      tradeIn,
      downPayment,
      apr,
      onUpdateProperty,
    };
    return (
      <div className="wrapper">
        <h1>Lease and loan calculator</h1>
        <div className="calculator">
          <div className="calculator__tabs">
            <Tab
              tabName="Lease"
              isLease={isLease}
              onChangeTab={this.onChangeTab}
            />
            <Tab
              tabName="Loan"
              isLease={isLease}
              onChangeTab={this.onChangeTab}
            />
          </div>
          <div className="calculator__input-data">
            {isLease ? <p>It is lease</p> : <Loan {...props} />}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
