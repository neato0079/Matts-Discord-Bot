const {postCommandsToDiscordBot} = require('../register_commands/commands')
const axios = require('axios').default;

jest.mock('axios');

afterEach(() => {
  jest.resetAllMocks();
});

describe('postCommandsToDiscordBot', () => {

    test.only('Handles array of only resolved promises.', async () => {
        // set up mocks
        const resolvedPromise = axios.post.mockResolvedValue();
        const resolvedPromise2 = axios.post.mockResolvedValue();
        const promises = [resolvedPromise, resolvedPromise2];
        // test
        const test = postCommandsToDiscordBot(promises);
          // assert
        await expect(test.resolves)
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