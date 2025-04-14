"use client";
import { UserButton, UserProfile } from "@clerk/nextjs";
import { Building2, DotIcon } from "lucide-react";
import React from "react";
import UserListing from "../_components/UserListing";

const User = () => {
  return (
    <div className="my-6 md:px-10 lg:px-32">
      <h2 className="font-bold text-2xl py-3">Profile</h2>
      <UserProfile>
        {/* You can pass the content as a component */}
        <UserProfile.Page
          label="My Listing"
          labelIcon={<Building2 className="w-5 h-5" />}
          url="my-listing"
        >
          <UserListing />
        </UserProfile.Page>
      </UserProfile>
    </div>
  );
};

export default User;
