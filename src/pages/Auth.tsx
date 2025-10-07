import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, Home } from "lucide-react";
import rentoLogo from "@/assets/rento-logo-dark.svg"; // ✅ Using the dark logo

const Auth = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<"tenant" | "manager" | "broker">("tenant");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Separate actions for clarity
  const handleSignUp = () => {
    if (userType === "tenant") navigate("/tenant");
    else if (userType === "manager") navigate("/manager");
    else navigate("/broker");
  };

  const handleLogin = () => {
    // In the future, authenticate first
    if (userType === "tenant") navigate("/tenant");
    else if (userType === "manager") navigate("/manager");
    else navigate("/broker");
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* ✅ Logo & Tagline */}
        <div className="text-center mb-8 animate-fade-in">
          <img
            src={rentoLogo}
            alt="Rento"
            className="h-12 w-auto mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold text-primary mb-2 font-heading">Rento</h1>
          <p className="text-muted-foreground">
            Revolutionizing the Rental Experience
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-card rounded-2xl shadow-lg p-8 animate-slide-up">
          <Tabs defaultValue="signup" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="login">Login</TabsTrigger>
            </TabsList>

            {/* 🧾 Sign Up Tab */}
            <TabsContent value="signup" className="space-y-6">
              {/* User Type Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  Sign up as
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setUserType("tenant")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      userType === "tenant"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Home className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-xs font-medium">Tenant</p>
                  </button>
                  <button
                    onClick={() => setUserType("manager")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      userType === "manager"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Building2 className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-xs font-medium">Manager</p>
                  </button>
                  <button
                    onClick={() => setUserType("broker")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      userType === "broker"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-xs font-medium">Broker</p>
                  </button>
                </div>
              </div>

              {/* Input Fields */}
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                />
              </div>

              {/* Sign Up Button */}
              <Button
                onClick={handleSignUp}
                className="w-full h-12 bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                Sign Up
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                By signing up, you agree to our Terms & Privacy Policy
              </p>
            </TabsContent>

            {/* 🔐 Login Tab */}
            <TabsContent value="login" className="space-y-6">
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                />
              </div>

              <Button
                onClick={handleLogin}
                className="w-full h-12 bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                Login
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
