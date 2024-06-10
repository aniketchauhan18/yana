import { fetchVehicle } from "@/fetchData";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import vehicleImg from "../../src/assets/hakon-sataoen-qyfco1nfMtg-unsplash.jpg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Vehicle(): JSX.Element {
  const navigateTo = useNavigate();
  const { id } = useParams<string>();

  if (!id) throw new Error("No id found");

  const { data, isLoading, error } = useQuery({
    queryKey: ["vehicle", id],
    queryFn: () => fetchVehicle(id),
    staleTime: Infinity,
  });

  if (isLoading) return <div>Load kr rha hai apun bidu</div>;
  if (error) return <div>Error aa gya bidu</div>;
  console.log(data);
  return (
    <main>
      <div className="flex font-inter justify-between items-center py-3 px-3 border-b font-poppoins text-base lg:text-lg mb-10">
        <Link to="/">Yana</Link>
        <button
          onClick={() => navigateTo(-1)}
          className="px-4 py-1 rounded-full text-base border bg-zinc-50"
        >
          Back
        </button>
      </div>
      <div className="flex text-zinc-700   flex-col p-3">
        <div className="">
          <p>Your Vehicle</p>
        </div>
        <div className="border-b"></div>
        <div className="flex flex-col lg:flex-row justify-center mt-10 w-full p-3 gap-5">
          <div className="flex justify-center items-center lg:w-1/2">
            <img src={vehicleImg} className="w-10/12 max-w-96 rounded-lg" />
          </div>
          <div className="flex flex-col justify-center items-center  lg:w-1/2 ">
            <form className="flex flex-col border rounded p-3 max-w-3xl w-full space-y-4">
              <div>
                <Label>Manufacturer</Label>
                <Input />
              </div>
              <div>
                <Label>Manufacturer</Label>
                <Input />
              </div>
              <div>
                <Label>Manufacturer</Label>
                <Input />
              </div>
              <div>
                <Label>Manufacturer</Label>
                <Input />
              </div>
              <div>
                <Label>Manufacturer</Label>
                <Input />
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Vehicle;
