import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import AlertComponent from "./AlertComponent";

const templateId = import.meta.env.VITE_TEMPLATE_ID;
const serviceId = import.meta.env.VITE_SERVICE_ID;
const publicKey = import.meta.env.VITE_PUBLIC_KEY;

export default function Contact() {
  const form = useRef<HTMLFormElement | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.current) {
      emailjs.sendForm(serviceId, templateId, form.current, publicKey).then(
        (result) => {
          console.log(result.text);
          setShowAlert((prev: boolean) => !prev);
          form.current?.reset();
        },
        (error) => {
          console.log(error.text);
        },
      );
    }
  };
  const inputClasses: string =
    "bg-gray-100/60 border focus:border-none rounded-lg shadow-none";
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container max-w-4xl px-4 md:px-6">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Get in Touch
            </h2>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Have a question or feedback? Reach out to us and we'll be happy to
              assist you.
            </p>
          </div>
          <div>
            <div className="space-y-4">
              <form className="grid gap-4" ref={form} onSubmit={sendEmail}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      className={inputClasses}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className={inputClasses}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Enter your message"
                    className={`${inputClasses} min-h-[120px]`}
                  />
                </div>
                <div className="text-center">
                  <Button
                    type="submit"
                    className="w-full sm:w-96 bg-gradient-to-b from-orange-500 to-orange-600 hover:from-orange-500 hover:to-orange-600 transition duration-300 rounded-lg"
                  >
                    Send
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {showAlert && (
          <AlertComponent
            title="Feedback Submitted"
            description="Thank you for your feedback! We appreciate your input and will review it shortly."
            duration={2000}
            onHide={() => setShowAlert(false)}
          />
        )}
      </div>
    </section>
  );
}
