import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bath, BedDouble, CarFront } from "lucide-react";

const FilterSection = ({
  setBathCount,
  setBedCount,
  setParkingCount,
  setHomeType,
}) => {
  return (
    <div className="px-3 py-2 flex flex-col xs:grid xs:grid-cols-2 md:grid-cols-2 lg:flex lg:flex-row gap-2">
      <Select onValueChange={setBedCount}>
        <SelectTrigger className="w-full xs:w-[180px]">
          <SelectValue placeholder="Bed" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">
            <h2 className="flex gap-2">
              <BedDouble className="w-5 h-5 text-primary" /> 1+
            </h2>
          </SelectItem>
          <SelectItem value="2">
            <h2 className="flex gap-2">
              <BedDouble className="w-5 h-5 text-primary" /> 2+
            </h2>
          </SelectItem>
          <SelectItem value="3">
            <h2 className="flex gap-2">
              <BedDouble className="w-5 h-5 text-primary" /> 3+
            </h2>
          </SelectItem>
          <SelectItem value="4">
            <h2 className="flex gap-2">
              <BedDouble className="w-5 h-5 text-primary" /> 4+
            </h2>
          </SelectItem>
          <SelectItem value="5">
            <h2 className="flex gap-2">
              <BedDouble className="w-5 h-5 text-primary" /> 5+
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setBathCount}>
        <SelectTrigger className="w-full xs:w-[180px]">
          <SelectValue placeholder="Bath" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">
            <h2 className="flex gap-2">
              <Bath className="w-5 h-5 text-primary" /> 1+
            </h2>
          </SelectItem>
          <SelectItem value="2">
            <h2 className="flex gap-2">
              <Bath className="w-5 h-5 text-primary" /> 2+
            </h2>
          </SelectItem>
          <SelectItem value="3">
            <h2 className="flex gap-2">
              <Bath className="w-5 h-5 text-primary" /> 3+
            </h2>
          </SelectItem>
          <SelectItem value="4">
            <h2 className="flex gap-2">
              <Bath className="w-5 h-5 text-primary" /> 4+
            </h2>
          </SelectItem>
          <SelectItem value="5">
            <h2 className="flex gap-2">
              <Bath className="w-5 h-5 text-primary" /> 5+
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setParkingCount}>
        <SelectTrigger className="w-full xs:w-[180px]">
          <SelectValue placeholder="Parking" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="1">
            <h2 className="flex gap-2">
              <CarFront className="w-5 h-5 text-primary" /> 1+
            </h2>
          </SelectItem>
          <SelectItem value="2">
            <h2 className="flex gap-2">
              <CarFront className="w-5 h-5 text-primary" /> 2+
            </h2>
          </SelectItem>
          <SelectItem value="3">
            <h2 className="flex gap-2">
              <CarFront className="w-5 h-5 text-primary" /> 3+
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) =>
          value == "All" ? setHomeType(null) : setHomeType(value)
        }
      >
        <SelectTrigger className="w-full xs:w-[180px]">
          <SelectValue placeholder="Home Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="Single Family Home">Single Family Home</SelectItem>
          <SelectItem value="Town House">Town House</SelectItem>{" "}
          <SelectItem value="Condo">Condo</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterSection;
