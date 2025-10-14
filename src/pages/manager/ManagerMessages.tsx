import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useLocation } from "react-router-dom";
import { Send, Users, User, ArrowLeft } from "lucide-react";
import { ManagerBottomNav } from "@/components/ManagerNavigation";
import rentoLogo from "@/assets/rento-logo-dark.svg";
import { Input } from "@/components/ui/input";
import { supabase, type ManagerTenantMessage } from "@/lib/supabase";

const ManagerMessages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const property = location.state?.property;

  const [selectedRecipient, setSelectedRecipient] = useState<string>("all");
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [tenants, setTenants] = useState<Array<{ id: string; name: string }>>([]);
  const [recent, setRecent] = useState<ManagerTenantMessage[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data: tenantProfiles } = await supabase
        .from('profiles')
        .select('id, full_name, role')
        .eq('role', 'tenant');
      setTenants((tenantProfiles || []).map((t: any) => ({ id: t.id as string, name: (t.full_name as string) || 'Tenant' })));

      const { data: msgs } = await supabase
        .from('manager_tenant_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      setRecent((msgs as ManagerTenantMessage[]) || []);
    };
    load();
  }, []);

  const handleSendMessage = async () => {
    if (!message.trim()) {
      alert("Please enter a message before sending.");
      return;
    }
    const { data: sessionData } = await supabase.auth.getSession();
    const senderId = sessionData?.session?.user?.id as string | undefined;
    if (!senderId) {
      alert('You must be logged in to send messages.');
      return;
    }
    const tenantId = selectedRecipient === 'all' ? null : selectedRecipient;
    const { error } = await supabase.from('manager_tenant_messages').insert({
      sender_id: senderId,
      tenant_id: tenantId,
      title: title || (tenantId ? 'Direct Message' : 'Announcement'),
      content: message.trim(),
    });
    if (error) {
      console.error(error);
      alert('Failed to send message');
      return;
    }
    alert('Message sent');
    setMessage('');
    setTitle('');
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/manager/dashboard", { state: { property } })}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
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
                  <SelectItem key={tenant.id} value={tenant.id}>
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
            <label className="block text-sm font-medium text-foreground mb-2">Title (optional)</label>
            <Input placeholder="e.g. Scheduled Maintenance" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
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
            {recent.map((m) => (
              <Card key={m.id} className="p-4 border-border">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{m.title || 'Notice'}:</span> {m.content}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Sent to: {m.tenant_id ? 'Tenant' : 'All Tenants'} • {new Date(m.created_at).toLocaleString()}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <ManagerBottomNav property={property} />
    </div>
  );
};

export default ManagerMessages;

