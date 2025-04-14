"use client";

import { supabase } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Slider from "../_components/Slider";
import { useParams } from "next/navigation";
import Details from "../_components/Details";
import Loading from "../Loading";

const ViewListing = () => {
  const [listingDetail, setListingDetail] = useState();
  const params = useParams();

  useEffect(() => {
    getListingDetails();
  }, []);
  const getListingDetails = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*, listingImages(url,listing_id)")
      .eq("id", params.id)
      .eq("active", true);

    if (data) {
      setListingDetail(data[0]);
    }
    if (error) {
      toast("Server Side Error");
    }
  };

  return (
    <div>
      {listingDetail ? (
        <div className="px-4 md:px-32 lg:px-56 py-3 ">
          <Slider imageList={listingDetail?.listingImages} />
          <Details item={listingDetail} />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ViewListing;
