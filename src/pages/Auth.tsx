import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RoleSelector } from "@/components/RoleSelector";
import rentoLogo from "@/assets/rento-logo-light.svg";

const Auth = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<"tenant" | "broker" | "manager" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp && !selectedRole) {
      return;
    }

    // Navigate based on role
    if (selectedRole === "tenant") {
      navigate("/tenant/home");
    } else if (selectedRole === "broker") {
      navigate("/broker/home");
    } else if (selectedRole === "manager") {
      navigate("/manager/home");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center fade-in">
          <img
            src={rentoLogo}
            alt="Rento Logo"
            className="mx-auto mb-6 h-16 w-auto"
          />
          <h1 className="mb-3 font-heading text-4xl font-bold text-primary">
            Welcome to Rento
          </h1>
          <p className="text-lg text-muted-foreground">
            Revolutionizing the Rental Experience
          </p>
        </div>

        <div className="mx-auto max-w-md rounded-2xl bg-card p-8 shadow-card fade-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div className="space-y-4">
                <Label className="text-base font-semibold">
                  I want to sign up as:
                </Label>
                <RoleSelector
                  selectedRole={selectedRole}
                  onSelectRole={setSelectedRole}
                />
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="h-12 w-full bg-gradient-primary font-semibold"
              disabled={isSignUp && !selectedRole}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-primary hover:underline"
              >
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
