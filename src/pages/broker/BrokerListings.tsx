import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import rentoLogo from "@/assets/rento-logo-dark.svg";
import BrokerBottomNav from "@/components/BrokerBottomNav";

const BrokerListings = () => {
  const properties = [
    {
      id: 1,
      title: "Modern Apartment",
      location: "Kampala, Uganda",
      price: "850,000",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      status: "Active",
    },
    {
      id: 2,
      title: "Family House",
      location: "Entebbe, Uganda",
      price: "1,500,000",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      status: "Pending",
    },
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
            <a href="#" className="text-primary font-medium">Listings</a>
            <a href="/broker/wallet" className="text-muted-foreground hover:text-primary">Wallet</a>
            <a href="/broker/leads" className="text-muted-foreground hover:text-primary">Leads</a>
            <a href="/broker/profile" className="text-muted-foreground hover:text-primary">Profile</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <h2 className="font-heading text-2xl font-bold mb-6 text-foreground">My Listings</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => (
            <Card key={p.id} className="overflow-hidden border-border">
              <img src={p.image} alt={p.title} className="h-48 w-full object-cover" />
              <div className="p-4 space-y-2">
                <h4 className="font-semibold text-foreground">{p.title}</h4>
                <p className="text-sm text-muted-foreground">{p.location}</p>
                <p className="text-sm"><strong>Price:</strong> UGX {p.price}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-muted-foreground">{p.status}</span>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <BrokerBottomNav />
    </div>
  );
};

export default BrokerListings;
