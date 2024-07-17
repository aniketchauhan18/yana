import { useQuery } from "@tanstack/react-query";
import { fetchFilteredVehicles } from "@/fetchData";
import { VehicleProps } from "@/pages/Home";
import { Link } from "react-router-dom";
import VehicleCard from "./VehicleCard";
import { CardsSkeleton } from "@/skeletons";

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
    queryKey: ["filtered-Vehicles", query],
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
      <div className="grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-4 w-full mt-10 rounded-t-lg h-auto">
        {vehicles.map((vehicle: VehicleProps) => {
          return (
            <Link to={`/rent/vehicle/${vehicle._id}`} key={vehicle._id}>
              <VehicleCard vehicle={vehicle} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
