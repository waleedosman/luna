"use client";

import { createSonicToken } from "@/lib/sonic";
import { useWalletClient } from "wagmi";
// MODIFICATION 1: Import useEffect
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SUPPLY_PRESETS = {
  million: '1000000',
  billion: '1000000000',
  trillion: '1000000000000',
};

interface TokenFormProps {
  isConnected: boolean;
  openConnectModal?: () => void;
  onSuccess: (address: string) => void;
  showToast: typeof toast;
}

export default function TokenForm({
  isConnected,
  openConnectModal,
  onSuccess,
  showToast
}: TokenFormProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [tokenDescription, setTokenDescription] = useState("");
  const [tokenSupply, setTokenSupply] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // Add state for the selected logo file and the returned IPFS URL
const [logoFile, setLogoFile] = useState<File | null>(null);
const [logoIpfsUrl, setLogoIpfsUrl] = useState<string | null>(null);
// --- ADDED: State for Disable Minting Checkbox ---
const [disableMinting, setDisableMinting] = useState(false);
// Add state for the other toggles (currently visual only)
const [disableFreeze, setDisableFreeze] = useState(false); // For Revoke Freeze card
const [disableUpdate, setDisableUpdate] = useState(false); // For Revoke Update card

  // MODIFICATION 2: Add hasMounted state
  const [hasMounted, setHasMounted] = useState(false);

  // MODIFICATION 3: Add useEffect hook
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { data: walletClient } = useWalletClient();

  // Replace the old handleLogoChange with this entire function
const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  setLogoPreview(null); // Reset preview
  setLogoFile(null);    // Reset file state
  setLogoIpfsUrl(null); // Reset IPFS URL state

  if (!file) {
    return;
  }

  // Basic Validation
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    showToast.error("Invalid file type. Please use JPG, PNG, or WEBP.");
    e.target.value = ''; // Reset file input
    return;
  }
  if (file.size > 2 * 1024 * 1024) { // 2MB Check
    showToast.error("File is too large. Max size is 2MB.");
    e.target.value = '';
    return;
  }

  // Dimension Validation (512x512)
  const reader = new FileReader();
  reader.onload = (loadEvent) => {
    const img = new Image();
    img.onload = () => {
      console.log(`Image dimensions: <span class="math-inline">\{img\.naturalWidth\}x</span>{img.naturalHeight}`);
      const isValidDimension = img.naturalWidth === img.naturalHeight && img.naturalWidth === 512;

      if (isValidDimension) {
        setLogoPreview(loadEvent.target?.result as string);
        setLogoFile(file); // Store the valid file object in state
        showToast.info("Logo selected. Ready to upload on submit.");
      } else {
        showToast.error("Invalid dimensions. Image must be square 512x512px.");
        e.target.value = '';
        setLogoPreview(null);
        setLogoFile(null);
      }
    };
    img.onerror = () => { showToast.error("Could not load image to check dimensions."); e.target.value = ''; };
    img.src = loadEvent.target?.result as string;
  };
  reader.onerror = () => { showToast.error("Could not read file."); e.target.value = ''; };
  reader.readAsDataURL(file);
};
// End of new handleLogoChange function

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("A. Form submitted");

    if (!isConnected) {
      console.log("B. Wallet not connected - opening modal");
      openConnectModal?.();
      return;
    }

    console.log("C. Wallet is connected:", {
      address: walletClient?.account?.address,
      chain: walletClient?.chain?.id
    });

    const form = e.target as HTMLFormElement;
    const name = (form["token-name"] as HTMLInputElement).value.trim();
    const symbol = (form["token-symbol"] as HTMLInputElement).value.trim();
    const decimals = (form["token-decimals"] as HTMLInputElement).value.trim(); // Still read as string initially
    const description = tokenDescription;
    const logo = logoPreview;

    // Validation
    const newErrors = [];
    if (!name) newErrors.push("Token name is required.");
    if (!symbol) newErrors.push("Token symbol is required.");
    if (!decimals) newErrors.push("Decimals field is required."); // Check if field has *a* value
    if (!tokenSupply) newErrors.push("Total supply is required.");
    if (!description) newErrors.push("Token description is required.");
    if (!logo) newErrors.push("Token logo is required.");
    // --- ADDED: Check logoFile state ---
if (!logoFile) newErrors.push("Valid token logo (512x512) is required.");
// -----------------------------------

    // Preliminary check for required fields
    if (newErrors.length > 0) {
      setErrors(newErrors);
      newErrors.forEach(err => showToast.error(err));
      return; // Stop if basic required fields are missing
    }

    // --- Refined Validation Logic ---
    let validationPassed = true;
    const decimalsNum = Number(decimals);
    const supplyNum = Number(tokenSupply);

    // --- COMMENTED OUT: Validation for 3-18 range (no longer needed as value is fixed) ---
/*
if (isNaN(decimalsNum) || !Number.isInteger(decimalsNum) || decimalsNum < 3 || decimalsNum > 18) {
  newErrors.push("Decimals must be an integer number between 3 and 18.");
  validationPassed = false;
}
*/
// --- Add a safety check instead (optional but recommended) ---
 if (decimalsNum !== 18) {
  newErrors.push("Decimals value is incorrectly set. Should be 18.");
  validationPassed = false;
}
// -----------------------------------------------------------------------

    if (isNaN(supplyNum) || supplyNum <= 0) {
      newErrors.push("Supply must be a number greater than 0.");
      validationPassed = false;
    }

    // Check wallet connection again just before submission
    if (!walletClient) {
        newErrors.push("Wallet connection lost. Please reconnect.");
        validationPassed = false;
    }

    // Show all validation errors together
    if (!validationPassed) {
      setErrors(newErrors);
      newErrors.forEach(err => showToast.error(err)); // Show toast for each error
      return; // Stop submission if any validation failed
    }
    // --- End Refined Validation Logic ---


    setErrors([]); // Clear errors if validation passed
    setIsLoading(true);

    // ---===[ ADDED: Upload Logo via API before calling createSonicToken ]===---
let currentLogoIpfsUrl = ""; // Temp variable for this submission's URL
if (logoFile) { // Should always be true if validation passed
  showToast.info("1/2 Uploading logo..."); // Step 1 feedback
  const fileData = new FormData();
  fileData.append("logo", logoFile); // Key matches API route

  try {
    // Make sure '/api/upload-logo' matches the API route you created
    const response = await fetch('/api/upload-logo', { method: 'POST', body: fileData });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: `HTTP error ${response.status}` }));
      throw new Error(errorData.message || `Logo upload failed`);
    }
    const result = await response.json();
    if (!result.ipfsHash) throw new Error("IPFS hash not returned from API.");

    currentLogoIpfsUrl = `ipfs://${result.ipfsHash}`; // Store full URL
    setLogoIpfsUrl(currentLogoIpfsUrl); // Update state
    console.log("Logo uploaded. IPFS URL:", currentLogoIpfsUrl);
    showToast.success("Logo uploaded!");

  } catch (uploadError: any) {
    console.error("Logo upload fetch error:", uploadError);
    setIsLoading(false); // Stop loading if upload fails
    showToast.error(`Logo upload failed: ${uploadError.message || 'Network error'}`);
    return; // Stop the rest of the handleSubmit
  }
} else {
  // This case should ideally be prevented by the earlier validation
   showToast.error("Logo file missing during submission.");
   setIsLoading(false);
   return;
}
// ---=================================================================---
    // --- Inside the handleSubmit function ---
    try {
      // ... your code to call createSonicToken ...
      console.log("D. Calling createSonicToken...");
      const tokenAddress = await createSonicToken({
        name: name || "",
        symbol: symbol || "",
        decimals: decimalsNum,
        supply: supplyNum,
        disableMinting: disableMinting, // <-- ADD THIS LINE
        logo: logo || "",
        description: description || "",
        walletClient: walletClient!,
      });

      console.log("E. Token created:", tokenAddress);
      onSuccess(tokenAddress);
      showToast.success("Token created successfully!");

    // --- CORRECTED CATCH BLOCK ---
    } catch (error) { // Removed ': any'
      console.error("F. Full error details:", error);

      // Default error message
      let message = "An unknown error occurred.";

      // Type check before accessing properties
      if (error instanceof Error) {
        message = error.message; // Safely access message
      } else if (typeof error === 'string') {
        // Handle cases where a string might be thrown
        message = error;
      }
      // Add more specific checks here if needed (e.g., for specific error codes)

      showToast.error(`Failed to create token: ${message}`);
    // ----------------------------

    } finally {
      setIsLoading(false);
    }
  }; // End of handleSubmit
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {errors.length > 0 && (
        <div className="bg-red-800/30 border border-red-500/30 text-red-300 rounded-md p-4 space-y-1">
          {errors.map((err, idx) => (
            <p key={idx} className="text-sm">⚠️ {err}</p>
          ))}
        </div>
      )}

      {/* Token Name */}
      <div className="space-y-2">
        <label htmlFor="token-name" className="text-sm font-medium leading-none">
          Token Name
        </label>
        <Input
          id="token-name"
          name="token-name"
          placeholder="e.g. My Token"
          className="bg-zinc-800/50 border-white/10"
          required
        />
      </div>

      {/* Token Symbol */}
      <div className="space-y-2">
        <label htmlFor="token-symbol" className="text-sm font-medium leading-none">
          Token Symbol
        </label>
        <Input
          id="token-symbol"
          name="token-symbol"
          placeholder="e.g. MTK"
          className="bg-zinc-800/50 border-white/10"
          required
        />
      </div>

      {/* Decimals */}
      <div className="space-y-2">
        <label htmlFor="token-decimals" className="text-sm font-medium leading-none">
          Decimals  {/* Added range hint to label */}
        </label>
        {/* --- UPDATED DECIMAL INPUT --- */}
        <Input
  id="token-decimals"
  name="token-decimals"
  type="number"
  value="18"       // <-- Set value directly
  readOnly         // <-- Add readOnly attribute
  className="bg-zinc-800/50 border-white/10 text-zinc-400" // Added text-zinc-400 for disabled look
  required
  // Removed placeholder, defaultValue, min, max, step
/>
        {/* ---------------------------- */}
      </div>

      {/* Total Supply */}
      <div className="space-y-2">
        <label htmlFor="token-supply" className="text-sm font-medium leading-none">
          Total Supply
        </label>
        <Input
          id="token-supply"
          name="token-supply"
          type="number"
          placeholder="e.g. 1000000"
          className="bg-zinc-800/50 border-white/10"
          required
          value={tokenSupply}
          onChange={(e) => setTokenSupply(e.target.value)}
        />
        <div className="flex items-center gap-2 pt-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setTokenSupply(SUPPLY_PRESETS.million)}
            className="border-white/20 text-xs px-2 h-7"
          >
            1 Million
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setTokenSupply(SUPPLY_PRESETS.billion)}
            className="border-white/20 text-xs px-2 h-7"
          >
            1 Billion
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setTokenSupply(SUPPLY_PRESETS.trillion)}
            className="border-white/20 text-xs px-2 h-7"
          >
            1 Trillion
          </Button>
        </div>
      </div>

      {/* Token Description */}
      <div className="space-y-2">
        <label htmlFor="token-description" className="text-sm font-medium leading-none">
          Token Description
        </label>
        <textarea
          id="token-description"
          maxLength={256}
          placeholder="Describe your token"
          value={tokenDescription}
          onChange={(e) => setTokenDescription(e.target.value)}
          className="bg-zinc-800/50 border-white/10 rounded-md p-3 w-full resize-none text-sm text-white placeholder-zinc-500"
          rows={4}
          required
        />
        <p className="text-zinc-500 text-xs">
          {256 - tokenDescription.length} characters remaining
        </p>
      </div>

      {/* Token Logo */}
      <div className="space-y-2">
        <label htmlFor="token-logo" className="text-sm font-medium leading-none">
          Token Logo
        </label>
        <div className="border border-dashed border-white/10 rounded-lg p-4 bg-zinc-800/50">
          <input
            id="token-logo"
            type="file"
            accept="image/jpeg, image/png, image/webp"
            className="hidden"
            onChange={handleLogoChange}
            
          />
          <label
            htmlFor="token-logo"
            className="flex flex-col items-center gap-2 text-zinc-400 text-sm cursor-pointer"
          >
            <Upload className="h-6 w-6" />
            Click or drag to upload an image
          </label>
        </div>
        {logoPreview && (
          <img
            src={logoPreview}
            alt="Logo Preview"
            className="mt-2 w-32 h-32 object-contain rounded-md border border-white/10"
          />
        )}
      </div>
{/* --- ADDED: Disable Minting Toggle --- */}
{/* --- ADDED: Optional Features Section --- */}
<div className="space-y-4 pt-2">
      <Label className="text-base font-semibold text-white">Revoke Authorities (Optional Features)</Label> {/* Section Title */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> {/* Grid Layout */}

        {/* Card 1: Revoke Mint Card (Functional) */}
        <div className="flex flex-col justify-between gap-2 rounded-lg border border-white/10 bg-zinc-900 p-4 h-full min-h-[130px]"> {/* Card Styling + min-height */}
          <div className="flex items-start justify-between gap-2">
            <Label htmlFor="disable-minting" className="text-sm font-medium text-white cursor-pointer">
              Revoke Mint
            </Label>
            <Switch
              id="disable-minting"
              checked={disableMinting} // Functional state
              onCheckedChange={setDisableMinting} // Functional handler
              className="mt-1 data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-zinc-700 flex-shrink-0"
            />
          </div>
          <p className="text-xs text-zinc-400 flex-grow">
            No one will be able to create more tokens anymore.
          </p>
          <p className="text-xs font-medium text-blue-400 text-right">
            +5 SONIC {/* Actual Fee */}
          </p>
        </div>

        {/* Card 2: Revoke Freeze Card (Visual Only - Disabled) */}
        <div className="flex flex-col justify-between gap-2 rounded-lg border border-white/10 bg-zinc-900/50 p-4 h-full min-h-[130px] opacity-60 cursor-not-allowed"> {/* Added opacity/cursor */}
           <div className="flex items-start justify-between gap-2">
            <Label htmlFor="disable-freeze" className="text-sm font-medium text-white/70"> {/* Dim label */}
              Revoke Freeze
            </Label>
            {/* Inside Revoke Freeze Card */}
<TooltipProvider delayDuration={100}>
   <Tooltip>
       {/* --- ADD asChild prop here --- */}
       <TooltipTrigger asChild tabIndex={-1}>
          <Switch
            id="disable-freeze"
            checked={disableFreeze}
            disabled
            className="mt-1 flex-shrink-0"
          />
       </TooltipTrigger>
       {/* ---------------------------- */}
       <TooltipContent className="bg-zinc-800 text-white border-white/10">
          <p>Feature not yet available</p>
       </TooltipContent>
   </Tooltip>
</TooltipProvider>
          </div>
          <p className="text-xs text-zinc-500 flex-grow"> {/* Dim description */}
            No one will be able to freeze holders' token accounts anymore.
          </p>
          <p className="text-xs font-medium text-zinc-500 text-right"> {/* Dim fee */}
             +5 SONIC {/* Placeholder Fee */}
          </p>
        </div>

        {/* Card 3: Revoke Update Card (Visual Only - Disabled) */}
         <div className="flex flex-col justify-between gap-2 rounded-lg border border-white/10 bg-zinc-900/50 p-4 h-full min-h-[130px] opacity-60 cursor-not-allowed"> {/* Added opacity/cursor */}
           <div className="flex items-start justify-between gap-2">
            <Label htmlFor="disable-update" className="text-sm font-medium text-white/70"> {/* Dim label */}
              Revoke Update
            </Label>
             {/* Inside Revoke Update Card */}
 <TooltipProvider delayDuration={100}>
    <Tooltip>
        {/* --- ADD asChild prop here --- */}
        <TooltipTrigger asChild tabIndex={-1}>
           <Switch
             id="disable-update"
             checked={disableUpdate}
             disabled
             className="mt-1 flex-shrink-0"
           />
        </TooltipTrigger>
        {/* ---------------------------- */}
        <TooltipContent className="bg-zinc-800 text-white border-white/10">
           <p>Feature not yet available</p>
        </TooltipContent>
    </Tooltip>
 </TooltipProvider>
          </div>
          <p className="text-xs text-zinc-500 flex-grow"> {/* Dim description */}
            No one will be able to modify token metadata anymore.
          </p>
          <p className="text-xs font-medium text-zinc-500 text-right"> {/* Dim fee */}
             +5 SONIC {/* Placeholder Fee */}
          </p>
        </div>

      </div> {/* End Grid */}
    </div>
    

      {/* Submit Button div starts below */}
      <div className="pt-4">
        {/* ... Submit Button ... */}
      </div>
      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          disabled={isLoading || !hasMounted || !logoFile}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full h-12"
        >
          { !hasMounted ? "Loading..." : isLoading ? "Uploading/Creating..." : isConnected ? "Create Token" : "Connect Wallet" }
        </Button>
        {/* --- CORRECTED Fee Display Text --- */}
        <p className="text-center text-zinc-500 text-xs mt-2">
           A small fee of {disableMinting ? '10' : '5'} SONIC is required to create a token
           {/* Shows 10 if disable minting checked (5 base + 5 extra), otherwise 5 */}
        </p>
        {/* --------------------------------- */}
      </div>
    </form>
  );
}