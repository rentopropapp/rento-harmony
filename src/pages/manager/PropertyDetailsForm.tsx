import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import rentoLogo from "@/assets/rento-logo-light.svg";
import { useState } from "react";

const amenitiesList = [
  "WiFi",
  "Parking",
  "Swimming Pool",
  "Gym",
  "Security",
  "Generator",
  "Air Conditioning",
  "Elevator",
  "Balcony",
  "Garden",
];

const formSchema = z.object({
  propertyName: z.string().min(2, "Property name must be at least 2 characters"),
  furnished: z.enum(["yes", "no"]),
  amenities: z.array(z.string()).min(1, "Select at least one amenity"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  location: z.string().min(5, "Location must be at least 5 characters"),
  hasViewingFee: z.enum(["yes", "no"]),
  viewingFee: z.string().optional(),
  leaseType: z.string().min(1, "Please select a lease type"),
  rent: z.string().min(1, "Rent amount is required"),
});

const PropertyDetailsForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const propertyType = location.state?.propertyType || "Property";
  const [hasViewingFee, setHasViewingFee] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyName: "",
      furnished: "no",
      amenities: [],
      description: "",
      location: "",
      hasViewingFee: "no",
      viewingFee: "",
      leaseType: "",
      rent: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Property details submitted:", { ...data, propertyType });
    // TODO: Handle form submission (save to database)
    navigate("/manager/home");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <img src={rentoLogo} alt="Rento" className="h-8 w-auto" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/manager/add-property")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-2 font-heading text-2xl font-bold text-foreground">
            Property Details
          </h1>
          <p className="mb-6 text-sm text-muted-foreground">
            Adding: {propertyType}
          </p>

          <Card className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Property Name */}
                <FormField
                  control={form.control}
                  name="propertyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What is the property name?</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Hillview Apartment" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Furnished */}
                <FormField
                  control={form.control}
                  name="furnished"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Is the property Furnished?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="furnished-yes" />
                            <Label htmlFor="furnished-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="furnished-no" />
                            <Label htmlFor="furnished-no">No</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Amenities */}
                <FormField
                  control={form.control}
                  name="amenities"
                  render={() => (
                    <FormItem>
                      <FormLabel>What Amenities/Facilities are available?</FormLabel>
                      <div className="grid grid-cols-2 gap-3">
                        {amenitiesList.map((amenity) => (
                          <FormField
                            key={amenity}
                            control={form.control}
                            name="amenities"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={amenity}
                                  className="flex items-center space-x-2 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(amenity)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, amenity])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== amenity
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <Label className="font-normal">{amenity}</Label>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Give a brief Property Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the property, its features, and what makes it special..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Location */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What is the Location of the property?</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 123 Main Street, Kampala" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Viewing Fee */}
                <FormField
                  control={form.control}
                  name="hasViewingFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Are there any viewing fees?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value);
                            setHasViewingFee(value === "yes");
                          }}
                          defaultValue={field.value}
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="viewing-yes" />
                            <Label htmlFor="viewing-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="viewing-no" />
                            <Label htmlFor="viewing-no">No</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {hasViewingFee && (
                  <FormField
                    control={form.control}
                    name="viewingFee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How much is the viewing fee?</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 50000"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Lease Type */}
                <FormField
                  control={form.control}
                  name="leaseType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What is the lease type of the property?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select lease type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="bi-annual">Bi-Annual (6 months)</SelectItem>
                          <SelectItem value="annual">Annual (1 year)</SelectItem>
                          <SelectItem value="multi-year">Multi-Year</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Rent */}
                <FormField
                  control={form.control}
                  name="rent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How much is the rent?</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 1500000"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/manager/add-property")}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    Add Property
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsForm;
