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
  {
    value: 640,
    name: 'Poor',
    active: false,
    factor: 1.2,
  },
  {
    value: 700,
    name: 'Fair',
    active: false,
    factor: 1.05,
  },
  {
    value: 750,
    name: 'Good',
    active: false,
    factor: 1,
  },
  {
    value: 800,
    name: 'Excellent',
    active: true,
    factor: 0.95,
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msrp: 0,
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
      loan: 0,
      lease: 0,
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
        const loan = this.calculateLoan();
        this.setState({ loan });
      }, 1000);
    });
  }

  componentDidUpdate() {

  }

  onChangeTab(tabClick) {
    this.setState({ isLease: tabClick === 'Lease' });
  }

  onUpdateProperty(propertyName, indexA, value) {
    const { [propertyName]: prop } = this.state;
    const state = new Promise((resolve) => {
      if (Array.isArray(prop)) {
        this.setState((prevState) => ({
          [propertyName]: prevState[propertyName].map((item, indexB) => {
            if (indexA === indexB) {
              return { ...item, active: true };
            }
            return { ...item, active: false };
          }),
        }));
      } else {
        this.setState({ [propertyName]: value });
      }
      resolve();
    });
    state.then(() => {
      const loan = Math.round(this.calculateLoan());
      this.setState({ loan });
    });

  }

  calculateLoan() {
    const {
      msrp,
      tradeIn,
      downPayment,
      apr,
      termsMock: terms,
      creditScoreMock: creditScore,
    } = this.state;
    const term = terms.find((item) => item.active).value;
    const creditScoreValue = creditScore.find((item) => item.active).factor;
    return ((msrp - tradeIn - downPayment) / term) * (creditScoreValue * apr);
  }

  render() {
    const {
      isLease,
      loan,
      lease,
      msrp,
      tradeIn,
      downPayment,
      termsMock: terms,
      creditScoreMock: creditScore,
      apr,
    } = this.state;
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
              loan={loan}
              lease={lease}
              onChangeTab={this.onChangeTab}
            />
            <Tab
              tabName="Loan"
              isLease={isLease}
              loan={loan}
              lease={lease}
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
