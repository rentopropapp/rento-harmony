import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { Search, MapPin, Menu } from "lucide-react";
import rentoLogo from "@/assets/rento-logo-dark.svg";

const TenantHome = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample property data
  const properties = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop",
      title: "Hillview Apartment",
      location: "Downtown, City Center",
      price: "$1,200/month",
      beds: 2,
      baths: 2,
      area: "1,200 sqft",
      type: "rent" as const,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop",
      title: "Modern Loft",
      location: "Arts District",
      price: "$1,800/month",
      beds: 3,
      baths: 2,
      area: "1,500 sqft",
      type: "rent" as const,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
      title: "Luxury Villa",
      location: "Suburbs, Green Valley",
      price: "$450,000",
      beds: 4,
      baths: 3,
      area: "2,500 sqft",
      type: "sale" as const,
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&auto=format&fit=crop",
      title: "Cozy Studio",
      location: "University Area",
      price: "$85/night",
      beds: 1,
      baths: 1,
      area: "500 sqft",
      type: "airbnb" as const,
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop",
      title: "Family House",
      location: "Residential Park",
      price: "$2,200/month",
      beds: 4,
      baths: 3,
      area: "2,200 sqft",
      type: "rent" as const,
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop",
      title: "Beachfront Condo",
      location: "Coastal Avenue",
      price: "$3,500/month",
      beds: 3,
      baths: 2,
      area: "1,800 sqft",
      type: "rent" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <img src={rentoLogo} alt="Rento" className="h-8 w-auto" />
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center fade-in">
            <h1 className="mb-4 font-heading text-4xl font-bold md:text-5xl">
              Find Your Perfect Home
            </h1>
            <p className="mb-8 text-lg opacity-90">
              Discover properties that match your lifestyle
            </p>

            {/* Search Bar */}
            <div className="mx-auto flex max-w-2xl gap-2 rounded-2xl bg-card p-2 shadow-card">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search city or property..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 border-0 pl-10 focus-visible:ring-0"
                />
              </div>
              <Button className="h-12 bg-primary px-8 hover:bg-primary/90">
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-heading text-2xl font-bold">
              Available Properties
            </h2>
            <p className="text-muted-foreground">{properties.length} properties found</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TenantHome;
