import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Megaphone, FileWarning, ArrowLeft, Receipt, Wallet } from "lucide-react";
import rentoLogo from "@/assets/rento-logo-dark.svg";

const TenantDashboard = () => {
  const navigate = useNavigate();

  // Mock data
  const monthsPaid = 3; // for example

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <img src={rentoLogo} alt="Rento" className="h-8 w-auto" />
            <h1 className="font-heading text-xl font-semibold text-foreground">Tenant Dashboard</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10 max-w-2xl">
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Complaints */}
          <Card
            onClick={() => navigate("/tenant/complaints")}
            className="flex flex-col items-center justify-center h-40 cursor-pointer transition-all hover:border-primary hover:shadow-md"
          >
            <FileWarning className="h-10 w-10 text-primary mb-2" />
            <p className="font-medium text-foreground">Complaints</p>
          </Card>

          {/* Notices */}
          <Card
            onClick={() => navigate("/tenant/notices")}
            className="flex flex-col items-center justify-center h-40 cursor-pointer transition-all hover:border-primary hover:shadow-md"
          >
            <Megaphone className="h-10 w-10 text-primary mb-2" />
            <p className="font-medium text-foreground">Notices</p>
          </Card>
        </div>

        {/* Expenses */}
        <Card
          onClick={() => navigate("/tenant/expenses")}
          className="flex flex-col items-center justify-center h-28 cursor-pointer transition-all hover:border-primary hover:shadow-md mb-8"
        >
          <Receipt className="h-10 w-10 text-primary mb-2" />
          <p className="font-medium text-foreground">Expenses</p>
        </Card>

        {/* Payment Summary Section */}
        <Card className="p-6 border-border space-y-4 text-center">
          <div className="flex flex-col items-center">
            <Wallet className="h-8 w-8 text-primary mb-2" />
            <h2 className="font-heading text-lg font-semibold text-foreground mb-1">
              Payment Summary
            </h2>
            <p className="text-muted-foreground text-sm">
              You have paid <span className="font-semibold text-primary">{monthsPaid}</span>{" "}
              {monthsPaid === 1 ? "month" : "months"} of rent.
            </p>
          </div>

          <Button
            onClick={() => navigate("/tenant/payments")}
            className="mt-3 h-12 w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Pay Next Month
          </Button>
        </Card>
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

export default TenantDashboard;
