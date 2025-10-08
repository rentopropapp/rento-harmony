import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MapPin, Home, ArrowLeft, Settings } from "lucide-react";
import rentoLogo from "@/assets/rento-logo-dark.svg";

// Example mock data — replace this with your real data source
interface Property {
  id: string;
  name: string;
  type: string;
  location: string;
  rent: string;
  imageUrl: string;
}

const ManagerProperties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    // TODO: Fetch from backend or local storage
    setProperties([
      {
        id: "1",
        name: "Hillview Apartment",
        type: "Flat/Apartment",
        location: "Kampala, Uganda",
        rent: "1,500,000 UGX/month",
        imageUrl: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
      },
      {
        id: "2",
        name: "Palm Villa",
        type: "Vacation Home",
        location: "Entebbe, Uganda",
        rent: "3,200,000 UGX/month",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <img src={rentoLogo} alt="Rento" className="h-8 w-auto" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/manager/home")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-2 font-heading text-2xl font-bold text-foreground">
          Your Posted Properties
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Manage all your listed properties here.
        </p>

        {properties.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">
            <Home className="mx-auto mb-4 h-10 w-10 opacity-50" />
            <p>No properties posted yet.</p>
            <Button
              onClick={() => navigate("/manager/add-property")}
              className="mt-4"
            >
              Add Your First Property
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <Card
                key={property.id}
                className="overflow-hidden border-border bg-card transition hover:border-primary"
              >
                <img
                  src={property.imageUrl}
                  alt={property.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {property.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    {property.type}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="mr-1 h-4 w-4 text-primary" />
                    {property.location}
                  </div>
                  <p className="text-sm font-medium text-foreground mb-4">
                    {property.rent}
                  </p>
                  <Button
                    onClick={() => navigate("/manager/dashboard", { state: { property } })}
                    className="w-full"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Manage Property
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <Button
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        onClick={() => navigate("/manager/add-property")}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default ManagerProperties;
