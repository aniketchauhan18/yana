import { jsPDF } from "jspdf";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "jspdf-autotable";
import { UserOptions } from "jspdf-autotable";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: UserOptions) => jsPDF;
  }
}

const generatePDF = (paymentId: string, orderId: string, amount: string, make: string, model:string, user: string) => {
  const doc = new jsPDF();

  const tableData = [
    ["Payment ID", paymentId],
    ["Order ID", orderId],
    ["Paid by", user],
    ["Amount Paid", amount],
    ["Manufacturer", make],
    ["Model", model]
  ];

  doc.autoTable({
    head: [["Fields", "Details"]],
    body: tableData,
    startY: 30,
    styles: {
      font: "helvetica",
      fontSize: 12,
      cellPadding: 3,
      overflow: "linebreak",
    },
    headStyles: {
      fillColor: [220, 220, 220],
    },
  });

  // Add a title

  doc.setFontSize(14);
  doc.text("Payment Details", 10, 10);

  doc.save("payment-details.pdf");
};

function Checkout() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const paymentId = searchParams.get("paymentId");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const make = searchParams.get("make")
  const model = searchParams.get("model")
  const user = searchParams.get("user")

  useEffect(() => {
    if (paymentId && orderId && amount) {
      generatePDF(paymentId, orderId, amount, make as string, model as string, user as string);
    }
  }, []);

  //route /user/:id/rented-vehicle
  return (
    <div className="flex justify-center items-center h-[90dvh]">
      <Link
        to={`/user/${localStorage.getItem("yana-user")}/rented-vehicles`}
        className="bg-orange-500 px-2 py-2 rounded text-white"
      >
        See rented vehicles
      </Link>
    </div>
  );
}

export default Checkout;
