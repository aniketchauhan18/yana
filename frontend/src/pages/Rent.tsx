import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserData, fetchVehicle } from "@/fetchData";
import VehicleImg from "../assets/hakon-sataoen-qyfco1nfMtg-unsplash.jpg";
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
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const navigateTo = useNavigate();

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

  const checkout = async (amount: number | string) => {
    if (!startDate || !endDate) {
      alert("Please select the dates to rent the vehicle");
      return;
    }
    const days = calculateDaysBetweenDates(startDate, endDate);
    const paymentAmount = Number(amount) * (days + 1);
    console.log(paymentAmount);
    try {
      const keyResponse = await fetch("http://localhost:3001/payments/key");
      const { key } = await keyResponse.json();
      const response = await fetch("http://localhost:3001/payments/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: paymentAmount }),
      });
      const { order } = await response.json();

      console.log(days);

      const options = {
        key: key,
        amount: paymentAmount, // Amount should be in currency subunits (e.g., paise for INR)
        currency: "INR",
        name: "Yana",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id, // Use the order ID obtained from the response
        prefill: {
          name: owner.username,
          email: owner.email,
          contact: owner.number,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
        handler: async function (response: RazorpayResponse) {
          if (
            !response.razorpay_payment_id ||
            !response.razorpay_order_id ||
            !response.razorpay_signature
          ) {
            console.error("Razorpay response is missing required properties.");
            return;
          }
          console.log("Payment Successful!");
          console.log("Payment ID: ", response.razorpay_payment_id);
          console.log("Order ID: ", response.razorpay_order_id);
          console.log("Signature: ", response.razorpay_signature);
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;
          const storePaymentResponse = await fetch(
            `http://localhost:3001/payments/store/${id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("yana-token")}`,
              },
              body: JSON.stringify({
                userId: owner?._id,
                amount: paymentAmount * 100,
                razorpayPaymentId: razorpay_payment_id,
                razorpayOrderId: razorpay_order_id,
                razorpaySignature: razorpay_signature,
                status: "Success",
              }),
            },
          );

          const paymentResponse = await storePaymentResponse.json();
          const checkoutUrl = `/payment/checkout?paymentId=${razorpay_payment_id}&orderId=${razorpay_order_id}&signature=${razorpay_signature}&amount=${paymentAmount}&make=${vehicle?.make}&model=${vehicle?.model}&user=${owner.username}`;
          console.log(paymentResponse);
          const updateVehicle = await fetch(
            `http://localhost:3001/vehicles/update/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("yana-token")}`,
              },
              body: JSON.stringify({
                isAvailable: "No",
                startDate,
                endDate,
                bookedBy: localStorage.getItem("yana-user"),
              }),
            },
          );
          const updateVehicleData = await updateVehicle.json();
          console.log(updateVehicleData);
          const addrentedVehicle = await fetch(
            `http://localhost:3001/users/add/rented-vehicles/${localStorage.getItem("yana-user")}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("yana-token")}`,
              },
              body: JSON.stringify({
                rentedVehicles: {
                  vehicleId: vehicle._id,
                  startDate: new Date(startDate),
                  endDate: new Date(endDate),
                },
              }),
            },
          );
          if (!addrentedVehicle.ok) {
            alert("error while adding vehicle");
          }
          navigateTo(checkoutUrl);
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.error("Error in checkout process:", err);
    }
  };

  return (
    <main className="p-6 text-zinc-700  flex items-center w-full mb-24">
      <div className="grid lg:grid-cols-2 space-y-10 w-full space-x-4">
        <div className="flex justify-center items-center flex-col w-full">
          <div className="flex justify-center items-center w-full flex-col space-y-3">
            <img src={VehicleImg} className="max-w-xl rounded-xl w-full" />
            <div className="grid  p-3 w-full max-w-sm sm:max-w-xl rounded-md ">
              <h1 className="text-3xl font-bold">
                {vehicle?.make} / {vehicle?.model}
              </h1>
              <p className="text-lg text-zinc-500"></p>
              <p className="text-lg text-zinc-4 00">
                ${vehicle?.price} per day
              </p>
              <p className="text-xl text-zinc-500">
                Availablity : {vehicle?.isAvailable}
              </p>
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
              <Input
                type="date"
                id="start-date"
                className="max-w-[10rem]"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="end-date">End Date</Label>
              <Input
                type="date"
                id="start-date"
                className="max-w-[10rem]"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
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
