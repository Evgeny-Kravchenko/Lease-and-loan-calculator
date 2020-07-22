import React, { Component } from 'react';

import {
  mockDataResolve,
  termsMockLoan,
  termsMockLease,
  creditScoreLoanMock,
  creditScoreLeaseMock,
  mileagesMock,
} from '../mock/mock-data.js';

import Tab from './Tab/Tab.jsx';
import Loan from './Loan/Loan.jsx';
import Lease from './Lease/Lease.jsx';
import InfoCard from './InfoCard/InfoCard.jsx';
import Spinner from './Spinner/Spinner.jsx';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msrp: 0,
      vehicleName: '',
      dealerName: '',
      dealerPhone: '',
      dealerRating: '',
      dealerURL: '',
      isLease: true,
      downPayment: 0,
      tradeIn: 0,
      apr: 0,
      postCode: 0,
      termsMockLoan,
      termsMockLease,
      creditScoreLoanMock,
      creditScoreLeaseMock,
      mileagesMock,
      loan: 0,
      lease: 0,
      isValid: true,
      isLoading: true,
    };
    this.onChangeTab = this.onChangeTab.bind(this);
    this.onUpdateProperty = this.onUpdateProperty.bind(this);
  }

  componentDidMount() {
    mockDataResolve.then((resolve) => {
      setTimeout(() => {
        this.setState({
          msrp: resolve.msrp,
          vehicleName: resolve.vehicleName,
          dealerName: resolve.dealerName,
          dealerPhone: resolve.dealerPhone,
          dealerRating: resolve.dealerRating,
          dealerURL: resolve.dealerURL,
        });
        this.updateCalculationLoanAndLease();
        this.setState((prevState) => ({ isLoading: !prevState.isLoading }));
      }, 5000);
    });
    const location = fetch('https://ipinfo.io/json?token=bbedd51dd11f32');
    location
      .then((data) => data.json())
      .then((data) => {
        this.setState({ postCode: Number(data.postal) });
      });
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
      this.updateCalculationLoanAndLease();
    });
  }

  calculateLoan() {
    const {
      msrp,
      tradeIn,
      downPayment,
      apr,
      termsMockLoan: terms,
      creditScoreLoanMock: creditScoreLoan,
    } = this.state;
    const term = terms.find((item) => item.active).value;
    const creditScoreValue = creditScoreLoan.find((item) => item.active).factor;
    return ((msrp - tradeIn - downPayment) / term) * (creditScoreValue * apr);
  }

  calculateLease() {
    const {
      msrp,
      tradeIn,
      downPayment,
      mileagesMock: mileages,
      termsMockLease: terms,
      creditScoreLeaseMock: creditScoreLease,
    } = this.state;

    const term = terms.find((item) => item.active).value;
    const creditScoreValue = creditScoreLease.find((item) => item.active)
      .factor;
    const mileagesValue = mileages.find((item) => item.active).value;
    return (
      ((msrp - tradeIn - downPayment) * mileagesValue * creditScoreValue) / (1000 * term)
    );
  }

  checkValidData(typeCalculator) {
    const {
      downPayment,
      tradeIn,
      apr,
      msrp,
    } = this.state;
    const isDownPaymentValid = downPayment <= msrp * 0.25;
    const isTradeInValid = tradeIn <= msrp * 0.25;
    const isAprValid = apr >= 0 && apr <= 100;
    return typeCalculator === 'lease'
      ? isDownPaymentValid && isTradeInValid
      : isDownPaymentValid && isTradeInValid && isAprValid;
  }

  updateCalculationLoanAndLease() {
    const isValidDataLoan = this.checkValidData('loan');
    const isValidDataLease = this.checkValidData('lease');
    let loan;
    let lease;
    if (isValidDataLoan) {
      loan = Math.round(this.calculateLoan());
      this.setState({ loan });
    }
    if (isValidDataLease) {
      lease = Math.round(this.calculateLease());
      this.setState({ lease });
    }
  }

  render() {
    const {
      vehicleName,
      dealerName,
      dealerURL,
      dealerPhone,
      dealerRating,
      isLease,
      loan,
      lease,
      msrp,
      tradeIn,
      downPayment,
      termsMockLoan: termsLoan,
      termsMockLease: termsLease,
      creditScoreLoanMock: creditScoreLoan,
      creditScoreLeaseMock: creditScoreLease,
      apr,
      postCode,
      mileagesMock: mileages,
      isLoading,
    } = this.state;

    const { onUpdateProperty, switchError, onChangeTab } = this;

    const propsLoan = {
      termsLoan,
      creditScoreLoan,
      msrp,
      tradeIn,
      downPayment,
      apr,
      onUpdateProperty,
      postCode,
      switchError,
    };

    const propsLease = {
      tradeIn,
      downPayment,
      postCode,
      msrp,
      onUpdateProperty,
      termsLease,
      mileages,
      creditScoreLease,
    };

    const propsTab = {
      isLease,
      loan,
      lease,
      onChangeTab,
    };
    return (
      <div className="wrapper">
        <h1>Lease and loan calculator</h1>
        {!isLoading ? (
          <>
            <div className="calculator">
              <div className="calculator__tabs">
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Tab tabName="Lease" {...propsTab} />
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Tab tabName="Loan" {...propsTab} />
              </div>
              <div className="calculator__input-data">
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                {isLease ? <Lease {...propsLease} /> : <Loan {...propsLoan} />}
              </div>
            </div>
            <div className="info-card">
              <InfoCard
                msrp={msrp}
                loan={loan}
                vehicleName={vehicleName}
                dealerURL={dealerURL}
                dealerPhone={dealerPhone}
                dealerRating={dealerRating}
                postCode={postCode}
                dealerName={dealerName}
              />
            </div>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default App;
