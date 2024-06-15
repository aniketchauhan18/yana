import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import VehicleCard from "@/components/app/VehicleCard";
import { fetchVehicles } from "@/fetchData";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

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
  const [currentData, setCurrentData] = useState<VehicleProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const {
    data: vehicles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vehiclesData"],
    queryFn: () => fetchVehicles(),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (vehicles) {
      if (selectedCategory) {
        const filteredData = vehicles.filter(
          (vehicle: VehicleProps) => vehicle.category === selectedCategory,
        );
        setCurrentData(filteredData);
      } else {
        setCurrentData(vehicles);
      }
    }
  }, [vehicles, selectedCategory]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const handleCategory = (category: string) => {
    setSelectedCategory(category);
  };
  console.log(1);

  return (
    <main className="flex flex-col w-full font-poppins overflow-x-hidden">
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
            className="bg-gray-100 rounded-full px-4 py-1"
            onClick={() => handleCategory("Car")}
          >
            Car
          </div>
          <div
            className="bg-gray-100 rounded-full px-4 py-1"
            onClick={() => handleCategory("Truck")}
          >
            Truck
          </div>
          <div
            className="bg-gray-100 rounded-full px-4 py-1"
            onClick={() => handleCategory("Motorcycle")}
          >
            Motorcycle
          </div>
          <div
            className="bg-gray-100 rounded-full px-4 py-1"
            onClick={() => handleCategory("Bus")}
          >
            Bus
          </div>
          <div
            className="bg-gray-100 rounded-full px-4 py-1"
            onClick={() => handleCategory("Van")}
          >
            Van
          </div>
          <div
            className="bg-gray-100 rounded-full px-4 py-1"
            onClick={() => handleCategory("Suv")}
          >
            Suv
          </div>
          <div
            className="bg-gray-100 rounded-full px-4 py-1"
            onClick={() => handleCategory("Bike")}
          >
            Bike
          </div>
          <div
            className="bg-gray-100 rounded-full px-4 py-1"
            onClick={() => handleCategory("Bicycle")}
          >
            Bicycle
          </div>
          <div
            className="bg-gray-100 rounded-full px-4 py-1"
            onClick={() => handleCategory("Other")}
          >
            Other
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-4 w-full mt-10 rounded-t-lg h-auto p-3">
        {currentData.map((vehicle: VehicleProps) => {
          return (
            <Link to={"/"} key={vehicle._id}>
              <VehicleCard vehicle={vehicle} />
            </Link>
          );
        })}
      </div>
    </main>
  );
}

export default Home;
