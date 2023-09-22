const { Telegraf } = require('telegraf');
const session = require('telegraf/session'); 
const {Web3} = require('web3');
const mysql = require('mysql2');
// Replace 'YOUR_BOT_TOKEN' with the API token you received from BotFather
const token = '6568223655:AAFs3K8MgpB0UZnyeqMRQZ0WMlqPiwm8XxQ';
const web3 = new Web3('https://mainnet.infura.io/v3/38044e8e56eb47f68aba1ba67f692d0c'); // Replace with your Ethereum node URL

// Create a new Telegraf bot instance
const bot = new Telegraf(token);
// Create a MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'liquidless' // Replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});
// Use the session middleware to manage user sessions
bot.use(session());

// Start command handler
bot.command('start', (ctx) => {
  // Start a new session for the user
  ctx.session = {};

  // Create a keyboard with platform options (Aave, Silo Finance, Sonne)
  const platformKeyboard = Telegraf.Markup.keyboard([
    ['Aave'],
    ['Silo Finance'],
    ['Sonne']
  ])
    .resize()
    .oneTime();

  // Send a welcome message with the platform options
  ctx.reply(
    'Welcome to the Greeting Bot!\n\nPlease select a platform:',
    platformKeyboard.extra()
  );
});

// Handle platform selection
bot.hears(['Aave', 'Silo Finance', 'Sonne'], (ctx) => {
  // User has selected a platform, store it in the session
  ctx.session.platform = ctx.message.text;

  // Create a dynamic keyboard based on the platform
  let blockchainOptions;

  switch (ctx.session.platform) {
    case 'Aave':
      blockchainOptions = ['Mainnet', 'Optimism', 'Arbitrum', 'Polygon', 'Base'];
      break;
    case 'Silo Finance':
      blockchainOptions = ['Mainnet', 'Arbitrum'];
      break;
    case 'Sonne':
      blockchainOptions = ['Optimism', 'Base'];
      break;
    default:
      blockchainOptions = [];
  }

  const blockchainKeyboard = Telegraf.Markup.keyboard(blockchainOptions)
    .resize()
    .oneTime();

  // Send a message based on the platform choice and display the dynamic keyboard
  ctx.reply(
    `You have selected ${ctx.session.platform}. Please choose a blockchain:`,
    blockchainKeyboard.extra()
  );
});

// Handle blockchain selection
bot.hears(['Mainnet', 'Optimism', 'Arbitrum', 'Polygon', 'Base'], (ctx) => {
  // User has selected a blockchain, store it in the session
  ctx.session.blockchain = ctx.message.text;

  // Ask for the Ethereum wallet address
  ctx.reply(
    `You have chosen ${ctx.session.blockchain}. Please enter your Ethereum wallet address:`
  );
});

// Handle Ethereum wallet address input
bot.on('text', (ctx) => {
  if (!ctx.session.ethWalletAddress) {
    // User has entered an Ethereum wallet address, validate and store it in the session
    if (isValidEthAddress(ctx.message.text)) {
      ctx.session.ethWalletAddress = ctx.message.text;

      // Ask for the health factor
      ctx.reply('Ethereum wallet address accepted. Now, please enter your health factor (a floating-point number):');
    } else {
      ctx.reply('Invalid Ethereum wallet address. Please enter a valid address:');
    }
  } else if (!ctx.session.healthFactor) {
    // User has entered the health factor, validate and store it in the session
    const healthFactor = parseFloat(ctx.message.text);

    if (!isNaN(healthFactor) && isFinite(healthFactor)) {
      ctx.session.healthFactor = healthFactor;

      // Show a recap of the information and ask for confirmation
      const recapMessage = `
      **Recap:**
      - Platform: ${ctx.session.platform}
      - Blockchain: ${ctx.session.blockchain}
      - Ethereum Wallet Address: ${ctx.session.ethWalletAddress}
      - Health Factor: ${ctx.session.healthFactor}
      
      Is this information correct? Reply with 'Yes' to confirm or 'No' to start over.`;

      const confirmationKeyboard = Telegraf.Markup.keyboard(['Yes', 'No'])
        .resize()
        .oneTime();

      ctx.reply(recapMessage, confirmationKeyboard.extra());
    } else {
      ctx.reply('Invalid health factor. Please enter a valid number:');
    }
  }else if (ctx.session.healthFactor) {
    // User has confirmed the information, save it to the database
    if (ctx.message.text.toLowerCase() === 'yes') {
      const userId = ctx.from.id;
      const platform = ctx.session.platform;
      const blockchain = ctx.session.blockchain;
      const ethWalletAddress = ctx.session.ethWalletAddress;
      const healthFactor = ctx.session.healthFactor;
  
      // SQL query to insert user data into the 'user' table
      const sql = 'INSERT INTO users (telegram_user_id, platform, blockchain, eth_wallet_address, health_factor) VALUES (?, ?, ?, ?, ?)';
  
      // Execute the SQL query
      db.query(sql, [userId, platform, blockchain, ethWalletAddress, healthFactor], (err, results) => {
        if (err) {
          console.error('Error saving data to the database: ' + err);
          ctx.reply('Error saving data to the database. Please try again later.');
          return;
        }
     
        console.log('User data saved to the database.');
        ctx.reply('Data saved successfully. Thank you!');
      });
    } else if (ctx.message.text.toLowerCase() === 'no') {
      // User wants to start over, clear their session
      ctx.session = {};
  
      // Start over by asking for the platform choice
      const platformKeyboard = Telegraf.Markup.keyboard([
        ['Aave'],
        ['Silo Finance'],
        ['Sonne']
      ])
        .resize()
        .oneTime();
  
      ctx.reply('Starting over. Please select a platform:', platformKeyboard.extra());
    } else {
      // Invalid response, ask for 'Yes' or 'No'
      const confirmationKeyboard = Telegraf.Markup.keyboard(['Yes', 'No'])
        .resize()
        .oneTime();
  
      ctx.reply("Please reply with 'Yes' or 'No'.", confirmationKeyboard.extra());
    }
  }
});

// Helper function to validate Ethereum wallet addresses
function isValidEthAddress(address) {
  if (!web3.utils.isAddress(address)) {
    return false;
  }
  return true;
}
 

// Start the bot
bot.launch().then(() => {
  console.log('Greeting Bot is running...');
});
