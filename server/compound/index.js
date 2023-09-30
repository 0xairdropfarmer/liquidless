// const { Web3 } = require('web3')
// const fs = require('fs')
const cron = require('node-cron')

const sqlite3 = require('sqlite3').verbose();
const filepath = "./liquidless.db";

module.exports = (bot) => {
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
                db.all('SELECT * FROM users', [], async (err, rows) => {
                    if (err) {
                        throw err;
                    }

                    // Loop through the results
                    for (const user of rows) {
                        // Do something with each user row
                        if (user.platform === 'Compound' && user.blockchain === 'Mainnet USDC') {
                            try {
                                // Perform asynchronous operation inside the loop
                                await getHealthFactorOnMainnetUSDC(
                                    user,
                                    bot,
                                )
                            } catch (error) {
                                console.error(`Error processing item  :`, error)
                            }
                        }
                          else if (user.platform === 'Compound' && user.blockchain === 'Mainnet ETH') {
                            try {
                              // Perform asynchronous operation inside the loop
                              await getHealthFactorOnMainnetETH(
                                user,
                                bot,

                              )
                            } catch (error) {
                              console.error(`Error processing item :`, error)
                            }
                          }else if ( 
                            user.platform === 'Compound' && 
                            user.blockchain === 'Arbitrum USDC'
                          ) {
                            try {
                              // Perform asynchronous operation inside the loop
                              await getHealthFactorOnArbitrumUSDC(
                                user,
                                bot,

                              )
                            } catch (error) {
                              console.error(`Error processing item ${i}:`, error)
                            }
                          }
                          else if ( 
                            user.platform === 'Compound' && 
                            user.blockchain === 'Arbitrum USDC.e'
                          ) {
                            try {
                              // Perform asynchronous operation inside the loop
                              await getHealthFactorOnArbitrumUSDCe(
                                user,
                                bot,

                              )
                            } catch (error) {
                              console.error(`Error processing item ${i}:`, error)
                            }
                          } else if ( 
                            user.platform === 'Compound' && 
                            user.blockchain === 'Polygon USDC'
                          ) {
                            try {
                              // Perform asynchronous operation inside the loop
                              await getHealthFactorOnPolygonUSDC(
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



async function getHealthFactorOnMainnetUSDC(user_data, bot) {
    let api_url = `https://compound-kit-api.protocolink.com/v1/markets/1/usdc?account=${user_data.eth_wallet_address}`;
    // let api_url = `https://compound-kit-api.protocolink.com/v1/markets/1/usdc?account=0x18740d1fb377ddbcc685d1c24e42bd7ddf1719c9`;
    
    // console.log(api_url)
    fetch(api_url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => { 
            let health_factor = data.healthRate;
            console.log("Compound mainnet usdc",health_factor)
            if (user_data.health_factor >= health_factor ) {
              bot.telegram.sendMessage(
                user_data.telegram_user_id,
                `The Health Factor of the address ${user_data.eth_wallet_address} on Compound Mainnet USDC is ${health_factor}.`,
              )
            }
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Fetch error:', error);
        });


} 
async function getHealthFactorOnMainnetETH(user_data, bot) {
    let api_url = `https://compound-kit-api.protocolink.com/v1/markets/1/eth?account=${user_data.eth_wallet_address}`;
    // let api_url = `https://compound-kit-api.protocolink.com/v1/markets/1/usdc?account=0x18740d1fb377ddbcc685d1c24e42bd7ddf1719c9`;
    
    
    fetch(api_url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => { 
            let health_factor = data.healthRate;
            console.log("Compound mainnet eth",health_factor)
            if (user_data.health_factor >= health_factor ) {
              bot.telegram.sendMessage(
                user_data.telegram_user_id,
                `The Health Factor of the address ${user_data.eth_wallet_address} on Compound Mainnet ETH is ${health_factor}.`,
              )
            }
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Fetch error:', error);
        });


} 
async function getHealthFactorOnArbitrumUSDC(user_data, bot) {
  let api_url = `https://compound-kit-api.protocolink.com/v1/markets/42161/usdc?account=${user_data.eth_wallet_address}`;
  // let api_url = `https://compound-kit-api.protocolink.com/v1/markets/1/usdc?account=0x18740d1fb377ddbcc685d1c24e42bd7ddf1719c9`;
  
  
  fetch(api_url)
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => { 
          let health_factor = data.healthRate;
          console.log("Compound Arbitrum USDC",health_factor)
          if (user_data.health_factor >= health_factor ) {
            bot.telegram.sendMessage(
              user_data.telegram_user_id,
              `The Health Factor of the address ${user_data.eth_wallet_address} on Compound Arbitrum USDC Circle Native is ${health_factor}.`,
            )
          }
      })
      .catch(error => {
          // Handle any errors that occurred during the fetch
          console.error('Fetch error:', error);
      });


} 
async function getHealthFactorOnArbitrumUSDCe(user_data, bot) {
    let api_url = `https://compound-kit-api.protocolink.com/v1/markets/42161/usdc.e?account=${user_data.eth_wallet_address}`;
    // let api_url = `https://compound-kit-api.protocolink.com/v1/markets/1/usdc?account=0x18740d1fb377ddbcc685d1c24e42bd7ddf1719c9`;
    
    
    fetch(api_url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => { 
            let health_factor = data.healthRate;
            console.log("Compound Arbitrum USDCe",health_factor)
            if (user_data.health_factor >= health_factor ) {
              bot.telegram.sendMessage(
                user_data.telegram_user_id,
                `The Health Factor of the address ${user_data.eth_wallet_address} on Compound Arbitrum USDC.e is ${health_factor}.`,
              )
            }
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Fetch error:', error);
        });


} 
async function getHealthFactorOnPolygonUSDC(user_data, bot) {
    let api_url = `https://compound-kit-api.protocolink.com/v1/markets/137/usdc?account=${user_data.eth_wallet_address}`;
    // let api_url = `https://compound-kit-api.protocolink.com/v1/markets/1/usdc?account=0x18740d1fb377ddbcc685d1c24e42bd7ddf1719c9`;
    
    
    fetch(api_url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => { 
            let health_factor = data.healthRate;
            console.log("Compound Polygon USDC",health_factor)
            if (user_data.health_factor >= health_factor ) {
              bot.telegram.sendMessage(
                user_data.telegram_user_id,
                `The Health Factor of the address ${user_data.eth_wallet_address} on Compound Polygon USDC is ${health_factor}.`,
              )
            }
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Fetch error:', error);
        });


} 