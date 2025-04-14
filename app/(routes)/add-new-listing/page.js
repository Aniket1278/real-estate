"use client";

import Google_address_Search from "@/app/_components/Google_address_Search";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const api_key = process.env.GOOGLE_PLACE_MAP_API_KEY;

const AddNewListing = () => {
  const [selectedAddress, setSelectedAddress] = useState();
  const [coordinates, setCoordinates] = useState();
  const { user } = useUser();
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  // console.log(selectedAddress);

  const nextHandler = async () => {
    setLoader(true);
    const { data, error } = await supabase
      .from("listing")
      .insert([
        {
          address: selectedAddress.label,
          coordinates: coordinates,
          createdBy: user?.primaryEmailAddress.emailAddress,
        },
      ])
      .select();
    if (data) {
      setLoader(false);
      console.log(`New Data Added : `, data);
      toast("New Address Added For Listing");
      router.replace("/edit-listing/" + data[0]?.id);
    }
    if (error) {
      setLoader(false);
      console.log(`Error`, error);
      toast("Server Side Error");
    }
  };

  return (
    <div className="mt-10 md:mx-56 lg:mx-80">
      <div className="p-10 flex flex-col gap-5 items-center justify-center">
        <h2 className="font-bold text-2xl">Add New Listing</h2>

        <div className="p-10 px-16 md:px-20 rounded-lg border w-full md:min-w-[500px] shadow-md flex flex-col gap-5">
          <h2 className="text-gray-500">
            Enter Address which you want to list
          </h2>
          <Google_address_Search
            selectedAddress={(value) => setSelectedAddress(value)}
            setCoordinates={(value) => setCoordinates(value)}
          />
          <Button
            disabled={!selectedAddress || !coordinates || loader}
            onClick={nextHandler}
          >
            {loader ? <Loader className="animate-spin" /> : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddNewListing;
