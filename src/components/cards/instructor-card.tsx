import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface InstructorCardProps {
  name: string;
  role: string;
  bio?: string;
  image: string;
  certifications?: string[];
  className?: string;
}

export function InstructorCard({
  name,
  role,
  bio,
  image,
  certifications,
  className,
}: InstructorCardProps) {
  return (
    <Card variant="default" padding="none" className={cn("overflow-hidden group", className)}>
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Name and role overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <h3 className="font-heading text-2xl">{name}</h3>
          <p className="text-white/80">{role}</p>
        </div>
      </div>

      {/* Content */}
      {(bio || certifications) && (
        <CardContent className="p-5">
          {bio && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {bio}
            </p>
          )}
          
          {certifications && certifications.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <Badge key={cert} variant="secondary" size="sm">
                  {cert}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
