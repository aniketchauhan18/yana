// import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchUserData, fetchVehicle } from "@/fetchData";
import VehicleCard from "@/components/app/VehicleCard";
import { CiUser, CiMail } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function Rent(): JSX.Element {
  const { id } = useParams<string>();

  const {
    data: vehicle,
    isLoading: isVehicleLoading,
    error: vehicleError,
  } = useQuery({
    queryKey: ["vehicle", id],
    queryFn: () => fetchVehicle(id as string),
    staleTime: Infinity,
  });

  const {
    data: owner,
    isLoading: isOwnerLoading,
    error: ownerError,
  } = useQuery({
    queryKey: ["owner", vehicle?.ownerId],
    queryFn: () => fetchUserData(vehicle?.ownerId as string),
    staleTime: Infinity,
    enabled: !!vehicle?.ownerId,
  });

  if (isVehicleLoading || isOwnerLoading) return <div>Loading...</div>;
  if (vehicleError || ownerError) return <div>Error aa gya re bidu</div>;

  return (
    <main className="p-6 text-zinc-800 sm:h-screen flex items-center w-full mb-24">
      <div className="grid md:grid-cols-2 space-y-10 w-full space-x-4">
        <div className="flex justify-center items-center">
          <VehicleCard vehicle={vehicle} />
        </div>
        <div className="flex flex-col gap-10 items-center">
          <div className="grid border p-3 w-full max-w-sm sm:max-w-xl rounded-md bg-zinc-100/40">
            <h1 className="text-xl font-bold mb-3">Owner Information</h1>
            <div className="grid space-y-3">
              <div className="flex items-center gap-2">
                <CiUser className=" text-xl " />
                {owner.username.toUpperCase()}{" "}
                <span className="font-light"> ( Car Owner )</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-600">
                <IoCallOutline className=" text-xl " />
                {owner.number}
              </div>
              <div className="flex items-center gap-2 text-zinc-600">
                <CiMail className=" text-xl " />
                {owner.email}
              </div>
            </div>
          </div>
          <div className="grid border p-3 w-full max-w-sm sm:max-w-xl  rounded-md bg-zinc-100/40 space-y-3">
            <div className="grid">
              <h1 className="text-xl font-bold">Book Your Yana Vehicle</h1>
              <h2 className="text-sm text-zinc-500">
                Select your rental dates and complete your booking.
              </h2>
            </div>
            <div>
              <Label htmlFor="start-date">Start Date</Label>
              <Input type="date" id="start-date" className="max-w-[10rem]" />
            </div>
            <div>
              <Label htmlFor="end-date">End Date</Label>
              <Input type="date" id="start-date" className="max-w-[10rem]" />
            </div>
          </div>
          <div className="border-b" />
          <div className="grid border p-3 w-full max-w-sm sm:max-w-xl  rounded-md bg-zinc-100/40 space-y-3">
            <div className="grid">
              <h1 className="text-xl font-bold">Booking Summary</h1>
              <h2 className="text-sm text-zinc-500">
                Review the details of your upcoming rental.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Rent;
