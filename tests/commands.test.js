const {postCommandsToDiscordBot} = require('../register_commands/commands')
const axios = require('axios').default;

jest.mock('axios');

afterEach(() => {
  jest.resetAllMocks();
});

describe('postCommandsToDiscordBot', () => {

    test.skip('Handles array of only resolved promises.', async () => {
        // set up mocks
        const resolvedPromise = axios.post.mockResolvedValue();
        const resolvedPromise2 = axios.post.mockResolvedValue();
        const promises = [resolvedPromise, resolvedPromise2];
        // test
        const test = postCommandsToDiscordBot(promises);
          // assert
        expect(test.resolves);
    });

    test.todo('Handles a mix of resolved and rejected promises.');

    test.todo('Handles array only rejected promises.');
});