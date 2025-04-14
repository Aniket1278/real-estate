"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Formik } from "formik";
import { useParams, usePathname, useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import FileUpload from "../_components/FileUpload";
import { Loader } from "lucide-react";
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

const EditListing = () => {
  const params = usePathname();
  const { user } = useUser();
  const router = useRouter();
  const [listing, setListing] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    // console.log(params.split("/")[2]);
    user && verifyUserRecord();
  }, [user]);

  const verifyUserRecord = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*, listingImages(listing_id,url)")
      .eq("createdBy", user?.primaryEmailAddress.emailAddress)
      .eq("id", params.split("/")[2]);

    if (data) {
      console.log(data);

      setListing(data[0]);
    }

    if (data?.length <= 0) {
      router.replace("/");
    }
  };

  const submitHandler = async (formValue) => {
    setIsLoading(true);
    formValue.active = false;
    const { data, error } = await supabase
      .from("listing")
      .update(formValue)
      .eq("id", params.split("/")[2])
      .select();

    if (data) {
      toast("Listing Saved and Updated");
      setIsLoading(false);
    }

    if (error) {
      setIsLoading(false);
    }

    for (const image of images) {
      setIsLoading(true);
      const file = image;
      const fileName = Date.now().toString();
      const fileExt = fileName.split(".").pop();
      const { data, error } = await supabase.storage
        .from("listingimages")
        .upload(`${fileName}`, file, {
          contentType: `image/${fileExt}`,
          upsert: false,
        });

      if (error) {
        toast("Error While Uploading Images");
        setIsLoading(false);
      } else {
        setIsLoading(true);
        const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL + fileName;
        const { data, error } = await supabase
          .from("listingImages")
          .insert([{ url: imageUrl, listing_id: params?.split("/")[2] }])
          .select();

        if (data) {
          setIsLoading(false);
        }

        if (error) {
          setIsLoading(false);
        }
      }
      setIsLoading(false);
    }
  };

  const publishBtnHandler = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("listing")
      .update({ active: true })
      .eq("id", params?.split("/")[2])
      .select();

    if (data) {
      setIsLoading(false);
      toast("Listing Published!");
      router.replace("/");
    }
    if (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-10 md:px-36 my-10">
      <h2 className="font-bold text-2xl">
        Enter Some More Details About Your Listing
      </h2>
      <Formik
        initialValues={{
          type: "",
          propertyType: "",
          profileImage: user?.imageUrl,
          fullName: user?.fullName,
        }}
        onSubmit={(values) => {
          console.log(values);
          submitHandler(values);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <div className="p-5 rounded-lg shadow-md flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg text-slate-500">Rent Or Sell</h2>
                    <RadioGroup
                      defaultValue={listing?.type}
                      onValueChange={(v) => (values.type = v)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Sell" id="Sell" />
                        <Label htmlFor="Sell">Sell</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Rent" id="Rent" />
                        <Label htmlFor="Rent">Rent</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg text-slate-500">Property Type</h2>
                    <Select
                      name="propertyType"
                      defaultValue={listing?.propertyType}
                      onValueChange={(e) => (values.propertyType = e)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue
                          placeholder={
                            listing?.propertyType
                              ? listing?.propertyType
                              : "Select Property Type"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single Family House">
                          Single Family House
                        </SelectItem>
                        <SelectItem value="Town House">Town House</SelectItem>
                        <SelectItem value="Condo">Condo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 outline-none">
                  <div className="flex gap-2 flex-col">
                    <h2 className="text-gray-500">Bedroom</h2>
                    <Input
                      type={"number"}
                      placeholder="Ex.2"
                      name="bedroom"
                      defaultValue={listing?.bedroom}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex gap-2 flex-col">
                    <h2 className="text-gray-500">Bathroom</h2>
                    <Input
                      type={"number"}
                      placeholder="Ex.2"
                      name="bathroom"
                      defaultValue={listing?.bathroom}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex gap-2 flex-col">
                    <h2 className="text-gray-500">Built In Year</h2>
                    <Input
                      type={"number"}
                      placeholder="Ex. 1900 Sq. ft"
                      name="builtIn"
                      defaultValue={listing?.builtIn}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 outline-none">
                  <div className="flex gap-2 flex-col">
                    <h2 className="text-gray-500">Parking</h2>
                    <Input
                      type={"number"}
                      placeholder="Ex.2"
                      name="parking"
                      defaultValue={listing?.parking}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex gap-2 flex-col">
                    <h2 className="text-gray-500">Lot Size (Sq. ft)</h2>
                    <Input
                      type={"number"}
                      placeholder=""
                      name="lotSize"
                      defaultValue={listing?.lotSize}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex gap-2 flex-col">
                    <h2 className="text-gray-500">Area (Sq. ft)</h2>
                    <Input
                      type={"number"}
                      placeholder="Ex. 1900 Sq. ft"
                      name="area"
                      defaultValue={listing?.area}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 outline-none">
                  <div className="flex gap-2 flex-col">
                    <h2 className="text-gray-500">Selling Price ($)</h2>
                    <Input
                      type={"number"}
                      placeholder="400000"
                      name="price"
                      defaultValue={listing?.price}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex gap-2 flex-col">
                    <h2 className="text-gray-500">HOA (Per Month) ($)</h2>
                    <Input
                      type={"number"}
                      placeholder="100"
                      name="hoa"
                      defaultValue={listing?.hoa}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1  gap-10 outline-none">
                  <div className="flex gap-2 flex-col">
                    <h2 className="text-gray-500">Description</h2>
                    <Textarea
                      placeholder=""
                      name="description"
                      defaultValue={listing?.description}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <h2 className="font-lg text-gray-500 my-4">
                      Upload Property Images
                    </h2>
                    <FileUpload
                      setImages={(value) => setImages(value)}
                      imageList={listing?.listingImages}
                    />
                  </div>
                </div>
                <div className="flex gap-7 justify-end">
                  <Button
                    type="submit"
                    variant={"outline"}
                    disabled={loading}
                    className={`text-primary border-primary`}
                  >
                    {loading ? <Loader className="animate-spin" /> : `Save`}
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button disabled={loading} type="button" className={``}>
                        {loading ? (
                          <Loader className="animate-spin" />
                        ) : (
                          `Save & Publish`
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Ready to Pulish?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Do You Really Want To Publish The Listing?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => publishBtnHandler()}>
                          {loading ? (
                            <Loader className="animate-spin" />
                          ) : (
                            "Continue"
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default EditListing;
