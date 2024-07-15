import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BASE_URL, fetchUserData } from "@/fetchData";
import AlertComponent from "@/components/app/AlertComponent";
import { useState } from "react";

function Profile(): JSX.Element {
  // const inputClasses: string = "w-3/4"
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const navigateTo = useNavigate();
  const { id } = useParams();
  const validationSchema = z.object({
    username: z.string(),
    email: z.string(),
    dateOfBirth: z.string().optional(),
    number: z.number().optional(),
    country: z.string().optional(),
    state: z.string().optional(),
    pincode: z.number().optional(),
    address: z.string().optional(),
  });

  type FormSchema = z.infer<typeof validationSchema>;

  const {
    data: user,
    error,
    isLoading,
  } = useQuery<FormSchema>({
    queryKey: ["userData", id as string],
    queryFn: () => fetchUserData(id as string),
    staleTime: Infinity,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  console.log(user?.username);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formObj: FormSchema = {
      email: formData.get("email") as string,
      username: formData.get("username") as string,
      dateOfBirth: formData.get("dateOfBirth") as string,
      number: parseInt(formData.get("number") as string),
      country: formData.get("country") as string,
      state: formData.get("state") as string,
      pincode: Number(formData.get("pincode")),
      address: formData.get("address") as string,
    };
    const response = await fetch(`${BASE_URL}/users/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("yana-token")}`,
      },
      body: JSON.stringify(formObj),
    });
    if (response.ok) {
      setShowAlert((prev) => !prev);
    }
  };

  const inputClasses: string =
    "bg-gray-100/60 border focus:border-none rounded-lg shadow-none";
  return (
    <main className="font-inter flex items-center flex-col p-5">
      <div className="flex flex-col w-full p-4 rounded ">
        <div className="flex flex-col border-b w-full">
          <div className="flex justify-between">
            <div className="font-medium text">Settings</div>
            <button
              onClick={() => navigateTo(-1)}
              className="px-3 py-1 rounded-full text-sm border bg-zinc-50"
            >
              Back
            </button>
          </div>
          <p className="text-zinc-600 text-sm  mb-5">Manage your settings</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          {/* <div className="mt-5 border-b pb-5 w-full sm:max-w-2xl">
            <p>Profile</p>
            <p className="text-sm text-zinc-500">
              This is how others will see you !!
            </p>
          </div> */}
          <form className="mt-5 w-full sm:max-w-2xl" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  defaultValue={user?.username}
                  className={inputClasses}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="aniket@gamil.com"
                  defaultValue={user?.email}
                  className={inputClasses}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="dateOfBirth">Date Of Birth</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  defaultValue={user?.dateOfBirth}
                  className={inputClasses}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="number">Number</Label>
                <Input
                  id="number"
                  name="number"
                  placeholder="12345678"
                  type="tel"
                  defaultValue={user?.number}
                  className={inputClasses}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  placeholder="India"
                  type="text"
                  defaultValue={user?.country}
                  className={inputClasses}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  placeholder="Himachal Pradhesh"
                  type="text"
                  defaultValue={user?.state}
                  className={inputClasses}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  name="pincode"
                  placeholder="176125"
                  type="tel"
                  defaultValue={user?.pincode}
                  className={inputClasses}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  placeholder="Kuch bhi likh de bhai"
                  defaultValue={user?.address}
                  className={inputClasses}
                />
              </div>
            </div>
            <div className="w-full flex justify-center mt-5">
              <Button
                className="w-full sm:w-96 bg-gradient-to-b from-orange-500 to-orange-600 hover:from-orange-500 hover:to-orange-600 transition duration-300"
                type="submit"
              >
                Update
              </Button>
            </div>
          </form>
        </div>
      </div>
      {showAlert && (
        <AlertComponent
          title="Profile Updated"
          description="User profile has been updated"
          duration={2000}
          onHide={() => setShowAlert(false)}
        />
      )}
    </main>
  );
}
export default Profile;
