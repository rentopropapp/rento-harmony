import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useLocation } from "react-router-dom";
import { Send, Users, User } from "lucide-react";
import { ManagerBottomNav } from "@/components/ManagerNavigation";
import rentoLogo from "@/assets/rento-logo-dark.svg";

const ManagerMessages = () => {
  const location = useLocation();
  const property = location.state?.property;

  const [selectedRecipient, setSelectedRecipient] = useState<string>("all");
  const [message, setMessage] = useState("");

  // Dummy tenant list (could be fetched from backend)
  const tenants = [
    { id: 1, name: "John Kamau", property: "Hillview Apartment - Unit 2A" },
    { id: 2, name: "Sarah Nakato", property: "Hillview Apartment - Unit 3B" },
    { id: 3, name: "Michael Ouma", property: "Garden Cottage - Unit 1" },
    { id: 4, name: "Grace Achieng", property: "Hillview Apartment - Unit 1A" },
  ];

  const handleSendMessage = () => {
    if (!message.trim()) {
      alert("Please enter a message before sending.");
      return;
    }

    const recipients =
      selectedRecipient === "all"
        ? tenants.map((t) => t.name)
        : tenants.filter((t) => t.id.toString() === selectedRecipient).map((t) => t.name);

    console.log("📩 Message sent to:", recipients);
    console.log("Message content:", message);

    alert(`Message sent to ${recipients.join(", ")}`);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <img src={rentoLogo} alt="Rento" className="h-8 w-auto" />
            <h1 className="font-heading text-xl font-semibold text-foreground">Rento</h1>
          </div>
          <div className="hidden md:flex items-center gap-2 text-muted-foreground">
            <p className="text-sm">
              Property:{" "}
              <span className="font-medium text-foreground">
                {property?.name || "Selected Property"}
              </span>
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="font-heading text-2xl font-bold text-foreground">Tenant Messages</h2>
          <p className="text-sm text-muted-foreground">
            Send announcements or updates to all tenants or specific individuals.
          </p>
        </div>

        <Card className="p-6 shadow-sm border-border">
          {/* Recipient Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              Select Recipient
            </label>
            <Select onValueChange={setSelectedRecipient} defaultValue="all">
              <SelectTrigger className="w-full md:w-1/2">
                <SelectValue placeholder="Select recipient" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span>All Tenants</span>
                  </div>
                </SelectItem>
                {tenants.map((tenant) => (
                  <SelectItem key={tenant.id} value={tenant.id.toString()}>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span>{tenant.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Message Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              Message Content
            </label>
            <Textarea
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[150px] resize-none"
            />
          </div>

          {/* Send Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSendMessage}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </div>
        </Card>

        {/* Message Log */}
        <div className="mt-8">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
            Recent Messages
          </h3>
          <div className="space-y-3">
            <Card className="p-4 border-border">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Notice:</span> Power outage
                scheduled for maintenance tomorrow from 10AM - 2PM.
              </p>
              <p className="text-xs text-muted-foreground mt-1">Sent to: All Tenants</p>
            </Card>

            <Card className="p-4 border-border">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Reminder:</span> Rent for October
                is due by the 5th.
              </p>
              <p className="text-xs text-muted-foreground mt-1">Sent to: John Kamau</p>
            </Card>
          </div>
        </div>
      </main>

      <ManagerBottomNav property={property} />
    </div>
  );
};

export default ManagerMessages;
