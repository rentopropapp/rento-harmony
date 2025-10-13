import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Plus,
  UserCog,
  Wrench,
  Building2,
  Edit3,
  Trash2,
  X,
  ArrowLeft,
} from "lucide-react";
import { ManagerBottomNav } from "@/components/ManagerNavigation";
import rentoLogo from "@/assets/rento-logo-dark.svg";

interface ServiceUser {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string;
  description: string;
}

const ManagerUsersAndRoles = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const property = location.state?.property;

  const [users, setUsers] = useState<ServiceUser[]>([
    {
      id: 1,
      name: "Alice Nambasa",
      email: "alice.manager@email.com",
      role: "Property Manager",
      phone: "+256700123456",
      description: "Oversees tenant relations and financial records.",
    },
    {
      id: 2,
      name: "Brian Kato",
      email: "brian.kato@email.com",
      role: "Maintenance Technician",
      phone: "+256700234567",
      description: "Handles plumbing and electrical repairs.",
    },
    {
      id: 3,
      name: "GreenFix Ltd.",
      email: "info@greenfix.com",
      role: "Cleaning Service",
      phone: "+256700987654",
      description: "Responsible for cleaning and waste management.",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<ServiceUser | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    description: "",
  });

  // Handle Add or Edit Save
  const handleSaveUser = () => {
    if (!formData.name || !formData.role || !formData.email) {
      alert("Please fill in at least name, role, and email.");
      return;
    }

    if (isEditing && selectedUser) {
      // Update existing user
      setUsers((prev) =>
        prev.map((u) => (u.id === selectedUser.id ? { ...u, ...formData } : u))
      );
    } else {
      // Add new user
      setUsers((prev) => [
        ...prev,
        { id: prev.length + 1, ...formData },
      ]);
    }

    setFormData({ name: "", email: "", phone: "", role: "", description: "" });
    setShowForm(false);
    setIsEditing(false);
    setSelectedUser(null);
  };

  const handleEditUser = (user: ServiceUser) => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      description: user.description,
    });
    setSelectedUser(user);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDeleteUser = (id: number) => {
    if (window.confirm("Are you sure you want to remove this user?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
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
            <h1 className="font-heading text-xl font-semibold text-foreground">
              Rento
            </h1>
          </div>
          <p className="hidden md:block text-sm text-muted-foreground">
            Managing:{" "}
            <span className="font-medium text-foreground">
              {property?.name || "Selected Property"}
            </span>
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Users & Roles
          </h2>
          <p className="text-sm text-muted-foreground">
            Assign other managers, service providers, or maintenance personnel for this property.
          </p>
        </div>

        {/* Users List */}
        <div className="grid gap-4 mb-10">
          {users.map((user) => (
            <Card
              key={user.id}
              className="p-5 flex flex-col md:flex-row md:items-center md:justify-between hover:border-primary/60 transition-all relative"
            >
              {/* User Info */}
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10">
                  {user.role.includes("Manager") ? (
                    <UserCog className="text-primary w-6 h-6" />
                  ) : user.role.includes("Maintenance") ? (
                    <Wrench className="text-primary w-6 h-6" />
                  ) : (
                    <Building2 className="text-primary w-6 h-6" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.role}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <p className="text-sm text-muted-foreground">{user.phone}</p>
                  <p className="text-xs text-muted-foreground mt-1">{user.description}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10"
                  onClick={() => handleEditUser(user)}
                >
                  <Edit3 className="h-4 w-4 text-primary" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-red-50"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Add/Edit User Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <Card className="w-full max-w-md p-6 bg-card shadow-lg animate-fade-in relative">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 hover:bg-muted"
                onClick={() => setShowForm(false)}
              >
                <X className="h-4 w-4" />
              </Button>

              <h3 className="text-lg font-semibold mb-4 text-foreground">
                {isEditing ? "Edit User" : "Add New User"}
              </h3>

              <div className="space-y-4">
                <Input
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <Input
                  placeholder="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <Input
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />

                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, role: value })
                  }
                  value={formData.role}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Property Manager">
                      Property Manager
                    </SelectItem>
                    <SelectItem value="Maintenance Technician">
                      Maintenance Technician
                    </SelectItem>
                    <SelectItem value="Cleaning Service">
                      Cleaning Service
                    </SelectItem>
                    <SelectItem value="Security Personnel">
                      Security Personnel
                    </SelectItem>
                    <SelectItem value="Gardening Service">
                      Gardening Service
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Short Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveUser}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isEditing ? "Save Changes" : "Add User"}
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* Floating Add Button */}
      <Button
        onClick={() => {
          setShowForm(true);
          setIsEditing(false);
          setFormData({ name: "", email: "", phone: "", role: "", description: "" });
        }}
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
        title="Add User"
      >
        <Plus className="h-6 w-6" />
      </Button>

      <ManagerBottomNav property={property} />
    </div>
  );
};

export default ManagerUsersAndRoles;
