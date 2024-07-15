import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AlertProps {
  title: string;
  description: string;
  duration: number;
  onHide: () => void;
}

function AlertComponent({ title, description, duration, onHide }: AlertProps) {
  const [show, setShow] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onHide();
    }, duration);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [duration]);
  if (!show) return null;
  return (
    <div className="fixed top-5 left-50 w-10/12">
      <Alert>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </div>
  );
}

export default AlertComponent;
