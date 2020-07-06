import React, { Component } from 'react';

import mockData from '../mock/mock-data';

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
    };
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

  render() {
    return (
      <div>
        <h1>React app</h1>
      </div>
    );
  }
}

export default App;
