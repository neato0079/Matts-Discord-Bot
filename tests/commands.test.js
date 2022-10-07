const {postCommandsToDiscordBot} = require('../register_commands/commands')
const axios = require('axios').default;

jest.mock('axios');

afterEach(() => {
  jest.resetAllMocks();
});

describe('postCommandsToDiscordBot', () => {

    test('Handles array only resolved promises.', async () => {
        // set up mocks

        // test
        
        // assert
    });

    test('Handles a mix of resolved and rejected promises.', async () => {
        // set up mocks

        // test
        
        // assert
    });

    test('Handles array only rejected promises.', async () => {
        // set up mocks

        // test
        
        // assert
    });
});