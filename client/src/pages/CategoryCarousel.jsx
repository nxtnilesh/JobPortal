import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";

const CategoryCarousel = () => {
  const category = [
    "frontend",
    "backend",
    "fullstack",
    "devops",
    "testing",
    "mobile",
    "design",
    "management",
    "marketing",
    "content",
    "data",
    "security",
    "other",
  ];
  return (
    <div className="max-w-7xl mx-auto my-10 flex items-center justify-center">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full h-10"
      >
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/8">
                <Button variant="outline" className="w-full  px-4 py-2text-2xl uppercase">{cat}</Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
