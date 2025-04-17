import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Twitter, Github, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CommunityPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Join Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">Community</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
              Connect with other builders, investors, and enthusiasts in the Sonic blockchain ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {socialLinks.map((social) => (
                <Card key={social.name} className="bg-zinc-900/50 border-white/5 hover:border-purple-500/30 transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                      {social.icon}
                    </div>
                    <CardTitle>{social.name}</CardTitle>
                    <CardDescription className="text-zinc-400">
                      {social.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white" asChild>
                      <a href={social.link} target="_blank" rel="noopener noreferrer">
                        Join {social.name}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Join us at these upcoming events to learn more about Luna and the Sonic ecosystem.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {events.map((event) => (
              <Card key={event.title} className="bg-zinc-900/50 border-white/5">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <CardDescription className="text-zinc-400 mt-1">
                        {event.date} • {event.location}
                      </CardDescription>
                    </div>
                    <Button variant="outline" className="border-white/20 text-white rounded-full hover:bg-white/10 transition-colors" asChild>
                      <a href={event.link} target="_blank" rel="noopener noreferrer">
                        Register
                      </a>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-white/5">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-bold text-center">Subscribe to Our Newsletter</CardTitle>
                <CardDescription className="text-zinc-400 text-center">
                  Get the latest updates, announcements, and insights from the Luna team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-zinc-800/50 text-white border border-white/10 rounded-lg px-4 py-2"
                  />
                  <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg">
                    Subscribe
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

const socialLinks = [
  {
    name: "Discord",
    description: "Join our Discord community to chat with the team and other community members.",
    icon: <MessageSquare className="h-6 w-6 text-white" />,
    link: "https://discord.gg/luna",
  },
  {
    name: "Twitter",
    description: "Follow us on Twitter for the latest announcements and updates.",
    icon: <Twitter className="h-6 w-6 text-white" />,
    link: "https://twitter.com/lunalaunch",
  },
  {
    name: "GitHub",
    description: "Explore our open source code and contribute to the ecosystem.",
    icon: <Github className="h-6 w-6 text-white" />,
    link: "https://github.com/lunadev",
  },
];

const events = [
  {
    title: "Luna Launch Workshop",
    date: "June 15, 2025",
    location: "Virtual",
    description: "Learn how to launch your token on the Sonic blockchain with Luna. This workshop will cover the entire process from application to post-launch support.",
    link: "#",
  },
  {
    title: "Sonic Ecosystem Conference",
    date: "July 22-23, 2025",
    location: "San Francisco, CA",
    description: "Join the Luna team and other Sonic ecosystem projects for two days of talks, workshops, and networking opportunities.",
    link: "#",
  },
  {
    title: "DeFi on Sonic Hackathon",
    date: "August 5-12, 2025",
    location: "Virtual",
    description: "Build the next generation of DeFi applications on the Sonic blockchain. $50,000 in prizes available for the best projects.",
    link: "#",
  },
];
