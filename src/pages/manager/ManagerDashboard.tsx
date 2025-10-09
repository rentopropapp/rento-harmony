import { useState } from "react";
import {
  Users,
  AlertCircle,
  Calendar,
  Wallet,
  FileText,
  Edit,
  UserCog,
  UserCheck,
  ScrollText,
  MessageSquare,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { ManagerBottomNav } from "@/components/ManagerNavigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import rentoLogo from "@/assets/rento-logo-dark.svg"; // ✅ Added logo import

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const property = location.state?.property;
  const [selectedProperty] = useState(property?.name || "Hillview Apartment");

  // === Dashboard Stats ===
  const dashboardStats = [
    {
      title: "Tenants",
      value: "8",
      icon: Users,
      color: "bg-primary",
      route: "/manager/tenants",
      state: { property },
    },
    {
      title: "Complaints",
      value: "3",
      icon: AlertCircle,
      color: "bg-warning",
      route: "/manager/complaints",
      state: { property },
    },
    {
      title: "Bookings",
      value: "5",
      icon: Calendar,
      color: "bg-success",
      route: "/manager/bookings",
      state: { property },
    },
    {
      title: "Payments",
      value: "UGX 12.4M",
      icon: Wallet,
      color: "bg-primary",
      route: "#",
    },
  ];

  // === Action Buttons (with Messages button) ===
  const actionButtons = [
    { label: "Property Expenses", icon: FileText, route: "/manager/expenses", state: { property } },
    { label: "Edit Property", icon: Edit, route: "/manager/edit-property", state: { property } },
    { label: "Users & Roles", icon: UserCog, route: "/manager/users-roles", state: { property } },
    { label: "Tenant Management", icon: UserCheck, route: "/manager/tenants", state: { property } },
    { label: "Messages", icon: MessageSquare, route: "/manager/messages", state: { property } },
    { label: "Tenant Agreement", icon: ScrollText, route: "/tenant/agreement" },
  ];

  // === Monthly Data for Chart ===
  const expenseData = [
    { month: "Jan", expenses: 1500000 },
    { month: "Feb", expenses: 1200000 },
    { month: "Mar", expenses: 1800000 },
    { month: "Apr", expenses: 900000 },
    { month: "May", expenses: 2100000 },
    { month: "Jun", expenses: 1600000 },
    { month: "Jul", expenses: 2500000 },
    { month: "Aug", expenses: 1400000 },
    { month: "Sep", expenses: 2000000 },
    { month: "Oct", expenses: 2600000 },
    { month: "Nov", expenses: 2300000 },
    { month: "Dec", expenses: 1900000 },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* === Top Navigation with Logo === */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          {/* Left: Logo + App Name */}
          <div className="flex items-center gap-2">
            <img src={rentoLogo} alt="Rento Logo" className="h-8 w-auto" />
            <h1 className="font-heading text-xl font-semibold text-foreground">Rento</h1>
          </div>

          {/* Right: Property Name */}
          <div className="hidden md:flex items-center gap-2 text-muted-foreground">
            <p className="text-sm">
              Managing: <span className="font-medium text-foreground">{selectedProperty}</span>
            </p>
          </div>
        </div>
      </header>

      {/* === Main Content === */}
      <div className="container mx-auto px-4 py-8">
        {/* Selected Property */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Property Dashboard</h2>
          <p className="text-muted-foreground">
            Selected Property:{" "}
            <span className="font-medium text-foreground">{selectedProperty}</span>
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat) => (
            <Card
              key={stat.title}
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow animate-fade-in"
              onClick={() => stat.route !== "#" && navigate(stat.route, { state: stat.state })}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
              <p className="text-muted-foreground text-sm">{stat.title}</p>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">Property Management</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {actionButtons.map((button) => (
              <Button
                key={button.label}
                variant="outline"
                className="h-auto py-4 flex items-center justify-start gap-3 hover:border-primary/60"
                onClick={() =>
                  button.route !== "#" && navigate(button.route, { state: button.state })
                }
              >
                <button.icon className="w-5 h-5 text-primary" />
                <span className="text-foreground">{button.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Monthly Summary */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">Monthly Summary</h3>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Revenue</span>
              <span className="font-semibold text-foreground">UGX 15,000,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Property Expenses</span>
              <span className="font-semibold text-danger">- UGX 2,600,000</span>
            </div>
            <div className="border-t border-border pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-foreground">Net Earnings</span>
                <span className="font-bold text-success text-xl">UGX 12,400,000</span>
              </div>
            </div>
          </div>

          {/* Monthly Expense Chart */}
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={expenseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [
                    `UGX ${value.toLocaleString()}`,
                    "Expenses",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#08967e"
                  strokeWidth={3}
                  dot={{ fill: "#08967e", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <ManagerBottomNav property={property} />
    </div>
  );
};

export default ManagerDashboard;
