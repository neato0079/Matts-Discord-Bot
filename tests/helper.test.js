const {
    daysAndWeeksLeft,
    countDown,
    currentExchangeRate
} = require('../lambda_bot/helper');

const axios = require('axios').default;

jest.mock('axios');

afterEach(() => {
  jest.resetAllMocks();
});

describe('daysAndWeeksLeft', () => {

    test('Returns time in only weeks if the number of days until the trip is divisible by seven.' , () => {
        // set up mocks
        const daysLeft = 14
        // test and assert
        expect(daysAndWeeksLeft(daysLeft)).toBe('2 week(s) left until fly me to Japan!');
    })
});

describe('currentExchangeRate', () => {

    test.skip('Returns USD to JPY exchange rate', () => {
        // set up mocks
        axios.get.mocked
    })

    test('Retries get request 3 times', () => {

    })

});