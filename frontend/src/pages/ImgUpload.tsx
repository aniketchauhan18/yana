import * as React from "react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TfiClose } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";

interface Modal {
  closeModal: () => void;
}

function ImgUpload({ closeModal }: Modal): JSX.Element {
  const navigateTo = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal(); // Call the onClose function passed as prop to close the modal
        navigateTo("/host/dashboard");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [closeModal, navigateTo]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData);
    try {
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=0b8069b8af5f3ad1624ee31e47f7c097",
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 w-full bg-zinc-900/10 bg-opacity-75 p-4 z-50 font-poppins flex justify-center flex-col items-center">
      <div
        className="p-3 bg-white border flex flex-col items-center space-y-3 rounded-lg"
        ref={modalRef}
      >
        <div className="flex justify-end w-full mr-3">
          <TfiClose className="text-xl" onClick={closeModal} />
        </div>
        <p className="font-medium">Upload vehicle images here</p>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <Input type="file" name="image" multiple required />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default ImgUpload;
