import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import TenantHome from "./pages/tenant/Home";
import BrokerHome from "./pages/broker/Home";
import ManagerHome from "./pages/manager/Home";
import AddProperty from "./pages/manager/AddProperty";
import PropertyDetailsForm from "./pages/manager/PropertyDetailsForm";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/tenant/home" element={<TenantHome />} />
          <Route path="/broker/home" element={<BrokerHome />} />
          <Route path="/manager/home" element={<ManagerHome />} />
          <Route path="/manager/add-property" element={<AddProperty />} />
          <Route path="/manager/property-details" element={<PropertyDetailsForm />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
