import { CreditCard, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import rentoLogo from "@/assets/rento-logo-dark.svg";

const TenantPayments = () => {
  const payments = [
    {
      id: 1,
      property: "Hillview Apartment",
      date: "2024-10-01",
      amount: "800,000",
      method: "Mobile Money",
      status: "Completed",
    },
    {
      id: 2,
      property: "Garden Cottage Viewing",
      date: "2024-09-28",
      amount: "50,000",
      method: "Card",
      status: "Completed",
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
          <nav className="flex gap-6 text-sm">
            <a href="/tenant/dashboard" className="text-muted-foreground hover:text-primary">Dashboard</a>
            <a href="#" className="text-primary font-medium">Payments</a>
            <a href="/tenant/profile" className="text-muted-foreground hover:text-primary">Profile</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <h2 className="font-heading text-2xl font-bold mb-6 text-foreground">Payment History</h2>

        <div className="grid gap-6">
          {payments.map((p) => (
            <Card key={p.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center border-border">
              <div>
                <h3 className="font-semibold text-foreground">{p.property}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                  <Calendar className="h-4 w-4" /> {p.date}
                </p>
                <p className="text-sm mt-2 text-muted-foreground">Payment Method: {p.method}</p>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <p className="font-semibold text-foreground">UGX {p.amount}</p>
                <span className="text-xs text-green-600">{p.status}</span>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TenantPayments;
