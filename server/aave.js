const { Web3 } = require('web3')
const fs = require('fs')

module.exports = (bot, db) => {
  ;(async () => {
    try {
      // Perform multiple queries in parallel
      const [usersResult] = await Promise.all([
        db.query('SELECT * FROM users'),
        // Add more queries here if needed
      ])

      // Loop through the results
      for (const user of usersResult[0]) {
        // Do something with each user row
        if (user.platform === 'Aave' && user.blockchain === 'Optimism') {
          try {
            // Perform asynchronous operation inside the loop
            await getHealthFactorOnOptimism(
              user.eth_wallet_address,
              bot,
              user.telegram_user_id,
            )
          } catch (error) {
            console.error(`Error processing item  :`, error)
          }
        } else if (user.platform === 'Aave' && user.blockchain === 'Base') {
          try {
            // Perform asynchronous operation inside the loop
            await getHealthFactorOnBase(
              user.eth_wallet_address,
              bot,
              user.telegram_user_id,
            )
          } catch (error) {
            console.error(`Error processing item ${i}:`, error)
          }
        } else if (user.platform === 'Aave' && user.blockchain === 'Arbitrum') {
          try {
            // Perform asynchronous operation inside the loop
            await getHealthFactorOnArbitrum(
              user.eth_wallet_address,
              bot,
              user.telegram_user_id,
            )
          } catch (error) {
            console.error(`Error processing item ${i}:`, error)
          }
        } else if (user.platform === 'Aave' && user.blockchain === 'Mainnet') {
          try {
            // Perform asynchronous operation inside the loop
            await getHealthFactorOnMainnet(
              user.eth_wallet_address,
              bot,
              user.telegram_user_id,
            )
          } catch (error) {
            console.error(`Error processing item ${i}:`, error)
          }
        } else if (user.platform === 'Aave' && user.blockchain === 'Polygon') {
          try {
            // Perform asynchronous operation inside the loop
            await getHealthFactorOnPolygon(
              user.eth_wallet_address,
              bot,
              user.telegram_user_id,
            )
          } catch (error) {
            console.error(`Error processing item ${i}:`, error)
          }
        }
      }

      // Close the connection pool
      await db.end()
    } catch (error) {
      console.error('Error:', error)
    }
  })()
}

async function getHealthFactorOnOptimism(ethAddress, bot, telegram_user_id) {
  const web3 = new Web3(
    'https://optimism-mainnet.infura.io/v3/38044e8e56eb47f68aba1ba67f692d0c',
  ) // Replace with your Infura Project ID
  const contractAbi = JSON.parse(
    fs.readFileSync('server/abi/contract-abi.json', 'utf8'),
  )
  const contractAddress = '0x794a61358D6845594F94dc1DB02A252b5b4814aD'
  const contract = new web3.eth.Contract(contractAbi, contractAddress)
  try {
    const result = await contract.methods.getUserAccountData(ethAddress).call()
    let str = result.healthFactor.toString()
    let firstcrop = str.slice(0, 3)
    let decimal = Number(firstcrop)
    let finalhf = decimal / Math.pow(10, 2)

    bot.telegram.sendMessage(
      telegram_user_id,
      `The Health Factor of the address ${ethAddress} on Aave Optimism is ${finalhf}.`,
    )
    // console.log(`Aave on Optimism Health Factor for ${ethAddress}: ${finalhf}`)
  } catch (error) {
    console.error('Error:', error)
  }
}
async function getHealthFactorOnBase(ethAddress, bot, telegram_user_id) {
  const web3 = new Web3('https://mainnet.base.org') // Replace with your Infura Project ID
  const contractAbi = JSON.parse(
    fs.readFileSync('server/abi/contract-abi.json', 'utf8'),
  )
  const contractAddress = '0xA238Dd80C259a72e81d7e4664a9801593F98d1c5'
  const contract = new web3.eth.Contract(contractAbi, contractAddress)
  try {
    const result = await contract.methods.getUserAccountData(ethAddress).call()
    let str = result.healthFactor.toString()
    let firstcrop = str.slice(0, 3)
    let decimal = Number(firstcrop)
    let finalhf = decimal / Math.pow(10, 2)
    // return finalhf;

    bot.telegram.sendMessage(
      telegram_user_id,
      `The Health Factor of the address ${ethAddress} on Aave Base is ${finalhf}.`,
    )
  } catch (error) {
    console.error('Error:', error)
  }
}
async function getHealthFactorOnArbitrum(ethAddress, bot, telegram_user_id) {
  const web3 = new Web3(
    'https://arbitrum-mainnet.infura.io/v3/38044e8e56eb47f68aba1ba67f692d0c',
  ) // Replace with your Infura Project ID
  const contractAbi = JSON.parse(
    fs.readFileSync('server/abi/arbitrum-aave.json', 'utf8'),
  )
  const contractAddress = '0x794a61358D6845594F94dc1DB02A252b5b4814aD'
  const contract = new web3.eth.Contract(contractAbi, contractAddress)
  try {
    const result = await contract.methods.getUserAccountData(ethAddress).call()
    let str = result.healthFactor.toString()
    let firstcrop = str.slice(0, 3)
    let decimal = Number(firstcrop)
    let finalhf = decimal / Math.pow(10, 2)
    // return finalhf;
    bot.telegram.sendMessage(
      telegram_user_id,
      `The Health Factor of the address ${ethAddress} on Aave Arbitrum is ${finalhf}.`,
    )
  } catch (error) {
    console.error('Error:', error)
  }
}
async function getHealthFactorOnPolygon(ethAddress, bot, telegram_user_id) {
  const web3 = new Web3(
    'https://polygon-mainnet.infura.io/v3/38044e8e56eb47f68aba1ba67f692d0c',
  ) // Replace with your Infura Project ID
  const contractAbi = JSON.parse(
    fs.readFileSync('server/abi/contract-abi.json', 'utf8'),
  )
  const contractAddress = '0x794a61358D6845594F94dc1DB02A252b5b4814aD'
  const contract = new web3.eth.Contract(contractAbi, contractAddress)
  try {
    const result = await contract.methods.getUserAccountData(ethAddress).call()
    let str = result.healthFactor.toString()
    let firstcrop = str.slice(0, 3)
    let decimal = Number(firstcrop)
    let finalhf = decimal / Math.pow(10, 2)
    // return finalhf;
    bot.telegram.sendMessage(
      telegram_user_id,
      `The Health Factor of the address ${ethAddress} on Aave Polygon is ${finalhf}.`,
    )
  } catch (error) {
    console.error('Error:', error)
  }
}
async function getHealthFactorOnMainnet(ethAddress, bot, telegram_user_id) {
  const web3 = new Web3(
    'https://mainnet.infura.io/v3/38044e8e56eb47f68aba1ba67f692d0c',
  ) // Replace with your Infura Project ID
  const contractAbi = JSON.parse(
    fs.readFileSync('server/abi/mainnet-aave.json', 'utf8'),
  )
  const contractAddress = '0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2'
  const contract = new web3.eth.Contract(contractAbi, contractAddress)
  try {
    const result = await contract.methods.getUserAccountData(ethAddress).call()
    let str = result.healthFactor.toString()
    let firstcrop = str.slice(0, 3)
    let decimal = Number(firstcrop)
    let finalhf = decimal / Math.pow(10, 2)
    // return finalhf;
    bot.telegram.sendMessage(
      telegram_user_id,
      `The Health Factor of the address ${ethAddress} on Aave Mainnet is ${finalhf}.`,
    )
  } catch (error) {
    console.error('Error:', error)
  }
}
