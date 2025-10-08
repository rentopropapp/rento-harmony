import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Wallet, ArrowLeft, CreditCard } from "lucide-react";
import rentoLogo from "@/assets/rento-logo-dark.svg";

const TenantPayments = () => {
  const navigate = useNavigate();

  // Mock payment data
  const payments = [
    {
      id: 1,
      month: "July 2024",
      amount: "800,000",
      date: "2024-07-01",
      status: "Completed",
      method: "Mobile Money",
    },
    {
      id: 2,
      month: "August 2024",
      amount: "800,000",
      date: "2024-08-01",
      status: "Completed",
      method: "Card Payment",
    },
    {
      id: 3,
      month: "September 2024",
      amount: "800,000",
      date: "2024-09-01",
      status: "Completed",
      method: "Bank Transfer",
    },
  ];

  const nextDue = "November 1, 2024";
  const nextAmount = "800,000";

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <img src={rentoLogo} alt="Rento" className="h-8 w-auto" />
            <h1 className="font-heading text-xl font-semibold text-foreground">
              Payment History
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10 max-w-2xl">
        {/* Summary Section */}
        <Card className="p-6 border-border mb-8">
          <div className="flex flex-col items-center text-center space-y-2">
            <Wallet className="h-8 w-8 text-primary" />
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Rent Payment Summary
            </h2>
            <p className="text-muted-foreground text-sm">
              Your next payment of{" "}
              <span className="text-primary font-semibold">UGX {nextAmount}</span> is due on{" "}
              <span className="text-primary font-semibold">{nextDue}</span>.
            </p>
            <Button className="mt-3 h-12 w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Pay Now
            </Button>
          </div>
        </Card>

        {/* Payment History */}
        <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
          Previous Payments
        </h3>
        <div className="space-y-4">
          {payments.map((payment) => (
            <Card
              key={payment.id}
              className="p-6 border-border flex flex-col md:flex-row md:items-center md:justify-between hover:border-primary/60 transition-all"
            >
              <div>
                <h4 className="font-semibold text-foreground">{payment.month}</h4>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                  <CalendarDays className="h-4 w-4" /> {payment.date}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Method: {payment.method}
                </p>
              </div>

              <div className="text-right mt-4 md:mt-0">
                <p className="font-semibold text-primary">UGX {payment.amount}</p>
                <p className="text-xs text-green-600">{payment.status}</p>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/* Back Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate(-1)}
        className="fixed bottom-6 left-6 rounded-full bg-card border border-border shadow-sm hover:bg-muted"
      >
        <ArrowLeft className="h-5 w-5 text-primary" />
      </Button>
    </div>
  );
};

export default TenantPayments;
