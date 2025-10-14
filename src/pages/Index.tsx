import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Building2,
  Shield,
  Wallet,
  Clock,
} from "lucide-react";
import rentoLogo from "@/assets/rento-logo-dark.svg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <img src={rento-logo-dark.svg} alt="Rento" className="h-8 w-auto" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/auth")}
            className="gap-2"
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-28 text-center">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Building2 className="w-8 h-8 text-primary" />
            </div>

            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-4">
              Welcome to <span className="text-primary">Rento</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Revolutionizing the rental experience — property management, secure payments, and effortless bookings in one place.
            </p>

            <Button
              onClick={() => navigate("/auth")}
              size="lg"
              className="h-14 px-8 text-lg"
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
            Why Choose Rento?
          </h2>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <Card className="p-6 text-center hover:border-primary transition">
              <div className="mb-4 flex items-center justify-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">
                Property Management
              </h3>
              <p className="text-sm text-muted-foreground">
                Manage multiple properties with ease using our intuitive dashboard.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="p-6 text-center hover:border-primary transition">
              <div className="mb-4 flex items-center justify-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">
                Secure Escrow
              </h3>
              <p className="text-sm text-muted-foreground">
                Built-in escrow system ensures safe and transparent transactions.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="p-6 text-center hover:border-primary transition">
              <div className="mb-4 flex items-center justify-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">
                Easy Payments
              </h3>
              <p className="text-sm text-muted-foreground">
                Multiple payment options with automatic tracking and receipts.
              </p>
            </Card>

            {/* Feature 4 */}
            <Card className="p-6 text-center hover:border-primary transition">
              <div className="mb-4 flex items-center justify-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">
                Real-time Booking
              </h3>
              <p className="text-sm text-muted-foreground">
                Schedule viewings and manage bookings in real-time.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ready to Transform Your Rental Experience?
          </h2>
          <p className="text-base md:text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of property managers, brokers, and tenants who trust Rento to simplify property management.
          </p>
          <Button
            onClick={() => navigate("/auth")}
            variant="secondary"
            size="lg"
            className="h-14 px-8 text-lg"
          >
            Sign Up Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
