import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import VehicleCard from "@/components/app/VehicleCard";
import { fetchVehicles } from "@/fetchData";
import { Link } from "react-router-dom";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
// } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

export interface VehicleProps {
  ImageUrls?: string[];
  make: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
  isAvailable: string;
  model: string;
  price: number;
  year: string;
  __v?: number;
  _id: string;
  ownerId: string;
}
function Home(): JSX.Element {
  // const [currentData, setCurrentData] = useState<VehicleProps[]>([]);
  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredVehicle, setFilteredVehicle] = useState<string>("");

  const {
    data: vehicles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vehiclesData"],
    queryFn: () => fetchVehicles(),
    staleTime: Infinity,
  });

  // useEffect(() => {
  //   if (vehicles) {
  //     if (selectedCategory) {
  //       const filteredData = vehicles.filter(
  //         (vehicle: VehicleProps) => vehicle.category === selectedCategory,
  //       );
  //       setCurrentData(filteredData);
  //     } else {
  //       setCurrentData(vehicles);
  //     }
  //   }
  // }, [vehicles, selectedCategory]);

  // const sortedVehicles = useMemo(() => {
  //   return vehicles.sort((a: VehicleProps, b: VehicleProps) => {
  //     if (sortBy === "price") {
  //       return a.price - b.price
  //     }
  //   })
  // }, [sortBy, vehicles])

  // const sortedVehicles = useMemo(() => {
  //   return
  // }, [vehicles])

  const filteredData = useMemo(() => {
    return vehicles?.filter((vehicle: VehicleProps) => {
      return filteredVehicle
        ? vehicle.make.toLowerCase().includes(filteredVehicle.toLowerCase())
        : true;
    });
  }, [vehicles, filteredVehicle]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>; 

  const categoryClasses: string =
    "bg-gray-100 rounded-full px-4 py-1 hover:cursor-pointer";

  return (
    <main className="flex flex-col w-full font-poppins overflow-x-hidden p-4">
      <div className="flex flex-col h-52 justify-center items-center">
        <div className="text-3xl sm:text-6xl flex sm:gap-3 flex-col justify-center items-center font-bold hero-text-gradient h-full">
          <p>Your Trusted Vehicle</p>
          <p>Rental Platform</p>
        </div>
      </div>
      {/* <form className="flex w-full justify-center font-inter">
        <div className="border pl-3  items-center rounded-full flex gap-3">
          <div className=" ">
            <input
              type="text"
              className="focus:outline-none"
              placeholder="Location"
            />
          </div>
          <div className="flex justify-center items-center text-2xl text-white">
            <button className="rounded-full p-2 bg-red-500">
              <CiSearch />
            </button>
          </div>
        </div>
      </form> */}
      <div className="my-10 flex w-full justify-center">
        <div className="inline-flex overflow-x-auto hide-scrollbar  p-2 rounded-full space-x-3">
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
      <div className="border-b" />
      <div className="mt-4 p-3 flex sm:flex-row items-center justify-between">
        <div className="flex justify-between mt-3 sm:mt-0 space-x-4 w-full">
          <p className="font-bold text-zinc-700 text-base sm:text-2xl flex items-center">
            Available Vehicles
          </p>
          <div className="flex ">
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  Sort by:
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-16 border">
                <DropdownMenuRadioGroup className="font-inter ">
                  <DropdownMenuRadioItem value="price">
                    Price
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="rating">Rating</DropdownMenuRadioItem> 
                  <DropdownMenuRadioItem value="make">Make</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu> */}
            <Input
              placeholder="Search"
              className="max-w-36 sm:max-w-52"
              value={filteredVehicle}
              onChange={(e) => setFilteredVehicle(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-4 w-full mt-10 rounded-t-lg h-auto">
        {filteredData.map((vehicle: VehicleProps) => {
          return (
            <Link to={`/rent/vehicle/${vehicle._id}`} key={vehicle._id}>
              <VehicleCard vehicle={vehicle} />
            </Link>
          );
        })}
      </div>
    </main>
  );
}

export default Home;
