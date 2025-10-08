import { useState } from "react";
import { Mail, MessageCircle, Calendar, Trash2, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useNavigate, useLocation } from "react-router-dom";
import { ManagerTopNav, ManagerBottomNav } from "@/components/ManagerNavigation";

const ManagerTenants = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const property = location.state?.property;

  const [tenants, setTenants] = useState([
    {
      id: 1,
      name: "John Kamau",
      property: "Hillview Apartment - Unit 2A",
      email: "john.kamau@email.com",
      phone: "+256700123456",
      bio: "Software engineer, 2 years with Rento",
      lastPaid: "2024-10-01",
      nextDue: "2024-11-01",
      status: "paid",
      rent: "800,000",
    },
    {
      id: 2,
      name: "Sarah Nakato",
      property: "Hillview Apartment - Unit 3B",
      email: "sarah.nakato@email.com",
      phone: "+256700234567",
      bio: "Marketing manager, 1 year with Rento",
      lastPaid: "2024-09-28",
      nextDue: "2024-10-28",
      status: "due-soon",
      rent: "800,000",
    },
    {
      id: 3,
      name: "Michael Ouma",
      property: "Garden Cottage - Unit 1",
      email: "michael.ouma@email.com",
      phone: "+256700345678",
      bio: "Teacher, 3 years with Rento",
      lastPaid: "2024-09-15",
      nextDue: "2024-10-15",
      status: "overdue",
      rent: "950,000",
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState<number | null>(null);

  // ===== Utility Functions =====
  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700 border-green-200";
      case "due-soon":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "overdue":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Paid";
      case "due-soon":
        return "Due Soon";
      case "overdue":
        return "Overdue";
      default:
        return status;
    }
  };

  const handleSendReminder = (
    tenant: (typeof tenants)[0],
    method: "email" | "whatsapp"
  ) => {
    const message = `Reminder: Rent payment of UGX ${tenant.rent} is due on ${tenant.nextDue}`;
    if (method === "whatsapp") {
      window.open(
        `https://wa.me/${tenant.phone}?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    } else {
      window.location.href = `mailto:${tenant.email}?subject=Rent Payment Reminder&body=${encodeURIComponent(
        message
      )}`;
    }
  };

  // ===== Delete Tenant with Modal =====
  const confirmDeleteTenant = (id: number) => {
    setTenantToDelete(id);
    setOpenDialog(true);
  };

  const handleDeleteTenant = () => {
    if (tenantToDelete !== null) {
      setTenants((prev) => prev.filter((t) => t.id !== tenantToDelete));
      setTenantToDelete(null);
    }
    setOpenDialog(false);
  };

  // ===== Add Tenant Navigation =====
  const handleAddTenant = () => {
    navigate("/manager/add-tenant", { state: { property } });
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <ManagerTopNav property={property} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-bold text-foreground">
            Tenant Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage, communicate, or remove tenants whose agreements have expired.
          </p>
        </div>

        {/* Tenants List */}
        <div className="grid gap-6">
          {tenants.length > 0 ? (
            tenants.map((tenant) => (
              <Card
                key={tenant.id}
                className="p-6 transition-all hover:border-primary/60 hover:shadow-sm relative"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  {/* Tenant Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <span className="font-semibold text-primary">
                          {tenant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h2 className="font-heading text-lg font-semibold text-foreground">
                          {tenant.name}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {tenant.property}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {tenant.bio}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Last Paid:</span>
                        <span className="font-medium text-foreground">
                          {tenant.lastPaid}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Next Due:</span>
                        <span className="font-medium text-foreground">
                          {tenant.nextDue}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(
                        tenant.status
                      )} border px-3 py-1 rounded-full`}
                    >
                      {getStatusText(tenant.status)}
                    </Badge>

                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        Monthly Rent
                      </p>
                      <p className="text-lg font-bold text-foreground">
                        UGX {tenant.rent}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex w-full md:w-auto gap-3 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 md:flex-none px-5"
                        onClick={() => handleSendReminder(tenant, "email")}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Email
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 md:flex-none px-5"
                        onClick={() => handleSendReminder(tenant, "whatsapp")}
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        WhatsApp
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Delete Button at Bottom Right */}
                <div className="flex justify-end mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => confirmDeleteTenant(tenant.id)}
                    className="text-red-600 hover:bg-red-50"
                    title="Delete Tenant"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove Tenant
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground text-center py-10">
              No tenants found. Add a new tenant below.
            </p>
          )}
        </div>
      </main>

      {/* Floating Add Button */}
      <Button
        onClick={handleAddTenant}
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
        title="Add Tenant"
      >
        <Plus className="h-6 w-6" />
      </Button>

      <ManagerBottomNav property={property} />

      {/* Delete Confirmation Modal */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-lg font-heading text-foreground">
              Confirm Removal
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Are you sure you want to remove this tenant from your property
              records? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setOpenDialog(false)}
              className="border-border hover:bg-muted"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteTenant}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Remove Tenant
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManagerTenants;
