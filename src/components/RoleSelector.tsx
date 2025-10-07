import { Card, CardContent } from "@/components/ui/card";
import { Building2, Home, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoleSelectorProps {
  selectedRole: "tenant" | "broker" | "manager" | null;
  onSelectRole: (role: "tenant" | "broker" | "manager") => void;
}

export const RoleSelector = ({ selectedRole, onSelectRole }: RoleSelectorProps) => {
  const roles = [
    {
      id: "tenant" as const,
      title: "Tenant",
      description: "Find your perfect home",
      icon: Home,
    },
    {
      id: "broker" as const,
      title: "Broker",
      description: "List and manage properties",
      icon: Building2,
    },
    {
      id: "manager" as const,
      title: "Property Manager",
      description: "Manage properties & tenants",
      icon: Users,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {roles.map((role) => {
        const Icon = role.icon;
        const isSelected = selectedRole === role.id;

        return (
          <Card
            key={role.id}
            className={cn(
              "cursor-pointer transition-all duration-300 hover:shadow-card-hover",
              isSelected && "border-primary ring-2 ring-primary ring-offset-2"
            )}
            onClick={() => onSelectRole(role.id)}
          >
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div
                className={cn(
                  "mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-colors",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground"
                )}
              >
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="mb-2 font-heading text-lg font-semibold">
                {role.title}
              </h3>
              <p className="text-sm text-muted-foreground">{role.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
