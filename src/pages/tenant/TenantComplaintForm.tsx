import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ArrowLeft, AlertCircle } from "lucide-react";
import rentoLogo from "@/assets/rento-logo-dark.svg";

const formSchema = z.object({
  topic: z.string().min(3, "Topic is required"),
  urgency: z.enum(["Low", "Medium", "High"]),
  details: z.string().min(10, "Please provide more details"),
});

const TenantComplaintForm = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { topic: "", urgency: "Low", details: "" },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Complaint submitted:", data);
    navigate(-1); // go back to previous page after submission
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <img src={rentoLogo} alt="Rento" className="h-8 w-auto" />
            <h1 className="font-heading text-xl font-semibold text-foreground">
              Submit a Complaint
            </h1>
          </div>
        </div>
      </header>

      {/* Form Card */}
      <main className="container mx-auto px-4 py-10 max-w-lg">
        <Card className="p-6 border-border">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Topic of Complaint */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Topic of Complaint
              </label>
              <Input
                placeholder="Enter the topic"
                {...form.register("topic")}
                className="h-12"
              />
              {form.formState.errors.topic && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.topic.message}
                </p>
              )}
            </div>

            {/* Urgency Level */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Urgency Level
              </label>
              <Select
                onValueChange={(value) => form.setValue("urgency", value as "Low" | "Medium" | "High")}
                defaultValue={form.getValues("urgency")}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.urgency && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.urgency.message}
                </p>
              )}
            </div>

            {/* Details */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Details About the Complaint
              </label>
              <Textarea
                placeholder="Describe your issue in detail"
                rows={5}
                {...form.register("details")}
              />
              {form.formState.errors.details && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.details.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Submit Complaint
            </Button>
          </form>
        </Card>
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

export default TenantComplaintForm;
