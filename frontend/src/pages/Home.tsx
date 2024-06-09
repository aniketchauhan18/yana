import { CiSearch } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import { fetchVehicles } from "@/fetchData";
import VehicleCard from "@/components/app/VehicleCard";

export interface VehicleData {
  ImageUrls: string[];
  make: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  isAvailable: string;
  model: string;
  price: number;
  year: number;
  __v: number;
  _id: string;
  ownerId: string;
}
function Home(): JSX.Element {
  const {
    data: vehicles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vehiclesData"],
    queryFn: () => fetchVehicles(),
    staleTime: Infinity,
  });

  console.log(vehicles);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <main className="flex flex-col w-full font-poppins overflow-x-hidden">
      <div className="flex flex-col h-52 justify-center items-center">
        <div className="text-3xl sm:text-6xl flex sm:gap-3 flex-col justify-center items-center font-bold hero-text-gradient h-full">
          <p>Your Trusted Vehicle</p>
          <p>Rental Platform</p>
        </div>
      </div>
      <form className="flex w-full justify-center font-inter">
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
      </form>
      <div className=" grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-4 w-full mt-10 rounded-t-lg h-auto p-3">
        {vehicles.map((vehicle: VehicleData) => {
          return <VehicleCard key={vehicle._id} vehicle={vehicle} />;
        })}
      </div>
    </main>
  );
}

export default Home;
