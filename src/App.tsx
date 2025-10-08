import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TenantHome from "./pages/tenant/Home";
import TenantDashboard from "./pages/tenant/TenantDashboard";
import TenantPayments from "./pages/tenant/TenantPayments";
import TenantProfile from "./pages/tenant/TenantProfile";
import BrokerHome from "./pages/broker/Home";
import BrokerAddProperty from "./pages/broker/AddProperty";
import BrokerPropertyDetailsForm from "./pages/broker/PropertyDetailsForm";
import BrokerAddImages from "./pages/broker/addimages";
import ManagerHome from "./pages/manager/Home";
import ManagerAddProperty from "./pages/manager/AddProperty";
import ManagerPropertyDetailsForm from "./pages/manager/PropertyDetailsForm";
import ManagerAddImages from "./pages/manager/addimages";
import ManagerBookings from "./pages/manager/ManagerBookings";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import ManagerProfile from "./pages/manager/ManagerProfile";
import ManagerTenants from "./pages/manager/ManagerTenants";
import PropertyList from "./pages/manager/propertylist";

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
          <Route path="/tenant/dashboard" element={<TenantDashboard />} />
          <Route path="/tenant/payments" element={<TenantPayments />} />
          <Route path="/tenant/profile" element={<TenantProfile />} />
          <Route path="/broker/home" element={<BrokerHome />} />
          <Route path="/broker/add-property" element={<BrokerAddProperty />} />
          <Route path="/broker/property-details" element={<BrokerPropertyDetailsForm />} />
          <Route path="/broker/add-images" element={<BrokerAddImages />} />
          <Route path="/manager/home" element={<ManagerHome />} />
          <Route path="/manager/add-property" element={<ManagerAddProperty />} />
          <Route path="/manager/property-details" element={<ManagerPropertyDetailsForm />} />
          <Route path="/manager/add-images" element={<ManagerAddImages />} />
          <Route path="/manager/bookings" element={<ManagerBookings />} />
          <Route path="/manager/dashboard" element={<ManagerDashboard />} />
          <Route path="/manager/profile" element={<ManagerProfile />} />
          <Route path="/manager/tenants" element={<ManagerTenants />} />
          <Route path="/manager/properties" element={<PropertyList />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
