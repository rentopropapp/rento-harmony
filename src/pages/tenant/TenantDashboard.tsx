import { Calendar, Home, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TenantBottomNav from "@/components/TenantBottomNav";
import rentoLogo from "@/assets/rento-logo-dark.svg";

const TenantDashboard = () => {
  const rentedProperties = [
    {
      id: 1,
      title: "Hillview Apartment",
      location: "Kampala, Uganda",
      rent: "800,000",
      status: "Active Rental",
      nextPayment: "2024-11-01",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    },
  ];

  const viewingProperties = [
    {
      id: 2,
      title: "Garden Cottage",
      location: "Muyenga, Kampala",
      scheduled: "2024-10-12",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <img src={rentoLogo} alt="Rento" className="h-8" />
            <h1 className="font-heading text-xl font-semibold text-foreground">Rento</h1>
          </div>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="/tenant/home" className="text-muted-foreground hover:text-primary">Home</a>
            <a href="/tenant/dashboard" className="text-primary font-medium">Dashboard</a>
            <a href="/tenant/payments" className="text-muted-foreground hover:text-primary">Payments</a>
            <a href="/tenant/profile" className="text-muted-foreground hover:text-primary">Profile</a>
          </nav>
        </div>
      </header>

      {/* Dashboard */}
      <main className="container mx-auto px-4 py-10">
        <h2 className="font-heading text-2xl font-bold mb-6 text-foreground">My Dashboard</h2>

        {/* Rented Properties */}
        <section className="mb-10">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Active Rentals</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {rentedProperties.map((p) => (
              <Card key={p.id} className="overflow-hidden border-border">
                <img src={p.image} alt={p.title} className="h-48 w-full object-cover" />
                <div className="p-4 space-y-2">
                  <h4 className="font-semibold text-foreground">{p.title}</h4>
                  <p className="text-muted-foreground text-sm">{p.location}</p>
                  <p className="text-sm"><strong>Rent:</strong> UGX {p.rent}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-2"><Calendar className="h-4 w-4" />Next Payment: {p.nextPayment}</span>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Scheduled Viewings */}
        <section>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Scheduled Viewings</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {viewingProperties.map((p) => (
              <Card key={p.id} className="overflow-hidden border-border">
                <img src={p.image} alt={p.title} className="h-48 w-full object-cover" />
                <div className="p-4 space-y-2">
                  <h4 className="font-semibold text-foreground">{p.title}</h4>
                  <p className="text-muted-foreground text-sm">{p.location}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-2"><Eye className="h-4 w-4" />Viewing: {p.scheduled}</span>
                    <Button variant="outline" size="sm">Reschedule</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <TenantBottomNav />
    </div>
  );
};

export default TenantDashboard;
