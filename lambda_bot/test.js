const testEvent = {
    headers : {
        'x-signature-ed25519' : 'success'
    },
}

const testSig = testEvent.headers['x-signature-ed25519']

//testEvent['headers'] = 'x-signature-ed25519'

console.log(testSig) 
