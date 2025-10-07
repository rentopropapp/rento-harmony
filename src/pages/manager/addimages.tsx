import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Upload, Image as ImageIcon, Trash2, ArrowLeft } from "lucide-react";
import rentoLogo from "@/assets/rento-logo-dark.svg";

const formSchema = z.object({
  images: z
    .array(z.instanceof(File))
    .min(3, "Select at least 3 high-quality images")
    .max(5, "You can upload up to 5 images only"),
});

const PropertyImagesUpload = () => {
  const navigate = useNavigate();
  const [previews, setPreviews] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { images: [] },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newFiles = [...form.getValues("images"), ...files].slice(0, 5);
    form.setValue("images", newFiles, { shouldValidate: true });

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const removeImage = (index: number) => {
    const currentFiles = form.getValues("images");
    const updatedFiles = currentFiles.filter((_, i) => i !== index);
    form.setValue("images", updatedFiles, { shouldValidate: true });

    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Uploaded images:", data.images);
    navigate("/manager/properties");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <img src={rentoLogo} alt="Rento" className="h-8 w-auto" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
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
            Select at least 3 high-quality images to make your property stand out.
          </h1>
          <p className="mb-6 text-sm text-muted-foreground">
            Upload between 3 to 5 photos that best showcase your property.
          </p>

          <Card className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="images"
                  render={() => (
                    <FormItem>
                      <FormLabel>Upload Property Photos</FormLabel>
                      <FormControl>
                        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card p-8 text-center transition hover:border-primary">
                          <Upload className="mb-3 h-8 w-8 text-primary" />
                          <p className="text-sm text-muted-foreground">
                            Drag and drop or click to upload images
                          </p>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="absolute inset-0 cursor-pointer opacity-0"
                            onChange={handleFileChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Image Previews */}
                {previews.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {previews.map((src, index) => (
                      <div key={index} className="relative">
                        <img
                          src={src}
                          alt={`Property ${index + 1}`}
                          className="h-40 w-full rounded-lg object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute right-2 top-2 h-6 w-6 rounded-full"
                          onClick={() => removeImage(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    Continue
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

export default PropertyImagesUpload;
