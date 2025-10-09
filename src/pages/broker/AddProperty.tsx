import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Building2, GraduationCap, Home, Store, Palmtree, House, Castle, Briefcase, Hotel, Building, PartyPopper, Warehouse, School, Hospital, Church } from "lucide-react";
import { Button } from "@/components/ui/button";
import rentoLogo from "@/assets/rento-logo-light.svg";

const propertyTypes = [
  { id: "flat", name: "Flat/Apartment", icon: Building2 },
  { id: "student", name: "Student Housing", icon: GraduationCap },
  { id: "family", name: "Family Home", icon: Home },
  { id: "retail", name: "Retail Units", icon: Store },
  { id: "vacation", name: "Vacation Home", icon: Palmtree },
  { id: "bungalow", name: "Bungalows", icon: House },
  { id: "townhouse", name: "Town House", icon: Home },
  { id: "mansion", name: "Mansion", icon: Castle },
  { id: "office", name: "Office Space", icon: Briefcase },
  { id: "airbnb", name: "Airbnb", icon: Hotel },
  { id: "commercial", name: "Commercial Building", icon: Building },
  { id: "party", name: "Party Venue", icon: PartyPopper },
  { id: "warehouse", name: "Warehouses", icon: Warehouse },
  { id: "school", name: "Schools", icon: School },
  { id: "hospital", name: "Hospitals", icon: Hospital },
  { id: "religious", name: "Religious", icon: Church },
];

const AddProperty = () => {
  const navigate = useNavigate();

  const handlePropertyTypeSelect = (typeId: string) => {
    const selectedType = propertyTypes.find((type) => type.id === typeId);
    navigate("/broker/property-details", {
      state: { propertyType: selectedType?.name },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <img src={rentoLogo} alt="Rento" className="h-8 w-auto" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/broker/home")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-center font-heading text-3xl font-bold text-foreground">
          Which of these best describes your property?
        </h1>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {propertyTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Card
                key={type.id}
                className="hover-lift cursor-pointer border-border bg-card p-6 transition-all hover:border-primary"
                onClick={() => handlePropertyTypeSelect(type.id)}
              >
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="rounded-full bg-primary/10 p-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-sm font-semibold text-foreground">
                    {type.name}
                  </h3>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
