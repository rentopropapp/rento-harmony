import { Card } from "@/components/ui/card";
import { Wallet } from "lucide-react";
import rentoLogo from "@/assets/rento-logo-dark.svg";
import BrokerBottomNav from "@/components/BrokerBottomNav";

const BrokerWallet = () => {
  const transactions = [
    { id: 1, description: "Hillview Apartment Commission", amount: "200,000", date: "2024-10-02" },
    { id: 2, description: "Viewing Fee - Garden Cottage", amount: "50,000", date: "2024-10-05" },
  ];

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
            <a href="#" className="text-primary font-medium">Wallet</a>
            <a href="/broker/leads" className="text-muted-foreground hover:text-primary">Leads</a>
            <a href="/broker/profile" className="text-muted-foreground hover:text-primary">Profile</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-2xl font-bold text-foreground">Wallet</h2>
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" />
            <span className="font-semibold text-primary">UGX 250,000</span>
          </div>
        </div>

        <div className="space-y-4">
          {transactions.map((t) => (
            <Card key={t.id} className="p-4 border-border flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-foreground">{t.description}</h4>
                <p className="text-sm text-muted-foreground">{t.date}</p>
              </div>
              <p className="font-semibold text-primary">+ UGX {t.amount}</p>
            </Card>
          ))}
        </div>
      </main>

      <BrokerBottomNav />
    </div>
  );
};

export default BrokerWallet;
