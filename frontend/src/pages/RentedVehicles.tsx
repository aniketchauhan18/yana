import { useQuery } from "@tanstack/react-query";
import { fetchRentedVehicles } from "@/fetchData";
import { useParams } from "react-router-dom";
import { VehicleProps } from "./Home";
import { Button } from "@/components/ui/button";

interface RentedVehicleProps {
  endDate: string;
  startDate: string;
  vehicleId: VehicleProps;
  _id: string;
}

function RentedVehicles() {
  const { id } = useParams<string>();
  const {
    data: rentedVehicles,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user-rentedVehicles", id],
    queryFn: () => fetchRentedVehicles(id as string),
    staleTime: Infinity,
    enabled: !!id,
  });

  if (isLoading) return <div>Load kr rha hu biduu</div>;
  if (error) return <div>Error aa gya re biduu</div>;
  console.log(rentedVehicles);

  return (
    <main className="p-6 text-zinc-700">
      <div className="mb-2">
        <h1 className="text-2xl font-semibold">Your rented vehicles</h1>
      </div>
      <div className="border-b mb-3" />
      <div className="grid lg:grid-cols-2 gap-3">
        {rentedVehicles.map((vehicle: RentedVehicleProps) => {
          return (
            <div
              key={vehicle.vehicleId._id}
              className="p-3 flex flex-col border rounded bg-zinc-50"
            >
              <p className="text-lg">
                {vehicle.vehicleId.make} ({vehicle.vehicleId.model})
              </p>
              <p className="text-base font-normal">{vehicle.vehicleId.year}</p>
              <p className="">Time remaining: 2 days</p>
              <div className="flex justify-end">
                <Button className="max-w-sm bg-orange-600 hover:bg-orange-500 text-sm px-2 py-0.5">
                  See details
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default RentedVehicles;
