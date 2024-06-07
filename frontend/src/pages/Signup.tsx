import { useState } from "react";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  username: z.string().min(1, "Must be valid username"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormSchema = z.infer<typeof formSchema>;

interface ObjParams {
  username: string | null;
  email: string | null;
  password: string | null;
}

function Signup(): JSX.Element {
  const [error, setError] = useState<string | null>(null);
  const navigateTo = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const obj: ObjParams = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    const result = formSchema.safeParse(obj);

    if (!result.success) {
      console.error(result.error.errors);
      setError(result.error.errors[0].message);
      return;
    }

    const validatedData: FormSchema = result.data;
    try {
      const response = await fetch("http://localhost:3001/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });
      if (response.ok) navigateTo("/login");
      if (!response.ok) setError("User already exists");
      const resData = await response.json();
      console.log(resData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center font-inter items-center w-full h-screen">
      <form
        className="flex flex-col border p-4 rounded w-72 max-w-96 bg-white/30"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-3">
          <div className="flex justify-center">
            <h1 className="font-semibold text-2xl">SignUp</h1>
          </div>
          {error && (
            <Alert
              variant={"destructive"}
              className="py-0.5 border-none text-xs"
            >
              <AlertDescription className="text-xs">
                Oye {error}!!
              </AlertDescription>
            </Alert>
          )}
          <Input type="text" placeholder="Username" name="username" />
          <Input type="email" placeholder="Email" name="email" />
          <Input type="password" placeholder="Password" name="password" />
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
            Signup
          </Button>
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-600">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
