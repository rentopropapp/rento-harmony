import { MapPin, Calendar, Clock, User, Phone, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";
import { ManagerTopNav, ManagerBottomNav } from "@/components/ManagerNavigation";

const ManagerBookings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const property = location.state?.property;

  const bookings = [
    {
      id: 1,
      property: "Hillview Apartment - Unit 4C",
      clientName: "David Musoke",
      clientPhone: "+256 700 111 222",
      clientEmail: "david.musoke@email.com",
      date: "2024-10-15",
      time: "10:00 AM",
      status: "confirmed",
      type: "viewing"
    },
    {
      id: 2,
      property: "Modern Villa - Entebbe",
      clientName: "Linda Nalwoga",
      clientPhone: "+256 700 222 333",
      clientEmail: "linda.nalwoga@email.com",
      date: "2024-10-16",
      time: "2:00 PM",
      status: "pending",
      type: "viewing"
    },
    {
      id: 3,
      property: "Garden Cottage - Unit 3",
      clientName: "Peter Ssemakula",
      clientPhone: "+256 700 333 444",
      clientEmail: "peter.ssemakula@email.com",
      date: "2024-10-17",
      time: "11:30 AM",
      status: "confirmed",
      type: "viewing"
    },
    {
      id: 4,
      property: "Luxury Penthouse - Bugolobi",
      clientName: "Alice Nambi",
      clientPhone: "+256 700 444 555",
      clientEmail: "alice.nambi@email.com",
      date: "2024-10-18",
      time: "3:00 PM",
      status: "pending",
      type: "viewing"
    },
    {
      id: 5,
      property: "Family House - Kololo",
      clientName: "Robert Okello",
      clientPhone: "+256 700 555 666",
      clientEmail: "robert.okello@email.com",
      date: "2024-10-19",
      time: "9:00 AM",
      status: "confirmed",
      type: "viewing"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-success/10 text-success border-success/20";
      case "pending":
        return "bg-warning/10 text-warning border-warning/20";
      case "cancelled":
        return "bg-danger/10 text-danger border-danger/20";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <ManagerTopNav property={property} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Property Viewings</h2>
            <p className="text-muted-foreground">Upcoming property viewing appointments</p>
          </div>
          <Button onClick={() => navigate("/manager/dashboard", { state: { property } })}>
            Back to Dashboard
          </Button>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking.id} className="p-6 hover:shadow-lg transition-shadow animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {booking.property}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>Property Viewing</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Client:</span>
                        <span className="font-medium text-foreground">{booking.clientName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">{booking.clientPhone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">{booking.clientEmail}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-medium text-foreground">{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Time:</span>
                        <span className="font-medium text-foreground">{booking.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Reschedule
                    </Button>
                    <Button size="sm" variant="outline">
                      Contact Client
                    </Button>
                    {booking.status === "pending" && (
                      <Button size="sm">
                        Confirm Booking
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <ManagerBottomNav property={property} />
    </div>
  );
};

export default ManagerBookings;
