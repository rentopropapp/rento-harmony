import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone, ArrowLeft, CalendarDays } from "lucide-react";
import rentoLogo from "@/assets/rento-logo-dark.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, type ManagerTenantMessage } from "@/lib/supabase";

const TenantNotices = () => {
  const navigate = useNavigate();

  const [notices, setNotices] = useState<Array<{ id: string; title: string | null; message: string; date: string }>>([]);

  useEffect(() => {
    const load = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user?.id as string | undefined;
      const query = supabase
        .from('manager_tenant_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(25);
      const { data, error } = userId
        ? await query.or(`tenant_id.eq.${userId},tenant_id.is.null`)
        : await query.eq('tenant_id', '');
      if (!error && data) {
        const mapped = (data as ManagerTenantMessage[]).map((m) => ({
          id: m.id,
          title: m.title,
          message: m.content,
          date: new Date(m.created_at).toISOString().slice(0, 10),
        }));
        setNotices(mapped);
      }
    };
    load();
  }, []);
  
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
                  {notice.title || 'Notice'}
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

