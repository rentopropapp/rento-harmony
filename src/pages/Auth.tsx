import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building2, Users, Home, ArrowLeft, Upload } from "lucide-react";
import rentoLogo from "@/assets/rento-logo-dark.svg";
import { supabase } from "@/lib/supabase";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const switchRole = location.state?.role as "tenant" | "manager" | "broker" | undefined;
  const [userType, setUserType] = useState<"tenant" | "manager" | "broker">(switchRole || "tenant");
  const [signupPhase, setSignupPhase] = useState(1);
  const [activeTab, setActiveTab] = useState(switchRole ? "login" : "signup");
  
  // Phase 2 fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [howHeard, setHowHeard] = useState("");
  const [occupation, setOccupation] = useState("");
  
  // Phase 3 fields
  const [photo, setPhoto] = useState<string | null>(null);
  
  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // Signup password
  const [signupPassword, setSignupPassword] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const navigateByRole = (role: "tenant" | "manager" | "broker") => {
    if (role === "tenant") navigate("/tenant/home");
    else if (role === "manager") navigate("/manager/home");
    else navigate("/broker/home");
  };

  const handleSignUp = async () => {
    setError(null);
    setLoading(true);
    try {
      if (!email || !signupPassword) {
        throw new Error("Email and password are required");
      }

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password: signupPassword,
      });
      if (signUpError) throw signUpError;

      const user = signUpData.user;
      if (!user) throw new Error("Signup failed: missing user");

      // Upsert profile with selected role and basic info
      const fullName = `${firstName} ${lastName}`.trim();
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({ id: user.id, role: userType, full_name: fullName || null, phone: phone || null, avatar_url: photo || null }, { onConflict: "id" });
      if (profileError) throw profileError;

      // Store auth email for convenience
      const { error: credError } = await supabase
        .from("auth_credentials")
        .upsert({ user_id: user.id, email }, { onConflict: "user_id" });
      if (credError) throw credError;

      // Insert role-specific row
      if (userType === "tenant") {
        const { error: tErr } = await supabase
          .from("tenant_profiles")
          .upsert({ user_id: user.id, occupation: occupation || null, how_heard: howHeard || null }, { onConflict: "user_id" });
        if (tErr) throw tErr;
      } else if (userType === "broker") {
        const { error: bErr } = await supabase
          .from("broker_profiles")
          .upsert({ user_id: user.id, license_no: null, company: null }, { onConflict: "user_id" });
        if (bErr) throw bErr;
      } else if (userType === "manager") {
        const { error: mErr } = await supabase
          .from("manager_profiles")
          .upsert({ user_id: user.id, company: null }, { onConflict: "user_id" });
        if (mErr) throw mErr;
      }

      // Navigate by role
      navigateByRole(userType);
    } catch (e: any) {
      setError(e.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      if (!loginEmail || !loginPassword) {
        throw new Error("Email and password are required");
      }
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      if (signInError) throw signInError;
      const user = signInData.user;
      if (!user) throw new Error("Login failed: missing user");

      // Get profile to know role
      const { data: profile, error: profErr } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      if (profErr) throw profErr;

      const role = profile?.role as "tenant" | "manager" | "broker" | undefined;
      if (!role) throw new Error("No role found for user");
      if (role !== userType) {
        throw new Error(`This account is a ${role}. Switch to the ${role} tab to login.`);
      }
      navigateByRole(role);
    } catch (e: any) {
      setError(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const nextPhase = () => setSignupPhase(prev => Math.min(prev + 1, 3));
  const prevPhase = () => setSignupPhase(prev => Math.max(prev - 1, 1));

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
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="login">Login</TabsTrigger>
            </TabsList>

            {/* 🧾 Sign Up Tab */}
            <TabsContent value="signup" className="space-y-6">
              {/* Phase Indicator */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {[1, 2, 3].map((phase) => (
                  <div
                    key={phase}
                    className={`h-2 rounded-full transition-all ${
                      phase === signupPhase
                        ? "w-8 bg-primary"
                        : phase < signupPhase
                        ? "w-2 bg-primary/50"
                        : "w-2 bg-border"
                    }`}
                  />
                ))}
              </div>

              {/* Phase 1: User Type Selection */}
              {signupPhase === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">
                      What best describes you?
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

                  <Button
                    onClick={nextPhase}
                    className="w-full h-12 bg-gradient-primary hover:opacity-90 transition-opacity"
                  >
                    Continue
                  </Button>
                </div>
              )}

              {/* Phase 2: Personal Information */}
              {signupPhase === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-12"
                      />
                    </div>

                  <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12"
                      />
                    </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a strong password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="h-12"
                    />
                  </div>

                    <div className="space-y-2">
                      <Label htmlFor="howHeard">How did you hear about Rento?</Label>
                      <Select value={howHeard} onValueChange={setHowHeard}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="social">Social Media</SelectItem>
                          <SelectItem value="friend">Friend/Family</SelectItem>
                          <SelectItem value="search">Search Engine</SelectItem>
                          <SelectItem value="ad">Advertisement</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="occupation">What do you do for work?</Label>
                      <Input
                        id="occupation"
                        placeholder="Software Engineer"
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={prevPhase}
                      variant="outline"
                      className="h-12 flex-1"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={nextPhase}
                      className="h-12 flex-1 bg-gradient-primary hover:opacity-90 transition-opacity"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* Phase 3: Photo Upload */}
              {signupPhase === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-4">
                    <Label className="text-center block">Add a photo of yourself</Label>
                    <div className="flex flex-col items-center gap-4">
                      <Avatar className="h-32 w-32">
                        {photo ? (
                          <AvatarImage src={photo} alt="Profile" />
                        ) : (
                          <AvatarFallback className="bg-muted">
                            <Upload className="w-8 h-8 text-muted-foreground" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      
                      <label htmlFor="photo-upload">
                        <Button
                          type="button"
                          variant="outline"
                          className="cursor-pointer"
                          onClick={() => document.getElementById('photo-upload')?.click()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {photo ? "Change Photo" : "Upload Photo"}
                        </Button>
                      </label>
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <p className="text-xs text-muted-foreground text-center">
                        Optional: Add a photo to personalize your profile
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={prevPhase}
                      variant="outline"
                      className="h-12 flex-1"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={handleSignUp}
                      disabled={loading}
                      className="h-12 flex-1 bg-gradient-primary hover:opacity-90 transition-opacity"
                    >
                      {loading ? "Signing up..." : "Complete Sign Up"}
                    </Button>
                  </div>

                  <p className="text-center text-sm text-muted-foreground">
                    By signing up, you agree to our Terms & Privacy Policy
                  </p>
                </div>
              )}
            </TabsContent>

            {/* 🔐 Login Tab */}
            <TabsContent value="login" className="space-y-6">
              {/* User Type Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  Login as
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

              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="h-12"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="h-12"
                />
              </div>

              <Button
                onClick={handleLogin}
                disabled={loading}
                className="w-full h-12 bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
