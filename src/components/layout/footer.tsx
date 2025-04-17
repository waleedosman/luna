import Link from "next/link";
import { Twitter, Github, MessageSquare } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-900/30 border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">Luna</span>
            </Link>
            <p className="mt-4 text-zinc-400 text-sm">
              The premier launchpad for Sonic blockchain projects. Get early access to the most innovative projects in the ecosystem.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Pages</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              
              {/*<li>
                <Link href="/launch" className="text-zinc-400 hover:text-white transition-colors">
                  Launch
                </Link>
              </li>*/}
              <li>
                <Link href="/create-token" className="text-zinc-400 hover:text-white transition-colors">
                  Create Token
                </Link>
              </li>
              <li>
                <Link href="/create-liquidity" className="text-zinc-400 hover:text-white transition-colors">
                  Create Liquidity
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-zinc-400 hover:text-white transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {/*
              <li>
                <Link href="/docs" className="text-zinc-400 hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              */}
              <li>
                <Link href="/faqs" className="text-zinc-400 hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              {/*
              <li>
                <Link href="/blog" className="text-zinc-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              */}
              <li>
                <Link href="/privacy" className="text-zinc-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
            <div className="flex gap-4 mb-4">
              <a
                href="https://twitter.com/lunalaunch"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://discord.gg/luna"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
              >
                <MessageSquare className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/lunadev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
            <p className="text-zinc-400 text-sm">
              Contact us at <a href="mailto:info@lunalaunch.net" className="text-white hover:underline">info@lunalaunch.net</a>
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-400 text-sm">
            &copy; {new Date().getFullYear()} Luna Launch. All rights reserved.
          </p>
          <p className="text-zinc-400 text-sm mt-2 md:mt-0">
            Powered by <span className="text-white">Sonic</span> Blockchain
          </p>
        </div>
      </div>
    </footer>
  );
}
