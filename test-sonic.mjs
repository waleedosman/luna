import { SonicProvider } from '@0xsonic/sdk';

const provider = new SonicProvider('https://rpc.sonic.fusion.xyz');

const latestBlock = await provider.getBlockNumber();
console.log('Latest Sonic Block:', latestBlock);
