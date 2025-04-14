import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { Bath, BedDouble, MapPin, Ruler, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const UserListing = () => {
  const { user } = useUser();
  const [listing, setListing] = useState();

  const GetUserListing = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*, listingImages(url,listing_id)")
      .eq(`createdBy`, user?.primaryEmailAddress?.emailAddress);

    if (data) {
      //   console.log(data);
      setListing(data);
    }
  };

  const DeleteUserListing = async (selected_id) => {
    console.log(`Listing Deleted ${selected_id}`);

    const { error } = await supabase
      .from("listingImages")
      .delete()
      .eq("listing_id", selected_id);

    if (error) {
      console.log(error);

      toast("Error Occured During Deleting Images");
    }

    const response = await supabase
      .from("listing")
      .delete()
      .eq("id", selected_id);

    if (response?.error == null) {
      toast("Property Deleted Sucessfully");
    }

    if (response?.error != null) {
      console.log(response);
      toast("Error Occured While Deleting Property");
    }
  };

  useEffect(() => {
    user && GetUserListing();
  }, [user]);
  return (
    <div>
      <h2 className="font-bold text-2xl">Managae Your Listing</h2>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {listing &&
          listing.map((item, index) => (
            <div
              key={index}
              className="p-3 hover:border relative max-w-[300px] hover:border-primary rounded-lg "
            >
              <h2 className="bg-primary text-white absolute px-2 text-sm m-1 rounded-md p-1">
                {item.active ? "Published" : "Draft"}
              </h2>
              <Image
                src={
                  item?.listingImages[0]
                    ? item?.listingImages[0]?.url
                    : "/Image_Placeholder.png"
                }
                alt=""
                width={800}
                height={150}
                className="rounded-lg object-cover h-[170px] "
              />
              <div className="flex mt-2 flex-col gap-2 justify-center">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-xl">${item?.price}</h2>
                  <h2 className=" text-sm text-primary px-2 py-0.5 rounded-lg border border-primary">
                    {item?.propertyType}
                  </h2>
                </div>
                <h2 className="flex gap-2 text-sm text-gray-400">
                  <MapPin className="h-4 w-4" />
                  {item?.address}
                </h2>
                <div className="flex lg:flex-row flex-col gap-2 mt-2 justify-between">
                  <h2 className="flex gap-2 w-full text-sm bg-slate-200 rounded-md p-2 text-gray-500 justify-center items-center">
                    <BedDouble className="h-4 w-4" />
                    {item?.bedroom}
                  </h2>
                  <h2 className="flex gap-2 w-full text-sm bg-slate-200 rounded-md p-2 text-gray-500 justify-center items-center">
                    <Bath className="h-4 w-4" />
                    {item?.bathroom}
                  </h2>
                  <h2 className="flex gap-2 w-full text-sm bg-slate-200 rounded-md p-2 text-gray-500 justify-center items-center">
                    <Ruler className="h-4 w-4" />
                    {item?.area}
                  </h2>
                </div>
                <div className="flex  gap-2">
                  <Link
                    href={`/view-listing/` + item?.id}
                    className={" flex-grow cursor-pointer"}
                  >
                    <Button
                      size={"sm"}
                      className={" w-full"}
                      variant={"outline"}
                    >
                      View
                    </Button>
                  </Link>

                  <Link
                    href={`/edit-listing/` + item?.id}
                    className={" flex-grow cursor-pointer"}
                  >
                    <Button size={"sm"} className={" w-full"}>
                      Edit
                    </Button>
                  </Link>

                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button
                        size={"sm"}
                        variant={"destructive"}
                        className={`cursor-pointer`}
                      >
                        <Trash />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your Property and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className={"cursor-pointer"}>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => DeleteUserListing(item?.id)}
                          className={"cursor-pointer"}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserListing;
