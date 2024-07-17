import { useSearchParams } from "react-router-dom";
import { Input } from "../ui/input";
import { useDebouncedCallback } from "use-debounce";
import Cards from "./Cards";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("query"));
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";

  const params = new URLSearchParams();
  const handleSearch = useDebouncedCallback((term: string) => {
    if (term) {
      params.set("query", term.trim());
    } else {
      params.delete("query");
    }
    const prevQuery = Object.fromEntries(searchParams);
    const newQuery = {
      ...prevQuery,
      query: term.trim(),
    };
    setSearchParams(newQuery);
    console.log(`parms: ${params}`);
  }, 300);

  const handleCategory = (category: string) => {
    if (category) {
      params.set("category", category.trim());
    } else {
      params.delete("category");
    }
    const prevQuery = Object.fromEntries(searchParams);
    const newQuery = {
      ...prevQuery,
      category: category.trim(),
    };
    setSearchParams(newQuery);
  };
  const categoryClasses: string =
    "bg-gray-100 rounded-full px-4 py-1 hover:cursor-pointer";

  return (
    <div className="p-4">
      <div className="flex justify-end">
        {/* <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent  onClick={() => handleCategory("Car")}>
            <SelectItem value="Car" onClick={() => handleCategory("Car")}>Car</SelectItem>
            <SelectItem value="Truck">Truck</SelectItem>
            <SelectItem value="Motorcycle">Motorycle</SelectItem>
            <SelectItem value="Bus">Bus</SelectItem>
            <SelectItem value="Van">Van</SelectItem>
            <SelectItem value="Suv">Suv</SelectItem>
            <SelectItem value="Bike">Bike</SelectItem>
            <SelectItem value="Bicycle">Bicycle</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select> */}
        <Input
          type="text"
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-xs"
          defaultValue={query}
        />
      </div>
      <div className="my-10 flex w-full justify-center">
        <div className="inline-flex overflow-x-auto hide-scrollbar p-2 rounded-full space-x-3">
          <div
            className={categoryClasses}
            onClick={() => handleCategory("Car")}
          >
            Car
          </div>
          <div
            className={categoryClasses}
            onClick={() => handleCategory("Truck")}
          >
            Truck
          </div>
          <div
            className={categoryClasses}
            onClick={() => handleCategory("Motorcycle")}
          >
            Motorcycle
          </div>
          <div
            className={categoryClasses}
            onClick={() => handleCategory("Bus")}
          >
            Bus
          </div>
          <div
            className={categoryClasses}
            onClick={() => handleCategory("Van")}
          >
            Van
          </div>
          <div
            className={categoryClasses}
            onClick={() => handleCategory("Suv")}
          >
            Suv
          </div>
          <div
            className={categoryClasses}
            onClick={() => handleCategory("Bike")}
          >
            Bike
          </div>
          <div
            className={categoryClasses}
            onClick={() => handleCategory("Bicycle")}
          >
            Bicycle
          </div>
          <div
            className={categoryClasses}
            onClick={() => handleCategory("Other")}
          >
            Other
          </div>
        </div>
      </div>
      <Cards query={query} category={category} />
    </div>
  );
}
