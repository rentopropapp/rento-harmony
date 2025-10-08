import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone, ArrowLeft, CalendarDays } from "lucide-react";
import rentoLogo from "@/assets/rento-logo-dark.svg";
import { useNavigate } from "react-router-dom";

const TenantNotices = () => {
  const navigate = useNavigate();

  // Mock data for property manager notices
  const notices = [
    {
      id: 1,
      title: "Scheduled Maintenance",
      message:
        "Please note that there will be general plumbing maintenance in the Hillview Apartments on October 10th from 9:00 AM to 2:00 PM. Kindly plan accordingly.",
      date: "2024-10-07",
    },
    {
      id: 2,
      title: "Water Supply Interruption",
      message:
        "The city council has informed us of a temporary water supply cut scheduled for October 12th between 8:00 AM and 5:00 PM.",
      date: "2024-10-06",
    },
    {
      id: 3,
      title: "Rent Payment Reminder",
      message:
        "This is a friendly reminder that your next rent payment for Hillview Apartment is due on November 1st. Please ensure payment is made before the due date to avoid penalties.",
      date: "2024-10-05",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <img src={rentoLogo} alt="Rento" className="h-8 w-auto" />
            <h1 className="font-heading text-xl font-semibold text-foreground">
              Notices from Property Manager
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10 max-w-2xl space-y-6">
        {notices.map((notice) => (
          <Card
            key={notice.id}
            className="p-6 border-border hover:border-primary/60 transition-all"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Megaphone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-lg font-semibold text-foreground">
                  {notice.title}
                </h2>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <CalendarDays className="h-4 w-4" />
                  <span>{notice.date}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {notice.message}
            </p>
          </Card>
        ))}
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

export default TenantNotices;
