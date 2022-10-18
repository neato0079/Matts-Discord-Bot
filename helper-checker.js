const helper = require('./lambda_bot/helper')


const getExchange = async () => {
    const USDtoJPY = await helper.currentExchangeRate() 
    console.log(`1 USD = ${USDtoJPY.toFixed(2)} JPY`)
}

getExchange()
