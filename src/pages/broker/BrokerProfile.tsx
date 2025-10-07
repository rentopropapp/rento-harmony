import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import rentoLogo from "@/assets/rento-logo-dark.svg";
import BrokerBottomNav from "@/components/BrokerBottomNav";

const BrokerProfile = () => {
  const [rating, setRating] = useState(4);

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <img src={rentoLogo} alt="Rento" className="h-8" />
            <h1 className="font-heading text-xl font-semibold text-foreground">Rento</h1>
          </div>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="/broker/listings" className="text-muted-foreground hover:text-primary">Listings</a>
            <a href="/broker/wallet" className="text-muted-foreground hover:text-primary">Wallet</a>
            <a href="/broker/leads" className="text-muted-foreground hover:text-primary">Leads</a>
            <a href="#" className="text-primary font-medium">Profile</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-2xl">
        <Card className="p-6 border-border">
          <h2 className="font-heading text-2xl font-bold mb-6 text-foreground">My Profile</h2>

          <div className="space-y-4">
            <Input placeholder="Full Name" defaultValue="David Kato" />
            <Input placeholder="Email Address" defaultValue="david.kato@email.com" />
            <Input placeholder="Phone Number" defaultValue="+256700654321" />
            <Input placeholder="Bio" defaultValue="Experienced real estate broker specializing in rentals and investments." />
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-semibold mb-2 text-foreground">Broker Rating</h3>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 cursor-pointer ${
                    i <= rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                  }`}
                  onClick={() => setRating(i)}
                />
              ))}
            </div>
          </div>

          <Button className="mt-8 w-full bg-gradient-primary hover:opacity-90 transition-opacity">
            Save Changes
          </Button>
        </Card>
      </main>

      <BrokerBottomNav />
    </div>
  );
};

export default BrokerProfile;
