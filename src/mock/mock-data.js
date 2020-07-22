const mockData = {
  msrp: 10000,
  vehicleName: 'BMW E46 M3',
  dealerName: 'BMW Corp',
  dealerPhone: '+375333073346',
  dealerRating: 3.2,
  dealerURL: 'https://autoidea.by/',
};

const termsMockLoan = [
  { value: 12, active: false },
  { value: 24, active: true },
  { value: 36, active: false },
  { value: 48, active: false },
  { value: 72, active: false },
  { value: 84, active: false },
];

const termsMockLease = [
  { value: 24, active: false },
  { value: 36, active: true },
  { value: 48, active: false },
];

const creditScoreLoanMock = [
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

const creditScoreLeaseMock = [
  {
    value: 640,
    active: false,
    factor: 1.2,
  },
  {
    value: 700,
    active: false,
    factor: 1.05,
  },
  {
    value: 750,
    active: false,
    factor: 1,
  },
  {
    value: 800,
    active: true,
    factor: 0.95,
  },
];

const mileagesMock = [
  { value: 10000, active: false },
  { value: 12000, active: true },
  { value: 15000, active: false },
];

const mockDataResolve = Promise.resolve(mockData);

export {
  mockDataResolve,
  termsMockLoan,
  termsMockLease,
  creditScoreLoanMock,
  creditScoreLeaseMock,
  mileagesMock,
};
