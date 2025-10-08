import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Upload, Home, MapPin, Ruler, BedDouble, ArrowLeft, CalendarCheck2 } from "lucide-react";
import rentoLogo from "@/assets/rento-logo-dark.svg";

const propertySchema = z.object({
  title: z.string().min(3, "Property title is required"),
  price: z.string().min(1, "Price is required"),
  location: z.string().min(3, "Location is required"),
  size: z.string().min(1, "Size is required"),
  rooms: z.string().min(1, "Number of rooms is required"),
  description: z.string().min(10, "Please provide property details"),
  images: z.any(),
});

const EditProperty = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Property ID from route (e.g., /edit-property/:id)

  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "Hillview Apartment",
      price: "800,000",
      location: "Muyenga, Kampala",
      size: "1200 sq ft",
      rooms: "3",
      description:
        "Spacious 3-bedroom apartment located in the heart of Muyenga with a beautiful city view, secure parking, and modern amenities.",
    },
  });

  const handleSubmit = (data: z.infer<typeof propertySchema>) => {
    console.log("Updated Property Data:", data);
    console.log("Available Viewing Dates:", selectedDates);
    alert("Property details updated successfully!");
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background relative pb-20">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <img src={rentoLogo} alt="Rento" className="h-8 w-auto" />
            <h1 className="font-heading text-xl font-semibold text-foreground">
              Edit Property Details
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10 max-w-2xl space-y-6">
        <Card className="p-6 border-border">
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Property Title */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Property Title
              </label>
              <Input {...form.register("title")} className="h-12" />
            </div>

            {/* Price */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Price (UGX)
              </label>
              <Input type="number" {...form.register("price")} className="h-12" />
            </div>

            {/* Location */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Location
              </label>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <Input {...form.register("location")} className="h-12" />
              </div>
            </div>

            {/* Size & Rooms */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Size
                </label>
                <div className="flex items-center gap-2">
                  <Ruler className="h-5 w-5 text-primary" />
                  <Input {...form.register("size")} className="h-12" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Rooms
                </label>
                <div className="flex items-center gap-2">
                  <BedDouble className="h-5 w-5 text-primary" />
                  <Input {...form.register("rooms")} className="h-12" />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Description
              </label>
              <Textarea rows={4} {...form.register("description")} />
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Property Images
              </label>
              <div className="flex items-center gap-3">
                <Upload className="h-5 w-5 text-primary" />
                <Input type="file" multiple {...form.register("images")} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                You can upload new images to replace the current ones.
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Save Changes
            </Button>
          </form>
        </Card>

        {/* Schedule Section */}
        <Card className="p-6 border-border text-center">
          <h2 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center justify-center gap-2">
            <CalendarCheck2 className="h-5 w-5 text-primary" />
            Broker/Manager Viewing Schedule
          </h2>

          <p className="text-sm text-muted-foreground mb-4">
            Select the days you’re available for property viewings this month.
          </p>

          <div className="flex justify-center">
            <Calendar
              mode="multiple"
              selected={selectedDates}
              onSelect={setSelectedDates}
              className="rounded-lg border border-border bg-card shadow-sm"
            />
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Selected days:{" "}
            <span className="text-primary font-medium">
              {selectedDates.length > 0
                ? selectedDates.map((d) => d.toDateString()).join(", ")
                : "No days selected"}
            </span>
          </p>
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

export default EditProperty;
