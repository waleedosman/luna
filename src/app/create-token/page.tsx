// src/app/create-token/page.tsx (or appropriate path)
"use client";

import { useState, useEffect } from "react"; // <-- Import useEffect
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TokenForm from "./TokenForm";

import { Copy, CheckCircle, ExternalLink, Plus } from "lucide-react";
import { toast } from "sonner";

export default function CreateTokenPage() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdTokenAddress, setCreatedTokenAddress] = useState<string | null>(null);
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();

  // --- ADDED: State and Effect for client-side mounting ---
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  // ----------------------------------------------------


  const copyToClipboard = () => {
    if (createdTokenAddress) {
      navigator.clipboard.writeText(createdTokenAddress);
      toast.success("Address copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-zinc-900/50 border-white/5">
              <CardHeader className="text-center flex flex-col items-center space-y-2">
                <CardTitle className="text-2xl md:text-3xl font-bold">
                  Create Token
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Fill out the form below to create your token. All fields are required.
                </CardDescription>

                {/* --- MODIFIED: Added hasMounted check --- */}
                {hasMounted && isConnected && ( // <-- Check hasMounted FIRST
                  <p className="text-xs text-zinc-400">
                    Connected Wallet: <span className="text-white">{address}</span>
                  </p>
                )}
                {/* --------------------------------------- */}

              </CardHeader>

              <CardContent>
                {/* --- Success Modal (Design 3 - Unchanged from your last paste) --- */}
                <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                  <DialogContent className="bg-zinc-900 border border-white/10 text-white sm:max-w-md">
                    <DialogHeader className="items-center text-center">
                       <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
                       <DialogTitle className="text-xl font-medium">Token Created</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 space-y-4">
                      <div className="bg-zinc-800/60 border border-white/10 rounded-md p-3 flex items-center justify-between gap-2">
                         <code className="text-sm text-zinc-300 break-all flex-1">
                            {createdTokenAddress ?? 'N/A'}
                         </code>
                         <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                   <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={copyToClipboard}
                                      aria-label="Copy Token Address"
                                      className="text-zinc-400 hover:text-white flex-shrink-0"
                                   >
                                      <Copy className="w-4 h-4" />
                                   </Button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-zinc-800 text-white border-white/10">
                                   <p>Copy Address</p>
                                </TooltipContent>
                            </Tooltip>
                         </TooltipProvider>
                      </div>
                      <div className="flex items-center justify-center gap-4 pt-2">
                        <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                  <a
                                    href={createdTokenAddress ? `https://testnet.sonicscan.org/token/${createdTokenAddress}` : '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="View on SonicScan"
                                    className="inline-flex"
                                  >
                                    <Button variant="outline" size="icon" className="border-white/20 hover:bg-white/10">
                                       <ExternalLink className="w-4 h-4" />
                                    </Button>
                                  </a>
                                </TooltipTrigger>
                                <TooltipContent className="bg-zinc-800 text-white border-white/10">
                                   <p>View on SonicScan</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                  <a
                                    href="https://www.shadow.so/liquidity"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Add Liquidity"
                                    className="inline-flex"
                                  >
                                    <Button variant="outline" size="icon" className="border-white/20 hover:bg-white/10">
                                       <Plus className="w-4 h-4" />
                                    </Button>
                                  </a>
                                </TooltipTrigger>
                                <TooltipContent className="bg-zinc-800 text-white border-white/10">
                                   <p>Add Liquidity</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                {/* --- End Success Modal --- */}

                <TokenForm
                  isConnected={isConnected}
                  openConnectModal={openConnectModal}
                  onSuccess={(address) => {
                    setCreatedTokenAddress(address);
                    setShowSuccessModal(true);
                  }}
                  showToast={toast}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}