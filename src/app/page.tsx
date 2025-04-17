import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Launch your project on <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">Sonic</span> with Luna
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
              The premier launchpad for Sonic blockchain projects. Get early access to the most innovative projects in the ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full h-12 px-8 hover:opacity-90 transition-opacity" asChild>
                <Link href="/create-token">
                  Create Your Sonic Token
                  <Rocket className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Luna</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Luna provides the tools and infrastructure to successfully launch and grow your project on the Sonic blockchain.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-zinc-900/50 p-6 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-zinc-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Launch Your Token?</h2>
            <p className="text-zinc-400 mb-8">
              Join the growing ecosystem of innovative projects launching on Sonic with Luna.
            </p>
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full h-12 px-8 hover:opacity-90 transition-opacity" asChild>
              <Link href="/create-token">
                Create Your Token Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: "Launch Support",
    description: "End-to-end support for your token launch, from initial setup to post-launch marketing.",
    icon: <Rocket className="h-6 w-6 text-white" />,
  },
  {
    title: "Sonic Integration",
    description: "Seamless integration with the Sonic blockchain ecosystem for fast and low-cost transactions.",
    icon: <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 5L21 12L13 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
  },
  {
    title: "Community Building",
    description: "Tools and strategies to build and engage your community before, during, and after launch.",
    icon: <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3438 16.8736 16.717 16.6438 16.1429M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35625 16.1429M7 20V18C7 17.3438 7.12642 16.717 7.35625 16.1429M7.35625 16.1429C8.0935 14.301 9.89482 13 12 13C14.1052 13 15.9065 14.301 16.6438 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM21 10C21 11.1046 20.1046 12 19 12C17.8954 12 17 11.1046 17 10C17 8.89543 17.8954 8 19 8C20.1046 8 21 8.89543 21 10ZM7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
  },
];
