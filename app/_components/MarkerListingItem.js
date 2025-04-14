import { Button } from "@/components/ui/button";
import { Bath, BedDouble, MapPin, Ruler, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MarkerListingItem = ({ item, closeHandler }) => {
  return (
    <div>
      <div className=" w-[180px] h-fit  rounded-lg cursor-pointer">
        <X onClick={closeHandler} />
        <Image
          src={item?.listingImages[0]?.url}
          alt=""
          width={800}
          height={150}
          className="rounded-lg object-cover w-[180px] h-[170px] "
        />
        <div className="flex bg-white  p-2 flex-col gap-1 justify-center">
          <h2 className="font-bold text-base">${item?.price}</h2>
          <h2 className="flex gap-2 text-xs text-gray-400">
            <MapPin className="h-4 w-4" />
            {item?.address}
          </h2>
          <div className="flex lg:flex-row flex-col gap-2 mt-2 justify-between">
            <h2 className="flex gap-2 w-full text-xs bg-slate-200 rounded-md p-2 text-gray-500 justify-center items-center">
              <BedDouble className="h-3 w-3" />
              {item?.bedroom}
            </h2>
            <h2 className="flex gap-2 w-full text-xs bg-slate-200 rounded-md p-2 text-gray-500 justify-center items-center">
              <Bath className="h-3 w-3" />
              {item?.bathroom}
            </h2>
          </div>{" "}
          <Link href={`/view-listing/` + item.id} className="w-full">
            <Button size={"sm"}>View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MarkerListingItem;
