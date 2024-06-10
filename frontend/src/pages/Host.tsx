import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import * as React from "react";
import ImgUpload from "./ImgUpload";

function Host(): JSX.Element {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const navigateTo = useNavigate();

  const formValidation = z.object({
    make: z.string(),
    model: z.string(),
    year: z.string(),
    price: z.number(),
    category: z.string(),
    isAvailable: z.string(),
  });

  const closeModal = () => {
    setShowModal(false);
  };

  type FormType = z.infer<typeof formValidation>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formObj: FormType = {
      make: formData.get("make") as string,
      model: formData.get("model") as string,
      year: formData.get("year") as string,
      price: parseInt(formData.get("price") as string),
      category: formData.get("category") as string,
      isAvailable: formData.get("isAvailable") as string,
    };
    console.log(formObj);
    const userId = localStorage.getItem("yana-user");

    try {
      const response = await fetch(
        `http://localhost:3001/vehicles/register/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("yana-token")}`,
          },
          body: JSON.stringify({
            ...formObj,
            ownerId: userId,
          }),
        },
      );
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("uploaded successfully");
        setShowModal(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="flex flex-col text-zinc-800 mb-10">
      <div className="flex justify-between items-center py-3 px-3 border-b font-poppoins text-base lg:text-lg">
        <Link to="/">Yana</Link>
        <button
          onClick={() => navigateTo(-1)}
          className="px-4 py-1 rounded-full text-base border bg-zinc-50"
        >
          Back
        </button>
      </div>
      <div className="flex justify-center font-inter pt-10">
        <div className="flex flex-col lg:flex-row justify-between items-center w-full px-5 lg:gap-0">
          <div className="flex flex-col items-center justify-center lg:w-1/2 lg:h-full">
            <p className="text-3xl flex pt-10  lg:text-6xl font-bold mb-5">
              Want to Rent ?
            </p>
            <div className="hidden lg:flex lg:flex-col mt-6">
              <p className="text-xl mb-3">
                Benefits of Renting Out Your Vehicle
              </p>
              <ul className="text-zinc-400 space-y-3">
                <li>Earn extra income effortlessly.</li>
                <li>Flexible rental periods to suit your schedule.</li>
                <li>
                  Comprehensive insurance coverage for your peace of mind.
                </li>
                <li>Join a trusted community of vehicle owners and renters.</li>
              </ul>
            </div>
          </div>
          <div className="flex font-inter justify-center w-full max-w-xl items-center lg:h-[80vh]  lg:w-1/2 ">
            <form
              className=" flex flex-col justify-center items-center p-5 w-full h-full"
              onSubmit={handleSubmit}
            >
              <div className=" border rounded-lg p-5 flex flex-col text-sm gap-5 text-zinc-700 bg-white/20 font-normal w-full">
                <div className="space-y-1">
                  <Label>Manufacturer</Label>
                  <Input type="text" name="make" placeholder="Essay" required />
                </div>
                <div className="space-y-1">
                  <Label>Model</Label>
                  <Input
                    type="text"
                    name="model"
                    placeholder="Salmon Bhai"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label>Year</Label>
                  <Input type="month" name="year" />
                </div>
                <div className="space-y-1">
                  <Label>Category</Label>
                  <Select required name="category">
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="car">Car</SelectItem>
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
                  />
                </div>
                <div className="space-y-1">
                  <Label>Available</Label>
                  <Select required name="isAvailable">
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
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showModal && <ImgUpload closeModal={closeModal} />}
    </main>
  );
}

export default Host;
