import { VehicleData } from "@/pages/Home";

function VehicleCard({ vehicle }: { vehicle: VehicleData }) {
  return (
    <div className="flex font-poppins text-zinc-700 min-h-auto min-w-[300px] max-h-96 max-w-96 justify-center p-2 rounded ">
      <div className="w-full flex flex-col p-2 rounded-lg border hover:cursor-pointer">
        <div className="min-h-36 bg-zinc-200 rounded-lg"></div>
        <p className="text-lg ">{vehicle.make}</p>
        <div className="flex text-zinc-500 justify-between text-base">
          <p>{vehicle.model}</p>
          <p>${vehicle.price}</p>
        </div>
      </div>
    </div>
  );
}

export default VehicleCard;
