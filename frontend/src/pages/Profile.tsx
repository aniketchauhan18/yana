import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"


function Profile(): JSX.Element {
  // const inputClasses: string = "w-3/4"

  return (
    <main className="font-inter flex items-center flex-col p-5">
      <div className="flex flex-col w-full sm:w-10/12 p-4 rounded">
          <div className="flex flex-col border-b w-full">
            <div className="font-medium text ">Settings</div>
            <p className="text-zinc-600 text-sm  mb-5">Manage your settings</p>
          </div>
          <div className="mt-5 border-b pb-5 w-full">
            <p>
              Profile
            </p>
            <p className="text-sm text-zinc-500">This is how others will see you !!</p>
          </div>
          <form className="mt-5 w-full">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" placeholder="aniket18" disabled />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" placeholder="aniket@gamil.com" disabled />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="dateOfBirth">Date Of Birth</Label>
                <Input id="dateOfBirth" name="dateOfBirth" type="date" placeholder="aniket@gamil.com" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="number">Number</Label>
                <Input id="number" name="number" placeholder="12345678" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" placeholder="India"  />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="state">State</Label>
                <Input id="state" name="state" placeholder="Himachal Pradhesh"  />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="pincode">Pincode</Label>
                <Input id="pincode" name="pincode" placeholder="Himachal Pradhesh"  />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" name="address" placeholder="Kuch bhi likh de bhai"  />
              </div>
            </div>
            <div className="w-full flex justify-center mt-5">
                <Button className=" w-full sm:w-96">
                  Save
                </Button>
            </div>
          </form>
      </div>
    </main>
  );
}

export default Profile;
