// "use client";
import React from "react";
import Header from "./_components/Header";
import { LoadScript } from "@react-google-maps/api";

function Provider({ children }) {
  return (
    <div>
      {/* <LoadScript
        googleMapsApiKey={process.env.GOOGLE_PLACE_MAP_API_KEY}
        libraries={["places"]}
      /> */}
      <Header />
      <div className="mt-28">{children}</div>
    </div>
  );
}

export default Provider;
