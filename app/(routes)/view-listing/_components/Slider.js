import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const Slider = ({ imageList }) => {
  return (
    <div>
      {imageList ? (
        <Carousel>
          <CarouselContent>
            {imageList?.map((item, index) => (
              <CarouselItem key={index}>
                <Image
                  src={item?.url ? item?.url : "/ImagePlaceholder.png"}
                  alt=""
                  width={1100}
                  height={300}
                  className="rounded-xl object-center object-cover h-[400px]"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div className="w-full h-[200px] bg-slate-200 animate-pulse rounded-lg"></div>
      )}
    </div>
  );
};

export default Slider;
