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
import TenantSearchRequest from "./pages/tenant/TenantSearchRequest";
import TenantComplaintForm from "./pages/tenant/TenantComplaintForm";
import TenantNotices from "./pages/tenant/TenantNotices";
import TenantExpenses from "./pages/tenant/TenantExpenses";
import TenantPropertyListings from "./pages/tenant/TenantPropertyListings";
import BrokerHome from "./pages/broker/Home";
import BrokerAddProperty from "./pages/broker/AddProperty";
import BrokerPropertyDetailsForm from "./pages/broker/PropertyDetailsForm";
import BrokerAddImages from "./pages/broker/addimages";
import BrokerListings from "./pages/broker/BrokerListings";
import BrokerWallet from "./pages/broker/BrokerWallet";
import BrokerLeads from "./pages/broker/BrokerLeads";
import BrokerProfile from "./pages/broker/BrokerProfile";
import BrokerEditProperty from "./pages/broker/brokerEditProperty";
import ManagerHome from "./pages/manager/Home";
import ManagerAddProperty from "./pages/manager/AddProperty";
import ManagerPropertyDetailsForm from "./pages/manager/PropertyDetailsForm";
import ManagerAddImages from "./pages/manager/addimages";
import ManagerBookings from "./pages/manager/ManagerBookings";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import ManagerProfile from "./pages/manager/ManagerProfile";
import ManagerTenants from "./pages/manager/ManagerTenants";
import PropertyList from "./pages/manager/propertylist";
import ManagerExpenses from "./pages/manager/ManagerExpenses";
import ManagerEditProperty from "./pages/manager/pmEditProperty";
import ManagerTenantAgreement from "./pages/manager/TenantAgreement";
import ManagerMessages from "./pages/manager/ManagerMessages";
import ManagerUsersAndRoles from "./pages/manager/ManagerUsersAndRoles";

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
          <Route path="/tenant/search-request" element={<TenantSearchRequest />} />
          <Route path="/tenant/complaints" element={<TenantComplaintForm />} />
          <Route path="/tenant/notices" element={<TenantNotices />} />
          <Route path="/tenant/expenses" element={<TenantExpenses />} />
          <Route path="/tenant/property-listings" element={<TenantPropertyListings />} />
          <Route path="/broker/home" element={<BrokerHome />} />
          <Route path="/broker/add-property" element={<BrokerAddProperty />} />
          <Route path="/broker/property-details" element={<BrokerPropertyDetailsForm />} />
          <Route path="/broker/add-images" element={<BrokerAddImages />} />
          <Route path="/broker/listings" element={<BrokerListings />} />
          <Route path="/broker/wallet" element={<BrokerWallet />} />
          <Route path="/broker/leads" element={<BrokerLeads />} />
          <Route path="/broker/profile" element={<BrokerProfile />} />
          <Route path="/broker/edit-property" element={<BrokerEditProperty />} />
          <Route path="/manager/home" element={<ManagerHome />} />
          <Route path="/manager/add-property" element={<ManagerAddProperty />} />
          <Route path="/manager/property-details" element={<ManagerPropertyDetailsForm />} />
          <Route path="/manager/add-images" element={<ManagerAddImages />} />
          <Route path="/manager/bookings" element={<ManagerBookings />} />
          <Route path="/manager/dashboard" element={<ManagerDashboard />} />
          <Route path="/manager/edit-property" element={<ManagerEditProperty />} />
          <Route path="/manager/tenant-agreement" element={<ManagerTenantAgreement />} />
          <Route path="/manager/messages" element={<ManagerMessages />} />
          <Route path="/manager/users-roles" element={<ManagerUsersAndRoles />} />
          <Route path="/manager/expenses" element={<ManagerExpenses />} />
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
