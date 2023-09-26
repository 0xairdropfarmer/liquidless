import * as compoundkit from '@protocolink/compound-kit';
import * as common from '@protocolink/common';

const chainId = common.ChainId.arbitrum;
const marketId = compoundkit.MarketId.USDC;
const account = '0xdaf7bbe20724d2dd7717e0e09a06b572c3a112de';
const marketInfo = await compoundkit.getMarketInfo(chainId, marketId, account);

console.log(marketInfo)