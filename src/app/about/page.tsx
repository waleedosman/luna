import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Users, Shield, Zap, Rocket } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              About <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">Luna</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
              Luna is the premier launchpad for innovative projects on the Sonic blockchain.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-zinc-400 mb-8 text-center">
              To empower innovators by providing a secure, transparent, and efficient platform for launching projects on the Sonic blockchain ecosystem.
            </p>
            <Separator className="bg-gradient-to-r from-purple-500/50 to-blue-500/50 h-0.5 my-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-4">What We Do</h3>
                <p className="text-zinc-400 mb-4">
                  Luna provides end-to-end support for blockchain projects looking to launch on the Sonic ecosystem. Our platform offers:
                </p>
                <ul className="space-y-2 text-zinc-400">
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    Token launch infrastructure
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    Marketing and community building
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    Technical development support
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    Post-launch ecosystem integration
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Why Sonic?</h3>
                <p className="text-zinc-400 mb-4">
                  Sonic is a high-performance blockchain with several key advantages:
                </p>
                <ul className="space-y-2 text-zinc-400">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    High throughput and low transaction costs
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Strong developer ecosystem
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Energy-efficient consensus mechanism
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Composable architecture for building complex applications
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="py-16 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              The core principles that guide everything we do at Luna.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {values.map((value) => (
              <div key={value.title} className="bg-zinc-900/50 p-6 rounded-xl border border-white/5">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-zinc-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner with Us */}
      {/*<section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Partner With Us</h2>
            <p className="text-zinc-400 mb-8">
              Join us in building the future of decentralized applications on the Sonic blockchain.
            </p>
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full h-12 px-8 hover:opacity-90 transition-opacity" asChild>
              <Link href="/launch">
                Launch Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>*/}
    </div>
  );
}

const values = [
  {
    title: "Innovation",
    description: "We push boundaries and embrace cutting-edge technology.",
    icon: <Rocket className="h-6 w-6 text-white" />,
  },
  {
    title: "Security",
    description: "We prioritize the security of our platform and our users.",
    icon: <Shield className="h-6 w-6 text-white" />,
  },
  {
    title: "Community",
    description: "We believe in the power of community-driven development.",
    icon: <Users className="h-6 w-6 text-white" />,
  },
  {
    title: "Efficiency",
    description: "We deliver fast, reliable, and cost-effective solutions.",
    icon: <Zap className="h-6 w-6 text-white" />,
  },
];
