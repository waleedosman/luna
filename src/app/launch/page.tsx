import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Rocket, CheckCircle, BarChart, Coins } from "lucide-react";
import Link from "next/link";

export default function LaunchPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Launch Your Project on <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">Sonic</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
              Luna provides all the tools and support you need to successfully launch your project on the Sonic blockchain.
            </p>
          </div>
        </div>
      </section>

      {/* Launch Process */}
      <section className="py-16 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Launch Process</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Our streamlined process makes it easy to go from concept to launch on the Sonic blockchain.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step) => (
              <Card key={step.title} className="bg-zinc-900/50 border-white/5">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-zinc-400">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-zinc-900/50 border-white/5">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-bold">Apply to Launch</CardTitle>
                <CardDescription className="text-zinc-400">
                  Fill out the form below to start the application process. Our team will review your submission and get back to you within 48 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none" htmlFor="project-name">
                      Project Name
                    </label>
                    <Input
                      id="project-name"
                      placeholder="Enter your project name"
                      className="bg-zinc-800/50 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none" htmlFor="project-website">
                      Project Website
                    </label>
                    <Input
                      id="project-website"
                      placeholder="https://"
                      className="bg-zinc-800/50 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none" htmlFor="email">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="bg-zinc-800/50 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none" htmlFor="token-supply">
                      Planned Token Supply
                    </label>
                    <Input
                      id="token-supply"
                      placeholder="Enter your planned token supply"
                      className="bg-zinc-800/50 border-white/10"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full h-12">
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Have questions about launching on Luna? Here are some common questions and answers.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq) => (
              <Card key={faq.question} className="bg-zinc-900/50 border-white/5">
                <CardHeader>
                  <CardTitle className="text-xl">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const steps = [
  {
    title: "Apply",
    description: "Fill out our application form with details about your project and token.",
    icon: <CheckCircle className="h-6 w-6 text-white" />,
  },
  {
    title: "Review",
    description: "Our team will review your application and provide feedback.",
    icon: <BarChart className="h-6 w-6 text-white" />,
  },
  {
    title: "Prepare",
    description: "Work with our team to prepare your token and marketing materials.",
    icon: <Coins className="h-6 w-6 text-white" />,
  },
  {
    title: "Launch",
    description: "Launch your token on the Sonic blockchain with our support.",
    icon: <Rocket className="h-6 w-6 text-white" />,
  },
];

const faqs = [
  {
    question: "What is required to launch on Luna?",
    answer: "To launch on Luna, you need a well-defined project with clear use cases and tokenomics. Our application process will guide you through the specific requirements.",
  },
  {
    question: "How long does the launch process take?",
    answer: "The typical launch process takes 2-4 weeks from application to launch, depending on the complexity of your project and your team's readiness.",
  },
  {
    question: "What support do you provide after launch?",
    answer: "We provide post-launch support including marketing assistance, community management guidance, and technical support for your token on the Sonic blockchain.",
  },
  {
    question: "What are the fees for launching on Luna?",
    answer: "Our fee structure varies based on the services required. We typically charge a combination of a flat fee and a small percentage of tokens. Details will be provided during the application process.",
  },
];
