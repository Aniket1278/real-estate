"use client";

import { MapPin } from "lucide-react";
import React from "react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";

const Google_address_Search = ({ selectedAddress, setCoordinates }) => {
  const api_key = process.env.GOOGLE_PLACE_MAP_API_KEY;
  return (
    <div className="flex items-center w-full ">
      <MapPin className="h-10 w-10 p-2 rounded-l-lg text-primary bg-purple-200" />
      <GooglePlacesAutocomplete
        apiKey={api_key}
        selectProps={{
          placeholder: "Search Property Address",
          isClearable: true,
          className: "w-full",
          onChange: (place) => {
            selectedAddress(place);
            geocodeByAddress(place?.label)
              .then((result) => getLatLng(result[0]))
              .then(({ lat, lng }) => {
                setCoordinates({ lat, lng });
              });
          },
        }}
      />
    </div>
  );
};

export default Google_address_Search;
