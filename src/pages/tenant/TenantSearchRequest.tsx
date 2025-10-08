import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Search } from "lucide-react";
import rentoLogo from "@/assets/rento-logo-dark.svg";

const formSchema = z.object({
  propertyType: z.string().min(1, "Please select a property type"),
  priceRange: z.string().min(1, "Enter your desired price range"),
  size: z.string().min(1, "Enter property size"),
  rooms: z.string().min(1, "Enter number of rooms"),
  location: z.string().min(1, "Enter preferred location"),
});

const TenantSearchRequest = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyType: "",
      priceRange: "",
      size: "",
      rooms: "",
      location: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Search Request:", data);
    navigate(-1); // Go back after submission
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <img src={rentoLogo} alt="Rento" className="h-8 w-auto" />
            <h1 className="font-heading text-xl font-semibold text-foreground">
              Property Search Request
            </h1>
          </div>
        </div>
      </header>

      {/* Main Form */}
      <main className="container mx-auto px-4 py-10 max-w-lg">
        <Card className="p-6 border-border">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Type of Property */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Type of Property
              </label>
              <Select
                onValueChange={(value) => form.setValue("propertyType", value)}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="office">Office Space</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.propertyType && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.propertyType.message}
                </p>
              )}
            </div>

            {/* Price Range */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Price Range (UGX)
              </label>
              <Input
                placeholder="e.g. 500,000 - 1,000,000"
                {...form.register("priceRange")}
                className="h-12"
              />
              {form.formState.errors.priceRange && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.priceRange.message}
                </p>
              )}
            </div>

            {/* Size */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Size (sq ft / sqm)
              </label>
              <Input
                placeholder="e.g. 1200 sq ft"
                {...form.register("size")}
                className="h-12"
              />
              {form.formState.errors.size && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.size.message}
                </p>
              )}
            </div>

            {/* Rooms */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Number of Rooms
              </label>
              <Input
                placeholder="e.g. 2, 3, 4"
                {...form.register("rooms")}
                className="h-12"
              />
              {form.formState.errors.rooms && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.rooms.message}
                </p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Preferred Location
              </label>
              <Input
                placeholder="e.g. Kampala, Muyenga, or Entebbe"
                {...form.register("location")}
                className="h-12"
              />
              {form.formState.errors.location && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.location.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Search className="h-5 w-5 mr-2" />
              Submit Search
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

export default TenantSearchRequest;
