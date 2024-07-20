import { useQuery } from "@tanstack/react-query";
import { fetchFilteredVehicles } from "@/fetchData";
import VehicleCard from "./VehicleCard";
import { CardsSkeleton } from "@/skeletons";

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
  startDate?: Date;
  endDate?: Date;
}

export default function Cards({
  query,
  category,
}: {
  query: string;
  category: string;
}) {
  const {
    data: vehicles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["filtered-Vehicles", query, category],
    queryFn: () => fetchFilteredVehicles(query, category),
    staleTime: Infinity,
  });

  if (isLoading) return <CardsSkeleton />;
  if (error) return <div>Error</div>;

  console.log(vehicles);
  return (
    <div>
      {/* <div className="flex justify-end">
        <Input type="text" placeholder="Search" onChange={(e) => handleSearch(e.target.value)} className="max-w-xs"/>
      </div> */}
      {vehicles.length >= 1 ? (
        <div className="grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-4 w-full mt-10 rounded-t-lg h-auto">
          {vehicles.map((vehicle: VehicleProps) => {
            return <VehicleCard vehicle={vehicle} key={vehicle._id} />;
          })}
        </div>
      ) : (
        <div className="text-2xl flex items-center justify-center h-96">
          No vehicles Available
        </div>
      )}
    </div>
  );
}
