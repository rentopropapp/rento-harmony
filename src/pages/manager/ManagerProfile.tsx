import { Building2, Star, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import rentoLogo from "@/assets/rento-logo-dark.svg";

const ManagerProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const property = location.state?.property;

  const managerData = {
    name: "James Okello",
    email: "james.okello@rento.com",
    phone: "+256 700 987 654",
    location: "Kampala, Uganda",
    joinDate: "January 2023",
    bio: "Experienced property manager with over 5 years in the real estate industry. Specializing in residential and commercial property management with a focus on tenant satisfaction and property maintenance.",
    propertiesManaged: 12,
    totalTenants: 45,
    rating: 4.8,
    reviews: 28,
  };

  const properties = [
    "Hillview Apartment",
    "Garden Cottage",
    "Modern Villa Estate",
    "Luxury Penthouse Complex",
    "Family House Kololo",
    "Nakasero Heights",
    "Bugolobi Residence",
    "Muyenga Gardens",
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating)
            ? "fill-warning text-warning"
            : index < rating
            ? "fill-warning/50 text-warning"
            : "text-muted"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-semibold text-lg">R</span>
              </div>
              <h1 className="text-2xl font-bold text-primary">Rento</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Button
                variant="link"
                onClick={() => navigate("/manager/dashboard", { state: { property } })}
                className="text-muted-foreground hover:text-primary transition-colors p-0 h-auto"
              >
                Dashboard
              </Button>
              <Button
                variant="link"
                onClick={() => navigate("/manager/tenants", { state: { property } })}
                className="text-muted-foreground hover:text-primary transition-colors p-0 h-auto"
              >
                Tenants
              </Button>
              <Button
                variant="link"
                onClick={() => navigate("/manager/bookings", { state: { property } })}
                className="text-muted-foreground hover:text-primary transition-colors p-0 h-auto"
              >
                Bookings
              </Button>
              <Button
                variant="link"
                onClick={() => navigate("/manager/profile", { state: { property } })}
                className="text-foreground hover:text-primary transition-colors p-0 h-auto"
              >
                Profile
              </Button>
            </nav>
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center cursor-pointer">
              <span className="text-sm font-medium">PM</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Manager Profile</h2>
            <p className="text-muted-foreground">Your professional information and statistics</p>
          </div>
          <Button onClick={() => navigate("/manager/dashboard", { state: { property } })}>
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="p-6 lg:col-span-2 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-4xl">
                    {managerData.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-2">{managerData.name}</h3>
                <p className="text-muted-foreground mb-4">Property Manager</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{managerData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{managerData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{managerData.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">Joined {managerData.joinDate}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Bio</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {managerData.bio}
                  </p>
                </div>

                <div className="mt-6">
                  <Button>Edit Profile</Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Stats Card */}
          <Card className="p-6 animate-fade-in">
            <h3 className="text-lg font-semibold text-foreground mb-4">Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{managerData.propertiesManaged}</p>
                  <p className="text-sm text-muted-foreground">Properties Managed</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{managerData.totalTenants}</p>
                  <p className="text-sm text-muted-foreground">Total Tenants</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Performance Rating</p>
                <div className="flex items-center gap-2 mb-1">
                  {renderStars(managerData.rating)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {managerData.rating} out of 5 ({managerData.reviews} reviews)
                </p>
              </div>
            </div>
          </Card>

          {/* Properties List */}
          <Card className="p-6 lg:col-span-3 animate-fade-in">
            <h3 className="text-lg font-semibold text-foreground mb-4">Managed Properties</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {properties.map((property, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Building2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{property}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ManagerProfile;
