 const { Web3 } = require('web3')
const fs = require('fs')
const cron = require('node-cron')

const sqlite3 = require('sqlite3').verbose(); 
const filepath = "./liquidless.db";
// const EventEmitter = require('events'); // Import EventEmitter

module.exports = (bot) => {
  // const myEmitter = new EventEmitter();
  // myEmitter.setMaxListeners(20); // Set the limit to an appropriate value

  cron.schedule('*/15 * * * *', async () => {
    ; (async () => {
      try {
        
    // Create a MySQL database connection
    const db = new sqlite3.Database(filepath, (error) => {
    if (error) {
      return console.error(error.message);
    }
  });
  
        // Perform multiple queries in parallel
        db.all('SELECT * FROM users', [],async (err, rows) => {
  if (err) {
    throw err;
  }

        // Loop through the results
        for (const user of rows) {
          // Do something with each user row
          if (user.platform === 'Aave' && user.blockchain === 'Optimism') {
            try {
              // Perform asynchronous operation inside the loop
              await getHealthFactorOnOptimism(
                user,
                bot,
              )
            } catch (error) {
              console.error(`Error processing item  :`, error)
            }
          } 
          else if (user.platform === 'Aave' && user.blockchain === 'Base') {
            try {
              // Perform asynchronous operation inside the loop
              await getHealthFactorOnBase(
                user,
                bot,
                
              )
            } catch (error) {
              console.error(`Error processing item :`, error)
            }
          }
          else if (
            user.platform === 'Aave' &&
            user.blockchain === 'Arbitrum'
          ) {
            try {
              // Perform asynchronous operation inside the loop
              await getHealthFactorOnArbitrum(
                user,
                bot,
                
              )
            } catch (error) {
              console.error(`Error processing item ${i}:`, error)
            }
          } else if (
            user.platform === 'Aave' &&
            user.blockchain === 'Mainnet'
          ) {
            try {
              // Perform asynchronous operation inside the loop
              await getHealthFactorOnMainnet(
                user,
                bot,
              )
            } catch (error) {
              console.error(`Error processing item ${i}:`, error)
            }
          } else if (
            user.platform === 'Aave' &&
            user.blockchain === 'Polygon'
          ) {
            try {
              // Perform asynchronous operation inside the loop
              await getHealthFactorOnPolygon(
                user,
                bot,
              )
            } catch (error) {
              console.error(`Error processing item ${i}:`, error)
            }
          }
        }
})
        // Close the connection pool
       // await db.close()
      } catch (error) {
        console.error('Error:', error)
      }

        
    })()
  })
}

async function getHealthFactorOnOptimism(user_data, bot) {
  const web3 = new Web3(
    'https://optimism-mainnet.infura.io/v3/38044e8e56eb47f68aba1ba67f692d0c',
  ) // Replace with your Infura Project ID
  const contractAbi = JSON.parse(
    fs.readFileSync('server/abi/contract-abi.json', 'utf8'),
  )
  const contractAddress = '0x794a61358D6845594F94dc1DB02A252b5b4814aD'
  const contract = new web3.eth.Contract(contractAbi, contractAddress)
  try {
    const result = await contract.methods.getUserAccountData(user_data.eth_wallet_address).call()
    //console.log(result)
    let str = result.healthFactor.toString()
    let firstcrop = str.slice(0, 3)
    let decimal = Number(firstcrop)
    let finalhf = decimal / Math.pow(10, 2)
    console.log('aave op',finalhf)
    if (user_data.health_factor >= finalhf && result.totalDebtBase != 0) {
      bot.telegram.sendMessage(
        user_data.telegram_user_id,
        `The Health Factor of the address ${user_data.eth_wallet_address} on Aave Optimism is ${finalhf}.`,
      )
    }

    // console.log(`Aave on Optimism Health Factor for ${ethAddress}: ${finalhf}`)
  } catch (error) {
    console.error('Error:', error)
  }
}
async function getHealthFactorOnBase(user_data, bot) {
  const web3 = new Web3('https://mainnet.base.org') // Replace with your Infura Project ID
  const contractAbi = JSON.parse(
    fs.readFileSync('server/abi/contract-abi.json', 'utf8'),
  )
  const contractAddress = '0xA238Dd80C259a72e81d7e4664a9801593F98d1c5'
  const contract = new web3.eth.Contract(contractAbi, contractAddress)
  try {
     const result = await contract.methods.getUserAccountData(user_data.eth_wallet_address).call()
    //console.log(result)
    let str = result.healthFactor.toString()
    let firstcrop = str.slice(0, 3)
    let decimal = Number(firstcrop)
    let finalhf = decimal / Math.pow(10, 2)
    console.log('aave base',finalhf)
    if (user_data.health_factor >= finalhf && result.totalDebtBase != 0) {
      bot.telegram.sendMessage(
        user_data.telegram_user_id,
        `The Health Factor of the address ${user_data.eth_wallet_address} on Aave Base is ${finalhf}.`,
      )
    }

  } catch (error) {
    console.error('Error:', error)
  }
}
async function getHealthFactorOnArbitrum(user_data, bot) {
  const web3 = new Web3(
    'https://arbitrum-mainnet.infura.io/v3/38044e8e56eb47f68aba1ba67f692d0c',
  ) // Replace with your Infura Project ID
  const contractAbi = JSON.parse(
    fs.readFileSync('server/abi/arbitrum-aave.json', 'utf8'),
  )
  const contractAddress = '0x794a61358D6845594F94dc1DB02A252b5b4814aD'
  const contract = new web3.eth.Contract(contractAbi, contractAddress)
  try {
  const result = await contract.methods.getUserAccountData(user_data.eth_wallet_address).call()
    //console.log(result)
    let str = result.healthFactor.toString()
    let firstcrop = str.slice(0, 3)
    let decimal = Number(firstcrop)
    let finalhf = decimal / Math.pow(10, 2)
    console.log("Aave Arb",finalhf)
    if (user_data.health_factor >= finalhf && result.totalDebtBase != 0) {
      bot.telegram.sendMessage(
        user_data.telegram_user_id,
        `The Health Factor of the address ${user_data.eth_wallet_address} on Aave Arbitrum is ${finalhf}.`,
      )
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
async function getHealthFactorOnPolygon(user_data, bot) {
  const web3 = new Web3(
    'https://polygon-mainnet.infura.io/v3/38044e8e56eb47f68aba1ba67f692d0c',
  ) // Replace with your Infura Project ID
  const contractAbi = JSON.parse(
    fs.readFileSync('server/abi/contract-abi.json', 'utf8'),
  )
  const contractAddress = '0x794a61358D6845594F94dc1DB02A252b5b4814aD'
  const contract = new web3.eth.Contract(contractAbi, contractAddress)
  try {
     const result = await contract.methods.getUserAccountData(user_data.eth_wallet_address).call()
    //console.log(result)
    let str = result.healthFactor.toString()
    let firstcrop = str.slice(0, 3)
    let decimal = Number(firstcrop)
    let finalhf = decimal / Math.pow(10, 2)
    console.log("Aave Polygon",finalhf)
    if (user_data.health_factor >= finalhf && result.totalDebtBase != 0) {
      bot.telegram.sendMessage(
        user_data.telegram_user_id,
        `The Health Factor of the address ${user_data.eth_wallet_address} on Aave Polygon is ${finalhf}.`,
      )
    }

  } catch (error) {
    console.error('Error:', error)
  }
}
async function getHealthFactorOnMainnet(user_data, bot) {
  const web3 = new Web3(
    'https://mainnet.infura.io/v3/38044e8e56eb47f68aba1ba67f692d0c',
  ) // Replace with your Infura Project ID
  const contractAbi = JSON.parse(
    fs.readFileSync('server/abi/mainnet-aave.json', 'utf8'),
  )
  const contractAddress = '0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2'
  const contract = new web3.eth.Contract(contractAbi, contractAddress)
  try {
  const result = await contract.methods.getUserAccountData(user_data.eth_wallet_address).call()
    //console.log(result)
    let str = result.healthFactor.toString()
    let firstcrop = str.slice(0, 3)
    let decimal = Number(firstcrop)
    let finalhf = decimal / Math.pow(10, 2)
    console.log("Aave mainnet",finalhf)
    if (user_data.health_factor >= finalhf && result.totalDebtBase != 0) {
      bot.telegram.sendMessage(
        user_data.telegram_user_id,
        `The Health Factor of the address ${user_data.eth_wallet_address} on Aave Mainnet is ${finalhf}.`,
      )
    }

  } catch (error) {
    console.error('Error:', error)
  }
}
