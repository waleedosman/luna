"use client";

import { useState, useEffect } from "react"; // <-- Import useState and useEffect
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

export function Navigation() {
  const { openConnectModal } = useConnectModal();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  // --- ADDED: State to track client-side mounting ---
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  // ----------------------------------------------------

  // --- Helper function for placeholder button styling ---
  // You can adjust this placeholder style
  const renderPlaceholderButton = (isMobile = false) => (
    <Button
      disabled
      className={`${isMobile ? 'w-full' : 'hidden md:inline-flex'} bg-zinc-700 text-zinc-400 rounded-full`}
    >
      Loading...
    </Button>
  );
  // ----------------------------------------------------

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold text-white">Luna</Link>

        {/* Desktop Navigation Links - No changes needed here */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/create-token" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            Create Token
          </Link>
          <Link href="/create-liquidity" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            Create Liquidity
          </Link>
        </nav>

        <div className="flex items-center gap-4">

          {/* --- UPDATED: Desktop Connect/Disconnect Button Logic --- */}
          <div className="hidden md:block"> {/* Wrap in div to ensure consistent parent */}
            {!hasMounted ? (
              renderPlaceholderButton(false) // Render placeholder until mounted
            ) : !isConnected ? (
              <Button
                onClick={() => openConnectModal?.()}
                className="inline-flex bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full" // Removed 'hidden md:inline-flex' as parent handles hiding
              >
                Connect Wallet
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="inline-flex bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full"> {/* Removed 'hidden md:inline-flex' */}
                    {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Wallet'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-zinc-900 border-white/10 text-white">
                  <DropdownMenuItem
                   onClick={() => disconnect()}
                   className="cursor-pointer hover:bg-white/10" // Add hover effect
                  >
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          {/* --------------------------------------------------------- */}

          {/* Mobile Menu - Trigger is fine, Content needs update */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden border-white/20 bg-transparent hover:bg-white/10"> {/* Added bg/hover */}
                <Menu className="h-5 w-5 text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] bg-zinc-900 border-white/10 text-white">
              <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/10 focus:bg-white/10">
                <Link href="/" className="w-full block py-1.5 px-2">Home</Link> {/* Ensure link takes full item space */}
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/10 focus:bg-white/10">
                <Link href="/create-token" className="w-full block py-1.5 px-2">Create Token</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/10 focus:bg-white/10">
                <Link href="/create-liquidity" className="w-full block py-1.5 px-2">Create Liquidity</Link>
              </DropdownMenuItem>

              {/* --- UPDATED: Mobile Connect/Disconnect Button Logic --- */}
              <DropdownMenuItem className="p-0 focus:bg-transparent"> {/* Remove padding for full width button */}
                 {!hasMounted ? (
                    renderPlaceholderButton(true) // Render placeholder until mounted
                 ) : !isConnected ? (
                   <Button
                     onClick={() => openConnectModal?.()}
                     className="w-full justify-center bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-none" // Adjust styling for menu item
                   >
                     Connect Wallet
                   </Button>
                 ) : (
                   <Button
                     onClick={() => disconnect()}
                     className="w-full justify-center bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-none" // Adjust styling for menu item
                   >
                     Disconnect
                   </Button>
                 )}
              </DropdownMenuItem>
              {/* ------------------------------------------------------ */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}