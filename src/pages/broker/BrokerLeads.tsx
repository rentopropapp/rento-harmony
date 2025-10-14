import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Home, DollarSign, Users } from "lucide-react";
import rentoLogo from "@/assets/rento-logo-dark.svg";
import BrokerBottomNav from "@/components/BrokerBottomNav";
import { supabase, type Lead, type LeadMessage } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const BrokerLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<LeadMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const openMessages = async (leadId: string) => {
    setSelectedLeadId(leadId);
    setMessages([]);
    const { data, error } = await supabase
      .from('lead_messages')
      .select('*')
      .eq('lead_id', leadId)
      .order('created_at', { ascending: true });
    if (!error && data) setMessages(data as LeadMessage[]);
  };

  const sendMessage = async () => {
    if (!selectedLeadId || !newMessage.trim()) return;
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData?.session?.user;
    const { data, error } = await supabase
      .from('lead_messages')
      .insert({
        lead_id: selectedLeadId,
        sender_id: user?.id ?? null,
        sender_email: user?.email ?? null,
        content: newMessage.trim(),
      })
      .select('*')
      .single();
    if (!error && data) {
      setMessages((prev) => [...prev, data as LeadMessage]);
      setNewMessage("");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "contacted":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "converted":
        return "bg-green-100 text-green-700 border-green-200";
      case "closed":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <img src={rentoLogo} alt="Rento" className="h-8" />
            <h1 className="font-heading text-xl font-semibold text-foreground">Rento</h1>
          </div>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="/broker/listings" className="text-muted-foreground hover:text-primary">Listings</a>
            <a href="/broker/wallet" className="text-muted-foreground hover:text-primary">Wallet</a>
            <a href="#" className="text-primary font-medium">Leads</a>
            <a href="/broker/profile" className="text-muted-foreground hover:text-primary">Profile</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <h2 className="font-heading text-2xl font-bold mb-6 text-foreground">Leads</h2>

        {loading ? (
          <div className="text-center py-10 text-muted-foreground">Loading leads...</div>
        ) : leads.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            <p>No leads yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {leads.map((lead) => (
              <Card key={lead.id} className="p-6 border-border">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-foreground text-lg">{lead.tenant_name}</h4>
                    <p className="text-sm text-muted-foreground">Submitted: {new Date(lead.created_at).toLocaleDateString()}</p>
                  </div>
                  <Badge variant="outline" className={`${getStatusColor(lead.status)} border capitalize`}>
                    {lead.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${lead.tenant_email}`} className="text-primary hover:underline">
                        {lead.tenant_email}
                      </a>
                    </div>
                    {lead.tenant_phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a href={`tel:${lead.tenant_phone}`} className="text-primary hover:underline">
                          {lead.tenant_phone}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{lead.location}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Home className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground capitalize">{lead.property_type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">UGX {lead.price_range}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{lead.rooms} rooms, {lead.size}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() =>
                      (window.location.href = `mailto:${lead.tenant_email}?subject=Property Request - ${lead.property_type} in ${lead.location}`)
                    }
                    className="text-primary text-sm flex items-center gap-2 hover:underline"
                  >
                    <Mail className="h-4 w-4" /> Send Email
                  </button>
                  {lead.tenant_phone && (
                    <button
                      onClick={() => (window.location.href = `tel:${lead.tenant_phone}`)}
                      className="text-primary text-sm flex items-center gap-2 hover:underline"
                    >
                      <Phone className="h-4 w-4" /> Call
                    </button>
                  )}
                  <button
                    onClick={() => openMessages(lead.id)}
                    className="text-primary text-sm flex items-center gap-2 hover:underline"
                  >
                    View Messages
                  </button>
                </div>

                {selectedLeadId === lead.id && (
                  <div className="mt-6 border-t pt-4">
                    <h5 className="font-semibold mb-3">Messages</h5>
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                      {messages.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No messages yet.</p>
                      ) : (
                        messages.map((m) => (
                          <div key={m.id} className="text-sm">
                            <div className="text-muted-foreground">
                              {new Date(m.created_at).toLocaleString()} {m.sender_email ? `• ${m.sender_email}` : ''}
                            </div>
                            <div className="text-foreground">{m.content}</div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Input
                        placeholder="Type a message"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <Button size="sm" onClick={sendMessage}>Send</Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>

      <BrokerBottomNav />
    </div>
  );
};

export default BrokerLeads;
