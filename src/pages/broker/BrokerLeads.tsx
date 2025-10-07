import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";
import rentoLogo from "@/assets/rento-logo-dark.svg";
import BrokerBottomNav from "@/components/BrokerBottomNav";

const BrokerLeads = () => {
  const leads = [
    { id: 1, name: "Sarah Nakato", email: "sarah.nakato@email.com", property: "Hillview Apartment", message: "Interested in 2-bedroom rental" },
    { id: 2, name: "John Ouma", email: "john.ouma@email.com", property: "Garden Cottage", message: "Looking to view next week" },
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
            <a href="/broker/wallet" className="text-muted-foreground hover:text-primary">Wallet</a>
            <a href="#" className="text-primary font-medium">Leads</a>
            <a href="/broker/profile" className="text-muted-foreground hover:text-primary">Profile</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <h2 className="font-heading text-2xl font-bold mb-6 text-foreground">Leads</h2>
        <div className="grid gap-6">
          {leads.map((lead) => (
            <Card key={lead.id} className="p-6 border-border space-y-2">
              <h4 className="font-semibold text-foreground">{lead.name}</h4>
              <p className="text-sm text-muted-foreground">{lead.email}</p>
              <p className="text-sm text-muted-foreground">{lead.property}</p>
              <p className="text-sm">{lead.message}</p>
              <button
                onClick={() =>
                  (window.location.href = `mailto:${lead.email}?subject=Regarding ${lead.property}`)
                }
                className="mt-2 text-primary text-sm flex items-center gap-2"
              >
                <Mail className="h-4 w-4" /> Contact
              </button>
            </Card>
          ))}
        </div>
      </main>

      <BrokerBottomNav />
    </div>
  );
};

export default BrokerLeads;
