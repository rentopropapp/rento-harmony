import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Users, Calendar, User } from "lucide-react";

interface ManagerNavigationProps {
  property?: {
    id: string;
    name: string;
    type: string;
    location: string;
    rent: string;
    imageUrl: string;
  };
}

export const ManagerTopNav = ({ property }: ManagerNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-card border-b border-border sticky top-0 z-10 hidden md:block">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-semibold text-lg">R</span>
            </div>
            <h1 className="text-2xl font-bold text-primary">Rento</h1>
          </div>
          <nav className="flex space-x-6">
            <Button
              variant="link"
              onClick={() => navigate("/manager/dashboard", { state: { property } })}
              className={`${
                isActive("/manager/dashboard")
                  ? "text-foreground"
                  : "text-muted-foreground"
              } hover:text-primary transition-colors p-0 h-auto`}
            >
              Dashboard
            </Button>
            <Button
              variant="link"
              onClick={() => navigate("/manager/tenants", { state: { property } })}
              className={`${
                isActive("/manager/tenants")
                  ? "text-foreground"
                  : "text-muted-foreground"
              } hover:text-primary transition-colors p-0 h-auto`}
            >
              Tenants
            </Button>
            <Button
              variant="link"
              onClick={() => navigate("/manager/bookings", { state: { property } })}
              className={`${
                isActive("/manager/bookings")
                  ? "text-foreground"
                  : "text-muted-foreground"
              } hover:text-primary transition-colors p-0 h-auto`}
            >
              Bookings
            </Button>
            <Button
              variant="link"
              onClick={() => navigate("/manager/profile", { state: { property } })}
              className={`${
                isActive("/manager/profile")
                  ? "text-foreground"
                  : "text-muted-foreground"
              } hover:text-primary transition-colors p-0 h-auto`}
            >
              Profile
            </Button>
          </nav>
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center cursor-pointer">
            <span className="text-sm font-medium">PM</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export const ManagerBottomNav = ({ property }: ManagerNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="grid grid-cols-4 h-16">
        <button
          onClick={() => navigate("/manager/dashboard", { state: { property } })}
          className={`flex flex-col items-center justify-center gap-1 ${
            isActive("/manager/dashboard")
              ? "text-primary"
              : "text-muted-foreground"
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs">Dashboard</span>
        </button>
        <button
          onClick={() => navigate("/manager/tenants", { state: { property } })}
          className={`flex flex-col items-center justify-center gap-1 ${
            isActive("/manager/tenants")
              ? "text-primary"
              : "text-muted-foreground"
          }`}
        >
          <Users className="h-5 w-5" />
          <span className="text-xs">Tenants</span>
        </button>
        <button
          onClick={() => navigate("/manager/bookings", { state: { property } })}
          className={`flex flex-col items-center justify-center gap-1 ${
            isActive("/manager/bookings")
              ? "text-primary"
              : "text-muted-foreground"
          }`}
        >
          <Calendar className="h-5 w-5" />
          <span className="text-xs">Bookings</span>
        </button>
        <button
          onClick={() => navigate("/manager/profile", { state: { property } })}
          className={`flex flex-col items-center justify-center gap-1 ${
            isActive("/manager/profile")
              ? "text-primary"
              : "text-muted-foreground"
          }`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </nav>
  );
};
