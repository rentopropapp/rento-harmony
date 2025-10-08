import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { UserPlus, ArrowLeft } from "lucide-react";
import rentoLogo from "@/assets/rento-logo-dark.svg";

const tenantSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Enter a valid email"),
  occupation: z.string().min(2, "Occupation is required"),
  phone: z.string().min(9, "Enter a valid phone number"),
  unit: z.string().min(2, "Unit is required"),
  rent: z.string().min(3, "Rent amount is required"),
});

const AddTenant = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const property = location.state?.property;

  const form = useForm<z.infer<typeof tenantSchema>>({
    resolver: zodResolver(tenantSchema),
    defaultValues: {
      name: "",
      email: "",
      occupation: "",
      phone: "",
      unit: "",
      rent: "",
    },
  });

  const onSubmit = (data: z.infer<typeof tenantSchema>) => {
    console.log("✅ New Tenant Data:", data);
    alert(`Tenant ${data.name} added successfully!`);
    navigate("/manager/tenants", { state: { property } });
  };

  return (
    <div className="min-h-screen bg-background relative pb-20">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <img src={rentoLogo} alt="Rento" className="h-8 w-auto" />
            <h1 className="font-heading text-xl font-semibold text-foreground">
              Add New Tenant
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10 max-w-lg">
        <Card className="p-6 border-border shadow-sm">
          <h2 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2 mb-6">
            <UserPlus className="h-5 w-5 text-primary" />
            Tenant Information
          </h2>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">
                Full Name
              </label>
              <Input
                placeholder="Enter tenant's full name"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">
                Email
              </label>
              <Input
                type="email"
                placeholder="tenant@email.com"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Occupation */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">
                Occupation
              </label>
              <Input
                placeholder="e.g., Software Engineer"
                {...form.register("occupation")}
              />
              {form.formState.errors.occupation && (
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.occupation.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">
                Phone Number
              </label>
              <Input
                type="tel"
                placeholder="+256700000000"
                {...form.register("phone")}
              />
              {form.formState.errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.phone.message}
                </p>
              )}
            </div>

            {/* Unit */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">
                Property Unit
              </label>
              <Input
                placeholder="e.g., Hillview Apartment - Unit 2B"
                {...form.register("unit")}
              />
              {form.formState.errors.unit && (
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.unit.message}
                </p>
              )}
            </div>

            {/* Rent */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">
                Monthly Rent (UGX)
              </label>
              <Input
                type="number"
                placeholder="e.g., 800000"
                {...form.register("rent")}
              />
              {form.formState.errors.rent && (
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.rent.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Add Tenant
            </Button>
          </form>
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

export default AddTenant;
