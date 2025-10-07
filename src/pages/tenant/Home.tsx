import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import rentoLogo from "@/assets/rento-logo-dark.svg"; // ✅ Use official logo

const TenantHome = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock property data
  const properties = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      title: "Hillview Apartment",
      location: "Kampala, Uganda",
      price: "800,000",
      bedrooms: 2,
      bathrooms: 2,
      type: "Rent",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      title: "Modern Villa",
      location: "Entebbe, Uganda",
      price: "1,500,000",
      bedrooms: 4,
      bathrooms: 3,
      type: "Sale",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      title: "Cozy Studio",
      location: "Nakasero, Kampala",
      price: "500,000",
      bedrooms: 1,
      bathrooms: 1,
      type: "Rent",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      title: "Family House",
      location: "Kololo, Kampala",
      price: "2,000,000",
      bedrooms: 5,
      bathrooms: 4,
      type: "Sale",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      title: "Luxury Penthouse",
      location: "Bugolobi, Kampala",
      price: "3,500,000",
      bedrooms: 3,
      bathrooms: 3,
      type: "Rent",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
      title: "Garden Cottage",
      location: "Muyenga, Kampala",
      price: "950,000",
      bedrooms: 2,
      bathrooms: 2,
      type: "Rent",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* ✅ Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <img src={rentoLogo} alt="Rento" className="h-8 w-auto" />
            <h1 className="font-heading text-xl font-semibold text-foreground">
              Rento
            </h1>
          </div>

          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <a
              href="#"
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Payments
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Profile
            </a>
          </nav>

          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 cursor-pointer">
            <span className="text-sm font-medium text-primary">JD</span>
          </div>
        </div>
      </header>

      {/* ✅ Hero Section */}
      <section className="bg-card/30 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Discover Your Perfect Home
            </h2>
            <p className="text-muted-foreground text-lg">
              Browse thousands of properties and find your dream rental
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search city or property"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-base"
                />
              </div>
              <Button className="h-14 px-8">Search</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Property Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-heading text-2xl font-semibold text-foreground">
              Featured Properties
            </h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                All
              </Button>
              <Button variant="ghost" size="sm">
                Rent
              </Button>
              <Button variant="ghost" size="sm">
                Sale
              </Button>
              <Button variant="ghost" size="sm">
                Airbnb
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TenantHome;
