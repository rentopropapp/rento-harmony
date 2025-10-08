import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Home, ArrowLeft } from "lucide-react";
import rentoLogo from "@/assets/rento-logo-dark.svg";
import { Calendar as ShadCalendar } from "@/components/ui/calendar";

const TenantPropertyListings = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const properties = [
    {
      id: 1,
      name: "Hillview Apartments",
      location: "Muyenga, Kampala",
      price: "800,000 / month",
      type: "Apartment",
      broker: "Urban Estates",
    },
    {
      id: 2,
      name: "Garden Cottage",
      location: "Entebbe Road, Kampala",
      price: "650,000 / month",
      type: "House",
      broker: "Prime Realty",
    },
    {
      id: 3,
      name: "Skyline Studio",
      location: "Ntinda, Kampala",
      price: "550,000 / month",
      type: "Studio",
      broker: "Elite Brokers",
    },
  ];

  const handleSchedule = (propertyName: string) => {
    alert(
      `Visit scheduled for ${propertyName} on ${selectedDate?.toDateString()}. You’ll receive a confirmation shortly.`
    );
  };

  return (
    <div className="min-h-screen bg-background relative pb-24">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <img src={rentoLogo} alt="Rento" className="h-8 w-auto" />
            <h1 className="font-heading text-xl font-semibold text-foreground">
              Property Listings
            </h1>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
        {/* Property Cards */}
        {properties.map((property) => (
          <Card
            key={property.id}
            className="p-6 border-border hover:border-primary/60 transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Home className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-heading text-lg font-semibold text-foreground">
                    {property.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">{property.type}</p>
                </div>
              </div>
              <p className="font-semibold text-primary">{property.price}</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {property.location}
            </div>

            <p className="text-sm text-muted-foreground">
              Broker/Manager:{" "}
              <span className="font-medium text-foreground">{property.broker}</span>
            </p>

            <Button
              onClick={() => handleSchedule(property.name)}
              className="mt-3 h-10 bg-primary text-primary-foreground hover:bg-primary/90 w-full"
            >
              Schedule Visit
            </Button>
          </Card>
        ))}

        {/* Schedule Section */}
        <Card className="p-6 mt-10 border-border text-center">
          <h2 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center justify-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Choose a Visit Date
          </h2>

          {/* Minimal Calendar */}
          <div className="flex justify-center">
            <ShadCalendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-lg border border-border bg-card shadow-sm"
            />
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Selected date:{" "}
            <span className="text-primary font-medium">
              {selectedDate?.toDateString()}
            </span>
          </p>
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

export default TenantPropertyListings;
