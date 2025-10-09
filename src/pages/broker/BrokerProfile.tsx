import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star, Camera, UserSwitch } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import rentoLogo from "@/assets/rento-logo-dark.svg";
import BrokerBottomNav from "@/components/BrokerBottomNav";
import { useNavigate } from "react-router-dom";

const BrokerProfile = () => {
  const [rating, setRating] = useState(4);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isSwitchOpen, setIsSwitchOpen] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
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
      <main className="container mx-auto px-4 py-10 max-w-2xl">
        <Card className="p-6 border-border">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-heading text-2xl font-bold text-foreground">My Profile</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSwitchOpen(true)}
              className="gap-2"
            >
              <UserSwitch className="h-4 w-4" />
              Switch Account
            </Button>
          </div>

          {/* Profile Photo Upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div className="h-32 w-32 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-semibold text-muted-foreground">DK</span>
                )}
              </div>
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
              >
                <Camera className="h-5 w-5" />
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName" className="text-sm font-semibold text-foreground">
                Full Name
              </Label>
              <Input id="fullName" placeholder="Enter your full name" defaultValue="David Kato" />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                defaultValue="david.kato@email.com"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm font-semibold text-foreground">
                Phone Number
              </Label>
              <Input
                id="phone"
                placeholder="Enter your phone number"
                defaultValue="+256700654321"
              />
            </div>

            <div>
              <Label htmlFor="bio" className="text-sm font-semibold text-foreground">
                Bio
              </Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself and your experience"
                defaultValue="Experienced real estate broker specializing in rentals and investments."
                className="min-h-[100px]"
              />
            </div>
          </div>

          {/* Rating Section */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold mb-2 text-foreground">Broker Rating</h3>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 cursor-pointer ${
                    i <= rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setRating(i)}
                />
              ))}
            </div>
          </div>

          <Button className="mt-8 w-full bg-gradient-primary hover:opacity-90 transition-opacity">
            Save Changes
          </Button>
        </Card>
      </main>

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
              onClick={() => navigate("/auth", { state: { role: "manager" } })}
            >
              Property Manager Account
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/auth", { state: { role: "tenant" } })}
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
