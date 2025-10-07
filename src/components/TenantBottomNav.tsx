import { Home, CreditCard, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils"; // shadcn utility for conditional classes

const TenantBottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", icon: Home, path: "/tenant/dashboard" },
    { name: "Payments", icon: CreditCard, path: "/tenant/payments" },
    { name: "Profile", icon: User, path: "/tenant/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-card shadow-sm md:hidden z-50">
      <div className="flex justify-around items-center py-3">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 text-xs font-medium focus:outline-none"
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-colors",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              />
              <span
                className={cn(
                  "transition-colors",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default TenantBottomNav;
