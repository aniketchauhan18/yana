import { useQuery } from "@tanstack/react-query";
import { fetchRentedVehicles } from "@/fetchData";
import { useParams } from "react-router-dom";
import { VehicleProps } from "@/components/app/Cards";
import { Button } from "@/components/ui/button";

function RentedVehicles() {
  const { id } = useParams<string>();
  const {
    data: rentedVehicles,
    error,
    isLoading,
  } = useQuery<VehicleProps[]>({
    queryKey: ["user-rentedVehicles", id],
    queryFn: () => fetchRentedVehicles(id as string),
    staleTime: Infinity,
    enabled: !!id,
  });

  if (isLoading) return <div>Load kr rha hu biduu</div>;
  if (error) return <div>Error aa gya re biduu</div>;

  const calculateTimeRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const difference = end.getTime() - now.getTime();

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    // const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    // const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return `${days}days ${hours}hours`;
  };

  return (
    <main className="p-6 text-zinc-700">
      <div className="mb-2">
        <h1 className="text-2xl font-semibold">Your rented vehicles</h1>
      </div>
      <div className="border-b mb-3" />
      <div className="grid lg:grid-cols-2 gap-3">
        {rentedVehicles?.map((vehicle: VehicleProps) => {
          return (
            <div
              key={vehicle._id}
              className="p-3 flex flex-col border rounded bg-zinc-50"
            >
              <p className="text-lg">
                {vehicle.make} ({vehicle.model})
              </p>
              <p className="text-base font-normal">{vehicle.category}</p>
              <p className="">
                Time remaining:{" "}
                {calculateTimeRemaining(String(vehicle?.endDate))}
              </p>
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
