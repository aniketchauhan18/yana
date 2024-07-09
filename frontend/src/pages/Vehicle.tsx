import { BASE_URL, fetchVehicle } from "@/fetchData";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import vehicleImg from "../../src/assets/hakon-sataoen-qyfco1nfMtg-unsplash.jpg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { VehicleProps } from "./Home";
import * as React from "react";

function Vehicle(): JSX.Element {
  const navigateTo = useNavigate();
  const { id } = useParams<string>();

  if (!id) throw new Error("No id found");

  const { data, isLoading, error } = useQuery<VehicleProps>({
    queryKey: ["vehicle", id],
    queryFn: () => fetchVehicle(id),
    staleTime: Infinity,
  });

  if (isLoading) return <div>Load kr rha hai apun bidu</div>;
  if (error) return <div>Error aa gya bidu</div>;
  console.log(data);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formObj: VehicleProps = {
      make: formData.get("make") as string,
      model: formData.get("model") as string,
      price: parseInt(formData.get("price") as string),
      category: formData.get("category") as string,
      isAvailable: formData.get("isAvailable") as string,
      _id: id,
      ownerId: data?.ownerId as string,
      year: formData.get("year") as string,
    };
    console.log(formObj);
    try {
      const response = await fetch(`${BASE_URL}/vehicles/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("yana-token")}`,
        },
        body: JSON.stringify(formObj),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
      return <div>Error aa gya bhiduuu</div>;
    }
  };

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
        <div className="text-xl font-bold">
          <p>Your Vehicle</p>
        </div>
        <div className="border-b"></div>
        <div className="flex flex-col lg:flex-row justify-center mt-10 w-full p-3 gap-5">
          <div className="flex justify-center items-center lg:w-1/2">
            <img src={vehicleImg} className="w-10/12 max-w-96 rounded-lg" />
          </div>
          <div className="p-5 flex flex-col justify-center items-center text-sm gap-5 text-zinc-700 bg-white/20 font-normal lg:w-1/2">
            <form
              onSubmit={handleSubmit}
              className="border p-3 space-y-3 w-full rounded-lg max-w-2xl"
            >
              <div className="space-y-1">
                <Label>Manufacturer</Label>
                <Input
                  type="text"
                  name="make"
                  placeholder="Essay"
                  required
                  defaultValue={data?.make}
                />
              </div>
              <div className="space-y-1">
                <Label>Model</Label>
                <Input
                  type="text"
                  name="model"
                  placeholder="Salmon Bhai"
                  defaultValue={data?.model}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label>Year</Label>
                <Input type="month" name="year" defaultValue={data?.year} />
              </div>
              <div className="space-y-1">
                <Label>Category</Label>
                <Select required name="category" defaultValue={data?.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Car">Car</SelectItem>
                      <SelectItem value="Truck">Truck</SelectItem>
                      <SelectItem value="Motorcycle">Motorcycle</SelectItem>
                      <SelectItem value="Bus">Bus</SelectItem>
                      <SelectItem value="Suv">Suv</SelectItem>
                      <SelectItem value="Bike">Bike</SelectItem>
                      <SelectItem value="Bicycle">Bicycle</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Prize</Label>
                <Input
                  type="tel"
                  placeholder="Unlimited"
                  name="price"
                  required
                  defaultValue={data?.price}
                />
              </div>
              <div className="space-y-1">
                <Label>Available</Label>
                <Select
                  required
                  name="isAvailable"
                  defaultValue={data?.isAvailable}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Available" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className=" w-full max-w-3xl bg-orange-600 hover:bg-orange-500"
                >
                  Update
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Vehicle;
