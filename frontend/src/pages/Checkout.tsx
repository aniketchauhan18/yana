import { jsPDF } from "jspdf";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import "jspdf-autotable";

const generatePDF = (paymentId: string, orderId: string, amount: string) => {
  const doc = new jsPDF();

  const tableData = [
    ['Payment ID', paymentId],
    ['Order ID', orderId],
    ['User ID', localStorage.getItem("yana-user")],
    ['Amount', amount],
  ];

  doc.autoTable({
    head: [['Key', 'Value']],
    body: tableData,
    startY: 30,
    styles: {
      font: 'helvetica',
      fontSize: 12,
      cellPadding: 3,
      overflow: 'linebreak',
    },
    headStyles: {
      fillColor: [220, 220, 220],
    },
  });

  // Add a title
  doc.setFontSize(14);
  doc.text('Payment Details', 10, 10);

  doc.save('payment-details.pdf');
};

function Checkout() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const paymentId = searchParams.get('paymentId');
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');

  useEffect(() => {
    if (paymentId && orderId && amount) {
      generatePDF(paymentId, orderId, amount);
    }
  }, [paymentId, orderId, amount]);

  return (
    <div>
      checkout-page
    </div>
  );
}

export default Checkout;