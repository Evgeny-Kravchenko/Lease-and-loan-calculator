import React, { Component } from 'react';

import mockData from '../mock/mock-data';

import Tab from './Tab/Tab';

import './App.scss';

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
    };
    this.onChangeTab = this.onChangeTab.bind(this);
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
    this.setState({isLease: tabClick === 'Lease'});
  }

  render() {
    return (
      <div className="wrapper">
        <h1>Lease and loan calculator</h1>
        <div className="calculator">
          <div className="calculator__tabs">
            <Tab tabName="Lease" isLease={this.state.isLease} onChangeTab={this.onChangeTab}/>
            <Tab tabName="Loan" isLease={this.state.isLease} onChangeTab={this.onChangeTab}/>
          </div>
          <div className="calculator__input-data">
            {this.state.isLease ? <p>It is lease</p> : <p>It is loan</p>}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
