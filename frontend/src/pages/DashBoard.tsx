import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchUserVehicleData } from "@/fetchData";
import { VehicleProps } from "@/components/app/Cards";
import VehicleCard from "@/components/app/VehicleCard";

function DashBoard(): JSX.Element {
  const navigateTo = useNavigate();
  const userId = localStorage.getItem("yana-user") as string;

  const { data, isLoading, error } = useQuery({
    queryKey: ["user-vehicleData", userId],
    queryFn: () => fetchUserVehicleData(userId),
    staleTime: Infinity,
  });

  if (isLoading) return <div>Loading....</div>;
  if (error) return <div>Error aa gya bheeduuuu</div>;

  return (
    <main>
      <div className="flex flex-col p-2">
        <div className="flex font-inter justify-between items-center py-3 px-3 border-b font-poppoins text-base lg:text-lg">
          <Link to="/">Yana</Link>
          <button
            onClick={() => navigateTo(-1)}
            className="px-4 py-1 rounded-full text-base border bg-zinc-50"
          >
            Back
          </button>
        </div>
        <div>
          <div className="flex flex-col justify-center h-52 text-zinc-600">
            <p className="font-bold text-2xl sm:text-4xl ">
              Welcome Bidu,{" "}
              {/*{localStorage.getItem('yana-username')?.toUpperCase()}*/}
            </p>
            <p className="sm:text-xl">Apna bacha hai tu !!</p>
          </div>
          <div className="border-b"></div>
          {/* <div>
            <p className="text-2xl font-semibold text-zinc-600">Your Vehicles</p> 
          </div> */}
          <div className="grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-full mt-10 rounded-t-lg h-auto p-3">
            {data.map((vehicle: VehicleProps) => {
              return (
                <Link to={`/host/vehicle/${vehicle._id}`} key={vehicle._id}>
                  <VehicleCard vehicle={vehicle} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

export default DashBoard;
