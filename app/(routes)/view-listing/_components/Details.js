import GoogleMapSection from "@/app/_components/GoogleMapSection";
import { Button } from "@/components/ui/button";
import {
  Bath,
  BedDouble,
  CarFront,
  Drill,
  Home,
  LandPlot,
  MapPin,
  Share,
} from "lucide-react";
import React from "react";
import AgentDetails from "./AgentDetails";

const Details = ({ item }) => {
  return (
    <div className="mt-3">
      <div className="flex justify-between border-b border-gray-400/50 py-3 my-3">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-2xl">$ {item?.price}</h2>
          <h2 className="flex items-center text-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{item?.address}</span>
          </h2>
        </div>
        <Button>
          <Share />
          <span>Share</span>
        </Button>
      </div>

      <div className="py-3">
        <h2 className="font-bold text-2xl ">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center mt-3 text-sm">
          <div className="flex gap-2 py-1.5 px-1.5">
            <h2 className="flex gap-2 py-2 text-center justify-center items-center text-primary bg-purple-200 rounded-md w-full">
              <Home className="w-4 h-4" /> <span>{item?.propertyType}</span>
            </h2>
          </div>
          <div className="flex gap-2 py-1.5 px-1.5">
            <h2 className="flex gap-2 py-2 text-center justify-center items-center text-primary bg-purple-200 rounded-md w-full">
              <Drill className="w-4 h-4" />{" "}
              <span>Built In {item?.builtIn}</span>
            </h2>
          </div>
          <div className="flex gap-2 py-1.5 px-1.5">
            <h2 className="flex gap-2 py-2 text-center justify-center items-center text-primary bg-purple-200 rounded-md w-full">
              <LandPlot className="w-4 h-4" /> <span>{item?.area}</span>
            </h2>
          </div>
          <div className="flex gap-2 py-1.5 px-1.5">
            <h2 className="flex gap-2 py-2 text-center justify-center items-center text-primary bg-purple-200 rounded-md w-full">
              <BedDouble className="w-4 h-4" /> <span>{item?.bedroom} Bed</span>
            </h2>
          </div>
          <div className="flex gap-2 py-1.5 px-1.5">
            <h2 className="flex gap-2 py-2 text-center justify-center items-center text-primary bg-purple-200 rounded-md w-full">
              <Bath className="w-4 h-4" /> <span>{item?.bathroom} Bath</span>
            </h2>
          </div>
          <div className="flex gap-2 py-1.5 px-1.5">
            <h2 className="flex gap-2 py-2 text-center justify-center items-center text-primary bg-purple-200 rounded-md w-full">
              <CarFront className="w-4 h-4" />{" "}
              <span>{item?.parking} Parking</span>
            </h2>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-bold text-2xl">What&lsquo;s Special</h2>
        <p className="text-xs font-medium p-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
          aspernatur culpa quis eligendi amet, quibusdam distinctio eaque totam
          explicabo consectetur maxime modi mollitia corporis architecto
          voluptates sint exercitationem? Repellendus corporis officiis voluptas
          minus hic eligendi eveniet maxime facilis, quaerat, inventore pariatur
          iste atque? Qui inventore eos nobis, eius non ratione odio delectus.
          Nostrum facilis nisi, dolore reiciendis ea quasi velit ex consectetur
          accusantium, voluptates veritatis? Eveniet adipisci illum repellat
          modi amet. Voluptatibus, repellendus similique odio consequatur harum
          ut eum accusantium cupiditate. Illum nostrum alias architecto
          exercitationem accusamus aspernatur.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-2xl">Find On Map</h2>
        <GoogleMapSection coordinates={item?.coordinates} listing={[item]} />
      </div>

      <div className="mt-2 p-2">
        <h2 className="font-bold text-2xl">Contact Agent</h2>
        <AgentDetails listingDetails={item} />
      </div>
    </div>
  );
};

export default Details;
