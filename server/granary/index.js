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
          if (user.platform === 'Granary Finance' && user.blockchain === 'Optimism') {
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
          else if (user.platform === 'Granary Finance' && user.blockchain === 'Base') {
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
            user.platform === 'Granary Finance' &&
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
            user.platform === 'Granary Finance' &&
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
            user.platform === 'Granary Finance' &&
            user.blockchain === 'BSC'
          ) {
            try {
              // Perform asynchronous operation inside the loop
              await getHealthFactorOnBSC(
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
    fs.readFileSync('server/granary/abi/contract-abi.json', 'utf8'),
  )
  const contractAddress = '0x8FD4aF47E4E63d1D2D45582c3286b4BD9Bb95DfE'
  const contract = new web3.eth.Contract(contractAbi, contractAddress)
  try {
    const result = await contract.methods.getUserAccountData(user_data.eth_wallet_address).call()
      // console.log(result)s
    let str = result.healthFactor.toString()
    let firstcrop = str.slice(0, 3)
    let decimal = Number(firstcrop)
    let finalhf = decimal / Math.pow(10, 2)
    console.log('granary op',finalhf)
    if (user_data.health_factor >= finalhf && result.totalDebtBase != 0) {
      bot.telegram.sendMessage(
        user_data.telegram_user_id,
        `The Health Factor of the address ${user_data.eth_wallet_address} on Granary Finance Optimism is ${finalhf}.`,
      )
    }

    // console.log(`Granary Finance on Optimism Health Factor for ${ethAddress}: ${finalhf}`)
  } catch (error) {
    console.error('Error:', error)
  }
}
async function getHealthFactorOnBase(user_data, bot) {
  const web3 = new Web3('https://mainnet.base.org') // Replace with your Infura Project ID
  const contractAbi = JSON.parse(
    fs.readFileSync('abi/contract-abi.json', 'utf8'),
  )
  const contractAddress = '0xB702cE183b4E1Faa574834715E5D4a6378D0eEd3       '
  const contract = new web3.eth.Contract(contractAbi, contractAddress)
  try {
     const result = await contract.methods.getUserAccountData(user_data.eth_wallet_address).call()
    //console.log(result)
    let str = result.healthFactor.toString()
    let firstcrop = str.slice(0, 3)
    let decimal = Number(firstcrop)
    let finalhf = decimal / Math.pow(10, 2)
    console.log('Granary Finance Base',finalhf)
    if (user_data.health_factor >= finalhf && result.totalDebtBase != 0) {
      bot.telegram.sendMessage(
        user_data.telegram_user_id,
        `The Health Factor of the address ${user_data.eth_wallet_address} on Granary Finance Base is ${finalhf}.`,
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
    fs.readFileSync('abi/arbitrum.json', 'utf8'),
  )
  const contractAddress = '0x102442A3BA1e441043154Bc0B8A2e2FB5E0F94A7'
  const contract = new web3.eth.Contract(contractAbi, contractAddress)
  try {
  const result = await contract.methods.getUserAccountData(user_data.eth_wallet_address).call()
    //console.log(result)
    let str = result.healthFactor.toString()
    let firstcrop = str.slice(0, 3)
    let decimal = Number(firstcrop)
    let finalhf = decimal / Math.pow(10, 2)
    console.log(finalhf)
    if (user_data.health_factor >= finalhf && result.totalDebtBase != 0) {
      bot.telegram.sendMessage(
        user_data.telegram_user_id,
        `The Health Factor of the address ${user_data.eth_wallet_address} on Granary Finance Arbitrum is ${finalhf}.`,
      )
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
async function getHealthFactorOnBSC(user_data, bot) {
  const web3 = new Web3(
    'https://bsc-dataseed1.bnbchain.org',
  ) // Replace with your Infura Prosject ID
  const contractAbi = JSON.parse(
    fs.readFileSync('abi/contract-abi.json', 'utf8'),
  )
  const contractAddress = '0x7171054f8d148Fe1097948923C91A6596fC29032'
  const contract = new web3.eth.Contract(contractAbi, contractAddress)
  try {
     const result = await contract.methods.getUserAccountData(user_data.eth_wallet_address).call()
    //console.log(result)
    let str = result.healthFactor.toString()
    let firstcrop = str.slice(0, 3)
    let decimal = Number(firstcrop)
    let finalhf = decimal / Math.pow(10, 2)
    console.log(finalhf)
    if (user_data.health_factor >= finalhf && result.totalDebtBase != 0) {
      bot.telegram.sendMessage(
        user_data.telegram_user_id,
        `The Health Factor of the address ${user_data.eth_wallet_address} on Granary Finance BSC is ${finalhf}.`,
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
    fs.readFileSync('abi/mainnet.json', 'utf8'),
  )
  const contractAddress = '0xB702cE183b4E1Faa574834715E5D4a6378D0eEd3'
  const contract = new web3.eth.Contract(contractAbi, contractAddress)
  try {
  const result = await contract.methods.getUserAccountData(user_data.eth_wallet_address).call()
    //console.log(result)
    let str = result.healthFactor.toString()
    let firstcrop = str.slice(0, 3)
    let decimal = Number(firstcrop)
    let finalhf = decimal / Math.pow(10, 2)
    console.log(finalhf)
    if (user_data.health_factor >= finalhf && result.totalDebtBase != 0) {
      bot.telegram.sendMessage(
        user_data.telegram_user_id,
        `The Health Factor of the address ${user_data.eth_wallet_address} on Granary Finance Mainnet is ${finalhf}.`,
      )
    }

  } catch (error) {
    console.error('Error:', error)
  }
}
