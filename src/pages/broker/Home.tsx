import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import rentoLogo from "@/assets/rento-logo-dark.svg";

const BrokerHome = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <img src={rentoLogo} alt="Rento" className="h-8 w-auto" />
          <h2 className="font-heading text-xl font-semibold">Broker Dashboard</h2>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="mb-4 font-heading text-3xl font-bold">
            Welcome, Broker!
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Start listing properties and managing your clients
          </p>
          <Button 
            className="h-12 px-8"
            onClick={() => navigate("/broker/add-property")}
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Property
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BrokerHome;
