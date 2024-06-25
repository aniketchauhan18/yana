import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchUserData, fetchVehicle } from "@/fetchData";
import VehicleImg from "../assets/hakon-sataoen-qyfco1nfMtg-unsplash.jpg"
import { CiUser, CiMail } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { calculateDaysBetweenDates } from "@/utils/CalculateDays";

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}


function Rent(): JSX.Element {
  const { id } = useParams<string>();
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("");


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
  console.log(vehicle)

  const checkout = async (amount: number | string) => {
    try {
      if (!startDate || !endDate) {
        alert("Please select the dates to rent the vehicle");
        return
      }
      // Fetch the key from your server
      const keyResponse = await fetch("http://localhost:3001/payments/key");
      const { key } = await keyResponse.json();
  
      // Create an order and get the order ID from your server
      const response = await fetch("http://localhost:3001/payments/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });
      const { order } = await response.json();
      
      const days = calculateDaysBetweenDates(startDate, endDate)

      const options = {
        key: key, // Enter the Key ID generated from the Dashboard
        amount: (Number(amount) * 100) * (days + 1), // Amount should be in currency subunits (e.g., paise for INR)
        currency: "INR",
        name: "Yana",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id, // Use the order ID obtained from the response
        callback_url: "http://localhost:5173/payments/verification",
        prefill: {
          name: owner.username,
          email: owner.email,
          contact: owner.number
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#3399cc"
        },
        handler: async function (response: RazorpayResponse) {
          console.log("Payment Successful!");
          console.log("Payment ID: ", response.razorpay_payment_id);
          console.log("Order ID: ", response.razorpay_order_id);
          console.log("Signature: ", response.razorpay_signature);
          const sendResponse = await fetch(`http://localhost:3001/vehicles/update/${vehicle?._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("yana-token")}`,
            },
            body: JSON.stringify({ isAvailable: "No", startDate, endDate, bookedBy: localStorage.getItem("yana-user") }),
          })
          const sendResponseData = await sendResponse.json()
          console.log(sendResponseData)
        }
      };
  
      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (err) {
      console.error("Error in checkout process:", err);
    }
  };
  
  console.log(startDate, endDate)

  return (
    <main className="p-6 text-zinc-700  flex items-center w-full mb-24">
      <div className="grid lg:grid-cols-2 space-y-10 w-full space-x-4">
        <div className="flex justify-center items-center flex-col w-full">
          <div className="flex justify-center items-center w-full flex-col space-y-3">
            <img src={VehicleImg} className="max-w-xl rounded-xl w-full"/>
            <div className="grid  p-3 w-full max-w-sm sm:max-w-xl rounded-md bg-zinc-100/40">
              <h1 className="text-3xl font-bold">{vehicle?.make}</h1>
              <p className="text-xl text-zinc-500">{vehicle?.model} </p>
              <p className="text-xl text-zinc-500">${vehicle?.price} / day</p>
              <p className="text-xl text-zinc-500">Availablity : {vehicle?.isAvailable}</p>
            </div>
            <div className="grid border p-3 w-full max-w-sm sm:max-w-xl rounded-md bg-zinc-100/40">
              <h1 className="text-xl font-bold mb-3">Owner Information</h1>
              <div className="grid space-y-3">
                <div className="flex items-center gap-2">
                  <CiUser className=" text-xl " />
                  {owner.username.toUpperCase()}
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
          </div>
        </div>
        <div className="flex flex-col gap-10 items-center">
          <div className="grid border p-3 w-full max-w-sm sm:max-w-xl rounded-md bg-zinc-100/40 space-y-3">
            <div className="grid">
              <h1 className="text-xl font-bold">Book Your Yana Vehicle</h1>
              <h2 className="text-sm text-zinc-500">
                Select your rental dates and complete your booking.
              </h2>
            </div>
            <div>
              <Label htmlFor="start-date">Start Date</Label>
              <Input type="date" id="start-date" className="max-w-[10rem]" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
            </div>
            <div>
              <Label htmlFor="end-date">End Date</Label>
              <Input type="date" id="start-date" className="max-w-[10rem]" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
            </div>
          </div>
          <div className="border-b" />
          <div className="grid border p-3 w-full max-w-sm sm:max-w-xl  rounded-md bg-zinc-100/40 space-y-3">
            <div className="grid">
              <h1 className="text-xl font-bold">Booking Now</h1>
              <h2 className="text-sm text-zinc-500">
                Review the details of your upcoming rental.
              </h2>
            </div>
            <Button onClick={() => checkout(vehicle?.price)}>Book Now</Button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Rent;
