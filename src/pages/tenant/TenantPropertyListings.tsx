import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Home, ArrowLeft, Bed, Bath, Square, User, Building2, Phone, Mail } from "lucide-react";
import rentoLogo from "@/assets/rento-logo-dark.svg";
import { Calendar as ShadCalendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { PropertyCard } from "@/components/PropertyCard";

const TenantPropertyListings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sample property data - in real app this would come from location.state or API
  const property = location.state?.property || {
    id: 1,
    name: "Hillview Apartments",
    location: "Muyenga, Kampala",
    price: "800,000",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: "1,200 sq ft",
    description: "A modern and spacious apartment in the heart of Muyenga. Features include a well-equipped kitchen, spacious living room, master bedroom with en-suite bathroom, and a private balcony with stunning city views. The property is located in a secure gated community with 24/7 security, ample parking, and access to recreational facilities.",
    amenities: ["Swimming Pool", "Gym", "24/7 Security", "Parking", "Garden", "Backup Generator"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
    ],
    postedBy: {
      name: "Sarah Nakato",
      role: "Property Manager", // or "Broker"
      accountType: "manager", // or "broker"
      phone: "+256 700 123 456",
      email: "sarah.nakato@rento.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      company: "Urban Estates Ltd",
      rating: 4.8,
      properties: 12,
    }
  };

  const handleSchedule = () => {
    if (!selectedDate) {
      alert("Please select a date first");
      return;
    }
    alert(
      `Visit scheduled for ${property.name} on ${selectedDate?.toDateString()}. ${property.postedBy.name} will contact you shortly to confirm.`
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  // Similar properties based on the current property's type
  const similarProperties = [
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      title: "Sunrise Apartments",
      location: "Kololo, Kampala",
      price: "750,000",
      beds: 2,
      baths: 2,
      area: "1,000",
      type: property.type,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      title: "Garden View Suites",
      location: "Bugolobi, Kampala",
      price: "900,000",
      beds: 3,
      baths: 2,
      area: "1,400",
      type: property.type,
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      title: "Modern Living Spaces",
      location: "Ntinda, Kampala",
      price: "850,000",
      beds: 3,
      baths: 3,
      area: "1,300",
      type: property.type,
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      title: "Luxury Heights",
      location: "Nakasero, Kampala",
      price: "1,200,000",
      beds: 4,
      baths: 3,
      area: "1,800",
      type: property.type,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <img src={rentoLogo} alt="Rento" className="h-8 w-auto" />
            <h1 className="font-heading text-xl font-semibold text-foreground">
              Property Details
            </h1>
          </div>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-5xl space-y-6">
        {/* Image Gallery */}
        <Card className="overflow-hidden">
          <div className="relative aspect-video bg-muted">
            <img
              src={property.images[currentImageIndex]}
              alt={`${property.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Image Navigation */}
            {property.images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
                >
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </Button>
                
                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        index === currentImageIndex 
                          ? "bg-primary w-6" 
                          : "bg-white/50 hover:bg-white/75"
                      )}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Thumbnail Strip */}
          {property.images.length > 1 && (
            <div className="p-4 flex gap-2 overflow-x-auto">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={cn(
                    "flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all",
                    index === currentImageIndex 
                      ? "border-primary" 
                      : "border-transparent hover:border-muted-foreground/30"
                  )}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </Card>

        {/* Property Info & Posted By - Side by Side on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Property Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
                    {property.name}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="font-heading text-2xl font-bold text-primary">
                    UGX {property.price}
                  </p>
                  <p className="text-sm text-muted-foreground">per month</p>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Property Features */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Bed className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Bedrooms</p>
                    <p className="font-semibold text-foreground">{property.bedrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Bath className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Bathrooms</p>
                    <p className="font-semibold text-foreground">{property.bathrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Square className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Area</p>
                    <p className="font-semibold text-foreground">{property.area}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  Description
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                  Amenities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Posted By - Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="p-6">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                Posted By
              </h3>
              
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={property.postedBy.avatar} alt={property.postedBy.name} />
                  <AvatarFallback>
                    {property.postedBy.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{property.postedBy.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    {property.postedBy.accountType === "manager" ? (
                      <Building2 className="h-4 w-4 text-primary" />
                    ) : (
                      <User className="h-4 w-4 text-primary" />
                    )}
                    <Badge variant="outline" className="text-xs">
                      {property.postedBy.role}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {property.postedBy.company}
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-2 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-primary">{property.postedBy.rating}</p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-primary">{property.postedBy.properties}</p>
                  <p className="text-xs text-muted-foreground">Properties</p>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${property.postedBy.phone}`} className="text-foreground hover:text-primary">
                    {property.postedBy.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${property.postedBy.email}`} className="text-foreground hover:text-primary">
                    {property.postedBy.email}
                  </a>
                </div>
              </div>
            </Card>

            {/* Schedule Card */}
            <Card className="p-6">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Schedule a Visit
              </h3>

              <div className="flex justify-center mb-4">
                <ShadCalendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  className={cn("rounded-lg border pointer-events-auto")}
                />
              </div>

              {selectedDate && (
                <div className="mb-4 p-3 rounded-lg bg-muted/50 text-center">
                  <p className="text-sm text-muted-foreground">Selected date:</p>
                  <p className="font-semibold text-foreground">
                    {selectedDate.toDateString()}
                  </p>
                </div>
              )}

              <Button
                onClick={handleSchedule}
                disabled={!selectedDate}
                className="w-full"
              >
                Confirm Schedule
              </Button>
            </Card>
          </div>
        </div>

        {/* Similar Properties Section */}
        <div className="mt-12">
          <div className="mb-6">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
              Similar Properties You Might Like
            </h2>
            <p className="text-muted-foreground">
              Other {property.type.toLowerCase()}s in Kampala
            </p>
          </div>
          
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 min-w-max">
              {similarProperties.map((prop) => (
                <div key={prop.id} className="w-80 flex-shrink-0">
                  <PropertyCard
                    {...prop}
                    onClick={() => {
                      navigate('/tenant/property-listings', { state: { property: prop } });
                      window.scrollTo(0, 0);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TenantPropertyListings;
