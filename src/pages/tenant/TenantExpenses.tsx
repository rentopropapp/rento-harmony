import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Wrench, Droplet, ArrowLeft, Wallet } from "lucide-react";
import rentoLogo from "@/assets/rento-logo-dark.svg";

const TenantExpenses = () => {
  const navigate = useNavigate();

  // Mock data for expenses
  const expenses = [
    { id: 1, name: "Rent", amount: 800000, icon: Home },
    { id: 2, name: "Utilities (Water & Power)", amount: 150000, icon: Droplet },
    { id: 3, name: "Maintenance", amount: 100000, icon: Wrench },
  ];

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <img src={rentoLogo} alt="Rento" className="h-8 w-auto" />
            <h1 className="font-heading text-xl font-semibold text-foreground">
              Monthly Expenses
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10 max-w-2xl space-y-6">
        {/* Expense Breakdown */}
        {expenses.map((expense) => (
          <Card
            key={expense.id}
            className="p-6 flex items-center justify-between border-border hover:border-primary/60 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <expense.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-medium text-foreground">{expense.name}</h2>
                <p className="text-sm text-muted-foreground">Monthly charge</p>
              </div>
            </div>

            <p className="font-semibold text-primary">
              UGX {expense.amount.toLocaleString()}
            </p>
          </Card>
        ))}

        {/* Total Summary */}
        <Card className="p-6 mt-6 border-border text-center space-y-2">
          <div className="flex flex-col items-center">
            <Wallet className="h-8 w-8 text-primary mb-2" />
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Total Monthly Expenses
            </h2>
            <p className="text-2xl font-bold text-primary mt-1">
              UGX {total.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              Includes rent, utilities, and maintenance charges.
            </p>
          </div>
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

export default TenantExpenses;
