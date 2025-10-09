import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  ManagerTopNav,
  ManagerBottomNav,
} from "@/components/ManagerNavigation";
import { MessageCircle, CheckCircle2, Trash2, AlertTriangle } from "lucide-react";
import rentoLogo from "@/assets/rento-logo-dark.svg";

interface Complaint {
  id: number;
  tenantName: string;
  topic: string;
  urgency: "low" | "medium" | "high";
  details: string;
  date: string;
  status: "open" | "resolved";
}

const ManagerComplaints = () => {
  const location = useLocation();
  const property = location.state?.property;

  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: 1,
      tenantName: "John Kamau",
      topic: "Leaking Pipe",
      urgency: "high",
      details: "The kitchen sink pipe has been leaking for 3 days now.",
      date: "2024-10-01",
      status: "open",
    },
    {
      id: 2,
      tenantName: "Sarah Nakato",
      topic: "Broken Window",
      urgency: "medium",
      details: "Window in the living room was cracked during cleaning.",
      date: "2024-09-29",
      status: "resolved",
    },
    {
      id: 3,
      tenantName: "Michael Ouma",
      topic: "Power Outage",
      urgency: "high",
      details: "There’s been a power outage since yesterday in Unit 1.",
      date: "2024-10-03",
      status: "open",
    },
  ]);

  
  // Merge incoming complaint from navigation state (e.g., Tenant submission)
  useEffect(() => {
    const incoming = location.state?.newComplaint as
      | (Omit<Complaint, "id"> & Partial<Pick<Complaint, "id">>)
      | undefined;
    if (incoming) {
      setComplaints((prev) => {
        const nextId = (prev[prev.length - 1]?.id || 0) + 1;
        return [...prev, { id: nextId, ...incoming } as Complaint];
      });
      // clear the state to avoid duplicate inserts on back/forward navigation
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
  
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyMessage, setReplyMessage] = useState("");

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-green-100 text-green-700 border-green-200";
    }
  };

  const getStatusBadge = (status: string) => {
    return status === "resolved"
      ? "bg-green-100 text-green-700 border-green-200"
      : "bg-blue-100 text-blue-700 border-blue-200";
  };

  const handleReply = (id: number) => {
    if (!replyMessage.trim()) return;
    alert(`Reply sent to tenant: "${replyMessage}"`);
    setReplyMessage("");
    setReplyingTo(null);
  };

  const handleResolve = (id: number) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: "resolved" } : c
      )
    );
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this complaint?")) {
      setComplaints((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <ManagerTopNav property={property} />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">
              Tenant Complaints
            </h1>
            <p className="text-sm text-muted-foreground">
              View and respond to issues reported by tenants of{" "}
              <span className="font-medium text-foreground">
                {property?.name || "Selected Property"}
              </span>
              .
            </p>
          </div>
          <img src={rentoLogo} alt="Rento" className="h-8" />
        </div>

        {/* Complaints List */}
        <div className="grid gap-6">
          {complaints.length > 0 ? (
            complaints.map((c) => (
              <Card
                key={c.id}
                className="p-6 hover:border-primary/60 transition-all relative"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="font-semibold text-foreground text-lg">
                      {c.topic}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Reported by: {c.tenantName}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      variant="outline"
                      className={`${getUrgencyColor(c.urgency)} border px-3 py-1 rounded-full text-xs`}
                    >
                      {c.urgency.charAt(0).toUpperCase() + c.urgency.slice(1)} Priority
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`${getStatusBadge(c.status)} border px-3 py-1 rounded-full text-xs`}
                    >
                      {c.status === "resolved" ? "Resolved" : "Open"}
                    </Badge>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-3">
                  {c.details}
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Submitted on: <span className="font-medium">{c.date}</span>
                </p>

                {/* Reply Section */}
                {replyingTo === c.id ? (
                  <div className="space-y-3 mt-4">
                    <Textarea
                      placeholder="Type your reply..."
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <div className="flex justify-end gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setReplyingTo(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={() => handleReply(c.id)}
                      >
                        Send Reply
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end gap-3">
                    {c.status === "open" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setReplyingTo(c.id)}
                        className="flex items-center gap-2"
                      >
                        <MessageCircle className="h-4 w-4 text-primary" />
                        Reply
                      </Button>
                    )}
                    {c.status === "open" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleResolve(c.id)}
                        className="flex items-center gap-2 text-success hover:border-success/50"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Mark Resolved
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(c.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </Card>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-10">
              No complaints available for this property.
            </p>
          )}
        </div>
      </main>

      <ManagerBottomNav property={property} />
    </div>
  );
};

export default ManagerComplaints;

