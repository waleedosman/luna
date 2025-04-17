// luna/src/lib/sonic.ts

import type { WalletClient } from 'viem';
import { ethers, formatUnits } from "ethers";
import factoryJson from "../abi/TokenFactory.json"; // Ensure using LATEST ABI after recompiling factory

// --- IMPORTANT: UPDATE THIS with the address AFTER you redeploy the updated TokenFactory.sol ---
const FACTORY_ADDRESS = "0x736b8e8da4337268177202e34F983dc1F09A1696";
// ------------------------------------------------------------------------------------

// --- Fee Constants ---
const BASE_DEPLOYMENT_FEE_WEI = BigInt("5000000000000000000"); // 5 SONIC (18 decimals)
const DISABLE_MINT_FEE_WEI = BigInt("5000000000000000000"); // 5 SONIC (18 decimals)
// --------------------

// --- Manual Gas Limit ---
const MANUAL_GAS_LIMIT = BigInt("10000000"); // 10 million gas
// ------------------------

interface CreateSonicTokenParams {
  name: string;
  symbol: string;
  supply: number;
  decimals: number; // Should always be 18 now
  disableMinting: boolean; // Flag from form
  logo?: string;
  description?: string;
  walletClient: WalletClient;
}

export async function createSonicToken({
  name,
  symbol,
  supply,
  decimals,
  disableMinting, // Destructure the flag
  walletClient,
}: CreateSonicTokenParams): Promise<string> {

  if (!walletClient || !walletClient.account) {
    console.error("WalletClient or account not passed correctly to createSonicToken");
    throw new Error("Wallet client or account is missing.");
  }
  const userAddress = walletClient.account.address;
  console.log("createSonicToken: Received walletClient for address:", userAddress);
  console.log("createSonicToken: Disable Minting requested:", disableMinting);

  const provider = new ethers.BrowserProvider(walletClient);
  const signer = await provider.getSigner();
  const signerAddress = await signer.getAddress();
  console.log("createSonicToken: Signer obtained:", signerAddress);

  const factory = new ethers.Contract(FACTORY_ADDRESS, factoryJson.abi, signer);
  console.log("createSonicToken: Factory contract instantiated at", FACTORY_ADDRESS);

  const supplyString = supply.toString();
  if (decimals !== 18) {
      console.error("Decimals must be 18, received:", decimals);
      throw new Error("Decimals must be 18.");
  }
  const parsedSupply = ethers.parseUnits(supplyString, decimals);
  console.log(`createSonicToken: Prepared params:`, { name, symbol, parsedSupply: parsedSupply.toString(), decimals });


  // ---===[ Pre-flight Checks with Variable Fee and Corrected Catch ]===---
  // Calculate Total Fee based on flag FIRST
  const totalFeeWei = BASE_DEPLOYMENT_FEE_WEI + (disableMinting ? DISABLE_MINT_FEE_WEI : BigInt(0));
  console.log(`createSonicToken: Calculated Total Fee (Wei): ${totalFeeWei}`);

  try {
    console.log("createSonicToken: Performing pre-flight balance check using manual gas limit...");

    // Get current gas price
    const feeData = await provider.getFeeData();
    const gasPrice = feeData.gasPrice || BigInt(0);
    if (gasPrice === BigInt(0)) {
      console.warn("Could not fetch gas price or network gas price is zero.");
      // Optionally throw an error here if gas price is critical
    }
    console.log(`createSonicToken: Current Gas Price: ${ethers.formatUnits(gasPrice, "gwei")} Gwei`);

    // Calculate estimated cost using MANUAL limit
    const estimatedGasCost = MANUAL_GAS_LIMIT * gasPrice;
    // Use totalFeeWei (calculated above) in required calculation
    const totalRequiredWei = totalFeeWei + estimatedGasCost;
    console.log(`createSonicToken: Using Manual Gas Limit: ${MANUAL_GAS_LIMIT}`);
    console.log(`createSonicToken: Total Required Fee (Wei): ${totalFeeWei}`);
    console.log(`createSonicToken: Estimated Gas Cost (Wei): ${estimatedGasCost}`);
    console.log(`createSonicToken: Total Required (Wei): ${totalRequiredWei}`);

    // Get user balance
    const userBalanceWei = await provider.getBalance(signerAddress);
    console.log(`createSonicToken: User Balance (Wei): ${userBalanceWei}`);

    // Check balance
    if (userBalanceWei < totalRequiredWei) {
      const requiredSonic = ethers.formatUnits(totalRequiredWei, 18);
      const feeSonic = ethers.formatUnits(totalFeeWei, 18);
      const balanceSonic = ethers.formatUnits(userBalanceWei, 18);
      console.error(`Insufficient balance: Required=${requiredSonic} SONIC, Available=${balanceSonic} SONIC`);
      // Throw the specific, user-friendly error
      throw new Error(`Insufficient balance. You need approx. ${Number(requiredSonic).toFixed(6)} SONIC (includes ${feeSonic} SONIC fee + estimated gas), but you only have ${Number(balanceSonic).toFixed(6)} SONIC.`);
    }
    console.log("createSonicToken: Balance check passed (using manual gas limit).");

  } catch (error) { // error has type 'unknown'
    console.error("❌ Error during pre-transaction checks:", error);
    // --- CORRECTED ERROR HANDLING ---
    let message = "Failed pre-transaction checks (balance/gas price)."; // Default
    if (error instanceof Error) {
        // Use the specific message if it's one we threw (like insufficient balance)
        // or just use the generic error message.
        message = error.message;
    } else if (typeof error === 'string') {
        message = error; // Handle plain strings being thrown
    }
    // Re-throw a new error with the determined message
    throw new Error(message);
    // ------------------------------
  }
  // ---===[ END: Pre-flight Checks ]===---


  // --- Actual Contract Call (with fee value AND manual gas limit) ---
  try {
    // Use totalFeeWei calculated earlier
    console.log(`createSonicToken: Calling factory.createToken with value ${ethers.formatUnits(totalFeeWei, 18)} SONIC and manual gas limit ${MANUAL_GAS_LIMIT}...`);
    console.log(`createSonicToken: Passing disableMintingImmediately = ${disableMinting}`);

    // Add disableMinting argument and send totalFeeWei
    const tx = await factory.createToken(
      name,
      symbol,
      parsedSupply,
      disableMinting, // <-- Pass the boolean flag
      {
         value: totalFeeWei, // <-- Send calculated total fee
         gasLimit: MANUAL_GAS_LIMIT
      }
    );
    console.log("createSonicToken: Transaction sent, hash:", tx.hash);

    const receipt = await tx.wait();
    console.log("createSonicToken: Transaction mined, receipt:", receipt);

    // Find and validate the event log
    const log = receipt?.logs?.find(log => log?.fragment?.name === "TokenCreated");
    if (!log) throw new Error("TokenCreated event log not found");

    const tokenAddress = log?.args?.tokenAddress;
    if (!tokenAddress) throw new Error("Token address not found in event logs");
    console.log("createSonicToken: Token address extracted:", tokenAddress);

    return tokenAddress;

  } catch (error) { // error has type 'unknown'
    console.error("❌ Error during contract interaction in createSonicToken:", error);
    // --- CORRECTED ERROR HANDLING ---
    let message = "Unknown contract interaction error.";
    let isKnownError = false;

    // Check for common structured errors first (like RPC errors)
    if (typeof error === 'object' && error !== null) {
        // Check for common wallet action rejections
        // Use 'in' for type guarding property access on unknown object
        if ('code' in error && error.code === 4001 || error.code === "ACTION_REJECTED") {
             message = "Transaction rejected by user.";
             isKnownError = true;
        }
    }

    // If not a known structured error, check if it's an Error instance
    if (!isKnownError && error instanceof Error) {
        message = error.message; // Use the Error's message

        // Check message content for common reverts AFTER ensuring it's an Error
        if (message.includes('out of gas')) {
             message = `Transaction failed: Out of gas. Try increasing MANUAL_GAS_LIMIT in sonic.ts (currently ${MANUAL_GAS_LIMIT}).`;
        } else if (message.includes('Incorrect total fee sent')) {
             message = 'Transaction failed: Incorrect fee sent. Was the TokenFactory contract updated and redeployed correctly?';
        }
        // Add more 'else if (message.includes(...))' checks here if needed
    } else if (!isKnownError && typeof error === 'string') {
         message = error; // Handle simple thrown strings
    }

    // Throw the determined message
    throw new Error(message);
    // ------------------------------
  }
  // --- End Actual Contract Call ---
}