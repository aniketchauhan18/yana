import VehicleImg from "../../assets/hakon-sataoen-qyfco1nfMtg-unsplash.jpg";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { VehicleProps } from "./VehicleCards";
import { clsx } from "clsx";

function VehicleCard({ vehicle }: { vehicle: VehicleProps }) {
  let availability;
  if (vehicle.isAvailable === "Yes") {
    availability == true;
  } else {
    availability == false;
  }

  return (
    <div className="flex text-zinc-700 min-h-auto min-w-[300px] max-h-96 max-w-96 justify-center p-2 rounded ">
      <Link
        to={`/rent/vehicle/${vehicle._id}`}
        className="w-full flex flex-col p-2 rounded-lg shadow-sm border border-zinc-100/10"
      >
        <div className="bg-zinc-200 rounded-lg">
          <img
            src={VehicleImg}
            height={200}
            alt="Vehicle Image"
            className="bg-center object-cover w-full h-full rounded-t-lg"
          />
        </div>
        <div>
          <p className="text-lg text-neutral-700">{vehicle.make}</p>
          <div className="flex text-zinc-500 justify-between text-base">
            <p>{vehicle.model}</p>
            <p>${vehicle.price} per day</p>
          </div>
          <div
            className={clsx("text-green-500", {
              "text-red-500": vehicle.isAvailable == "No",
            })}
          >
            {vehicle.isAvailable == "Yes" ? "Available" : "Not Available"}
          </div>
          <div className="w-full">
            <Button variant="outline" className="shadow-none mt-2 w-full ">
              RENT NOW
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default VehicleCard;
