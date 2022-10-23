const helper = require('./lambda_bot/helper')


 const getExchange = async () => {
    const USDtoJPY = await helper.currentExchangeRate() 
    return `1 USD = ${USDtoJPY} JPY`
    // console.log(await helper.currentExchangeRate)
    // return await helper.currentExchangeRate()

 }

const main = async () => {
    const data = {
        stuff: 'stuff',
        result: await getExchange()
    }
    return data
}

getExchange().then(console.log('DONE'))
