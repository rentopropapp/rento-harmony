import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Users, Mail, Phone, MapPin, Calendar, Building2, TrendingUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import rentoLogo from "@/assets/rento-logo-dark.svg";
import BrokerBottomNav from "@/components/BrokerBottomNav";
import { useNavigate } from "react-router-dom";

const BrokerProfile = () => {
  const navigate = useNavigate();
  const [isSwitchOpen, setIsSwitchOpen] = useState(false);

  const brokerData = {
    name: "David Kato",
    email: "david.kato@rento.com",
    phone: "+256 700 654 321",
    location: "Kampala, Uganda",
    joinDate: "March 2023",
    bio: "Experienced real estate broker with over 5 years in the real estate industry. Specializing in residential and commercial property sales with a focus on client satisfaction and property investment.",
    propertiesForSale: 18,
    totalSales: 42,
    rating: 4.6,
    reviews: 35,
  };

  const properties = [
    { id: 1, name: "Modern Villa Estate", price: "UGX 450M", location: "Kololo", image: "🏡" },
    { id: 2, name: "Luxury Penthouse", price: "UGX 380M", location: "Nakasero", image: "🏢" },
    { id: 3, name: "Garden Cottage", price: "UGX 220M", location: "Bugolobi", image: "🏘️" },
    { id: 4, name: "Family House", price: "UGX 320M", location: "Muyenga", image: "🏠" },
    { id: 5, name: "City Apartment", price: "UGX 180M", location: "Kampala", image: "🏢" },
    { id: 6, name: "Hillview Residence", price: "UGX 290M", location: "Ntinda", image: "🏡" },
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
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <img src={rentoLogo} alt="Rento" className="h-8" />
            <h1 className="font-heading text-xl font-semibold text-foreground">Rento</h1>
          </div>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="/broker/listings" className="text-muted-foreground hover:text-primary">
              Listings
            </a>
            <a href="/broker/wallet" className="text-muted-foreground hover:text-primary">
              Wallet
            </a>
            <a href="/broker/leads" className="text-muted-foreground hover:text-primary">
              Leads
            </a>
            <a href="#" className="text-primary font-medium">
              Profile
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img src={rentoLogo} alt="Rento" className="h-8 w-auto" />
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">Broker Profile</h2>
              <p className="text-muted-foreground">Your professional information and statistics</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => setIsSwitchOpen(true)}
            className="gap-2"
          >
            <Users className="w-4 h-4" />
            Switch Account
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="p-6 lg:col-span-2 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-4xl">
                    {brokerData.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-2">{brokerData.name}</h3>
                <p className="text-muted-foreground mb-4">Real Estate Broker</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{brokerData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{brokerData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{brokerData.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">Joined {brokerData.joinDate}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Bio</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {brokerData.bio}
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
                  <p className="text-2xl font-bold text-foreground">{brokerData.propertiesForSale}</p>
                  <p className="text-sm text-muted-foreground">Properties Being Sold</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{brokerData.totalSales}</p>
                  <p className="text-sm text-muted-foreground">Total Sales</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Performance Rating</p>
                <div className="flex items-center gap-2 mb-1">
                  {renderStars(brokerData.rating)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {brokerData.rating} out of 5 ({brokerData.reviews} reviews)
                </p>
              </div>
            </div>
          </Card>

          {/* Properties List */}
          <Card className="p-6 lg:col-span-3 animate-fade-in">
            <h3 className="text-lg font-semibold text-foreground mb-4">My Listings</h3>
            <div className="overflow-x-auto">
              <div className="flex gap-4 pb-2">
                {properties.map((property) => (
                  <div
                    key={property.id}
                    className="flex-shrink-0 w-64 rounded-lg border border-border bg-card hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="h-40 bg-muted flex items-center justify-center text-6xl rounded-t-lg">
                      {property.image}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-foreground mb-1">{property.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {property.location}
                      </p>
                      <p className="text-lg font-bold text-primary">{property.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Switch Account Modal */}
      <Dialog open={isSwitchOpen} onOpenChange={setIsSwitchOpen}>
        <DialogContent className="max-w-sm p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-heading text-foreground text-center mb-4">
              Switch Account
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 text-center">
            <p className="text-muted-foreground text-sm mb-4">
              Choose an account type to continue:
            </p>
            <Button
              className="w-full"
              onClick={() => navigate("/", { state: { role: "manager" } })}
            >
              Property Manager Account
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/", { state: { role: "tenant" } })}
            >
              Tenant Account
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <BrokerBottomNav />
    </div>
  );
};

export default BrokerProfile;
