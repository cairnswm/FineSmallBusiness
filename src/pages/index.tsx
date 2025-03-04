// Update this page (the content is just a fallback if you fail to update the page). Always include w-full and min-h-screen classes in the main element.
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/landing/FeatureCard";
import PricingCard from "@/components/landing/PricingCard";
import WaitingListModal from "@/components/landing/WaitingListModal";

const Index = () => {
  return (
    <main className="w-full bg-background">
      <div className="container mx-auto px-4 py-8 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-primary">Manage Quotes & Invoices Effortlessly</h1>
          <p className="text-lg text-muted-foreground">
            Streamline your business operations with our intuitive platform.
          </p>
          <div className="flex justify-center gap-4">
            <WaitingListModal>
              <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg">
                Join Waiting List
              </Button>
            </WaitingListModal>
            <Button
              asChild
              className="border border-input hover:bg-accent hover:text-accent-foreground px-6 py-3 rounded-lg"
            >
              <a href="/dashboard">Open App</a>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold text-center">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard title="Create Quotes" description="Easily generate professional quotes for your clients." />
            <FeatureCard title="Track Invoices" description="Monitor payments and manage invoices seamlessly." />
            <FeatureCard title="Analytics" description="Gain insights into your business performance." />
          </div>
        </section>

        {/* Pricing Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold text-center">Pricing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <PricingCard
              title="Basic"
              price="$9.99/month"
              features={["Create Quotes", "Track Invoices"]}
            />
            <PricingCard
              title="Pro"
              price="$19.99/month"
              features={["All Basic Features", "Advanced Analytics"]}
            />
            <PricingCard
              title="Enterprise"
              price="Custom"
              features={["All Pro Features", "Dedicated Support"]}
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Index;