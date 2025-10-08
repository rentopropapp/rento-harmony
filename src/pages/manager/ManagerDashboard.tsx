import { useState } from "react";
import { Users, AlertCircle, Calendar, Wallet, FileText, Edit, UserCog, UserCheck, ScrollText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { ManagerTopNav, ManagerBottomNav } from "@/components/ManagerNavigation";

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const property = location.state?.property;
  const [selectedProperty] = useState(property?.name || "Hillview Apartment");

  const dashboardStats = [
    { 
      title: "Tenants", 
      value: "8", 
      icon: Users, 
      color: "bg-primary",
      route: "/manager/tenants",
      state: { property }
    },
    { 
      title: "Complaints", 
      value: "3", 
      icon: AlertCircle, 
      color: "bg-warning",
      route: "#"
    },
    { 
      title: "Bookings", 
      value: "5", 
      icon: Calendar, 
      color: "bg-success",
      route: "/manager/bookings",
      state: { property }
    },
    { 
      title: "Payments", 
      value: "UGX 12.4M", 
      icon: Wallet, 
      color: "bg-primary",
      route: "#"
    },
  ];

  const actionButtons = [
    { label: "Property Expenses", icon: FileText, route: "#" },
    { label: "Edit Property", icon: Edit, route: "#" },
    { label: "Users & Roles", icon: UserCog, route: "#" },
    { label: "Tenant Management", icon: UserCheck, route: "/manager/tenants", state: { property } },
    { label: "Tenant Agreement", icon: ScrollText, route: "#" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <ManagerTopNav property={property} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Selected Property */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Property Dashboard</h2>
          <p className="text-muted-foreground">Selected Property: <span className="font-medium text-foreground">{selectedProperty}</span></p>
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
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
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
                className="h-auto py-4 flex items-center justify-start gap-3"
                onClick={() => button.route !== "#" && navigate(button.route, { state: button.state })}
              >
                <button.icon className="w-5 h-5" />
                <span>{button.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Monthly Summary */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">Monthly Summary</h3>
          <div className="space-y-3">
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
        </Card>
      </div>

      <ManagerBottomNav property={property} />
    </div>
  );
};

export default ManagerDashboard;
