import { Card } from "@/components/ui/card";
import { Wallet } from "lucide-react";
import rentoLogo from "@/assets/rento-logo-dark.svg";
import BrokerBottomNav from "@/components/BrokerBottomNav";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const BrokerWallet = () => {
  const transactions = [
    { id: 1, description: "Hillview Apartment Commission", amount: 200000, date: "2024-10-02" },
    { id: 2, description: "Viewing Fee - Garden Cottage", amount: 50000, date: "2024-10-05" },
  ];

  // Mock data for graph (monthly broker earnings)
  const growthData = [
    { month: "June", earnings: 180000 },
    { month: "July", earnings: 220000 },
    { month: "August", earnings: 240000 },
    { month: "September", earnings: 300000 },
    { month: "October", earnings: 350000 },
  ];

  const totalBalance = transactions.reduce((sum, t) => sum + t.amount, 0) + 250000;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <img src={rentoLogo} alt="Rento" className="h-8" />
            <h1 className="font-heading text-xl font-semibold text-foreground">Rento</h1>
          </div>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="/broker/listings" className="text-muted-foreground hover:text-primary">
              Listings
            </a>
            <a href="#" className="text-primary font-medium">
              Wallet
            </a>
            <a href="/broker/leads" className="text-muted-foreground hover:text-primary">
              Leads
            </a>
            <a href="/broker/profile" className="text-muted-foreground hover:text-primary">
              Profile
            </a>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-10">
        {/* Wallet Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-2xl font-bold text-foreground">Wallet Overview</h2>
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" />
            <span className="font-semibold text-primary">
              UGX {totalBalance.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Earnings Growth Graph */}
        <Card className="p-6 mb-10 border-border">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
            Monthly Earnings Growth
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" tick={{ fill: "#6b7280" }} />
                <YAxis tick={{ fill: "#6b7280" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Line
                  type="monotone"
                  dataKey="earnings"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Transaction History */}
        <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
          Recent Transactions
        </h3>
        <div className="space-y-4">
          {transactions.map((t) => (
            <Card
              key={t.id}
              className="p-4 border-border flex justify-between items-center hover:border-primary/60 transition-all"
            >
              <div>
                <h4 className="font-semibold text-foreground">{t.description}</h4>
                <p className="text-sm text-muted-foreground">{t.date}</p>
              </div>
              <p className="font-semibold text-primary">+ UGX {t.amount.toLocaleString()}</p>
            </Card>
          ))}
        </div>
      </main>

      <BrokerBottomNav />
    </div>
  );
};

export default BrokerWallet;
