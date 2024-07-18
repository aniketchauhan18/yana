import VehicleImg from "../../assets/hakon-sataoen-qyfco1nfMtg-unsplash.jpg";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { VehicleProps } from "./Cards";

function VehicleCard({ vehicle }: { vehicle: VehicleProps }) {
  return (
    <div className="flex font-poppins text-zinc-700 min-h-auto min-w-[300px] max-h-96 max-w-96 justify-center p-2 rounded ">
      <div className="w-full flex flex-col p-2 rounded-lg shadow border">
        <div className="bg-zinc-200 rounded-lg">
          <img
            src={VehicleImg}
            height={200}
            alt="Vehicle Image"
            className="bg-center object-cover w-full h-full rounded-lg"
          />
        </div>
        <p className="text-lg ">{vehicle.make}</p>
        <div className="flex text-zinc-500 justify-between text-base">
          <p>{vehicle.model}</p>
          <p>${vehicle.price} per day</p>
        </div>
        <Link to={`/rent/vehicle/${vehicle._id}`} className="w-full">
          <Button variant="outline" className="shadow-none mt-2 w-full">
            RENT NOW
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default VehicleCard;
