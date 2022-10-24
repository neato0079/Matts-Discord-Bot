const {
    daysAndWeeksLeft,
    countDown,
    currentExchangeRate
} = require('../lambda_bot/helper');

describe('daysAndWeeksLeft', () => {

    test('Returns time in only weeks if the number of days until the trip is divisible by seven.' , () => {
        // set up mocks
        const daysLeft = 14

        expect(daysAndWeeksLeft(daysLeft)).toBe('2 week(s) left until fly me to Japan!')
    })
})