import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, Bath, Square } from "lucide-react";

interface PropertyCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  area: string;
  type: "rent" | "sale" | "airbnb";
  onClick?: () => void;
}

export const PropertyCard = ({
  image,
  title,
  location,
  price,
  beds,
  baths,
  area,
  type,
  onClick,
}: PropertyCardProps) => {
  const getBadgeVariant = () => {
    switch (type) {
      case "rent":
        return "default";
      case "sale":
        return "secondary";
      case "airbnb":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <Card
      className="hover-lift cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Badge
          variant={getBadgeVariant()}
          className="absolute right-3 top-3 capitalize"
        >
          {type}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">
          {title}
        </h3>
        <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{beds}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{baths}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="h-4 w-4" />
            <span>{area}</span>
          </div>
        </div>
        <p className="font-heading text-xl font-bold text-primary">{price}</p>
      </CardContent>
    </Card>
  );
};
