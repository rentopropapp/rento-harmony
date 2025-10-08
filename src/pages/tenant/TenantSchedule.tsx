import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, ArrowLeft, RefreshCcw, XCircle } from "lucide-react";
import rentoLogo from "@/assets/rento-logo-dark.svg";

const TenantSchedule = () => {
  const navigate = useNavigate();

  // Mock scheduled visits data
  const [visits, setVisits] = useState([
    {
      id: 1,
      property: "Hillview Apartments",
      date: "2024-10-15",
      location: "Muyenga, Kampala",
    },
    {
      id: 2,
      property: "Garden Cottage",
      date: "2024-10-18",
      location: "Entebbe Road, Kampala",
    },
  ]);

  const handleCancel = (id: number) => {
    setVisits(visits.filter((v) => v.id !== id));
    alert("Your visit has been canceled.");
  };

  const handleReschedule = (property: string) => {
    alert(`Reschedule visit for ${property}. Redirecting to calendar...`);
    navigate("/tenant/properties"); // you can replace this with a reschedule page later
  };

  return (
    <div className="min-h-screen bg-background relative pb-20">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <img src={rentoLogo} alt="Rento" className="h-8 w-auto" />
            <h1 className="font-heading text-xl font-semibold text-foreground">
              My Schedule
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10 max-w-2xl space-y-6">
        {visits.length === 0 ? (
          <Card className="p-6 text-center border-border">
            <Calendar className="h-10 w-10 text-primary mx-auto mb-3" />
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              No Scheduled Visits
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              You haven’t scheduled any property visits yet.
            </p>
            <Button
              onClick={() => navigate("/tenant/properties")}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Schedule a Visit
            </Button>
          </Card>
        ) : (
          visits.map((visit) => (
            <Card
              key={visit.id}
              className="p-6 border-border hover:border-primary/60 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="font-heading text-lg font-semibold text-foreground">
                    {visit.property}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4" />
                    {visit.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Clock className="h-4 w-4" />
                    {new Date(visit.date).toDateString()}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <Button
                  variant="outline"
                  onClick={() => handleReschedule(visit.property)}
                  className="flex-1 border-border hover:border-primary/50"
                >
                  <RefreshCcw className="h-4 w-4 mr-2 text-primary" />
                  Reschedule
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleCancel(visit.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </Card>
          ))
        )}
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

export default TenantSchedule;
