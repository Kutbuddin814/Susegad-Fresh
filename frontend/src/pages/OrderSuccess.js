import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

const OrderSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <div className="p-10 text-center">No order found</div>;
  }

  const { orderId, items, totalAmount } = state;

  const downloadInvoice = () => {
    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(18);
    doc.text("Susegad Fresh - Invoice", 20, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Order ID: ${orderId}`, 20, y);
    y += 8;
    doc.text(`Total Amount: ₹${totalAmount}`, 20, y);
    y += 12;

    doc.text("Items:", 20, y);
    y += 8;

    items.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.name} (${item.variant}) × ${item.qty}  -  ₹${
          item.price * item.qty
        }`,
        20,
        y
      );
      y += 8;
    });

    y += 10;
    doc.text("Thank you for shopping with Susegad Fresh!", 20, y);

    doc.save(`Invoice-${orderId}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="bg-white max-w-2xl w-full rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold text-green-600 mb-4">
          🎉 Order Placed Successfully
        </h2>

        <p className="mb-2">
          <strong>Order ID:</strong> {orderId}
        </p>
        <p className="mb-4">
          <strong>Total Amount:</strong> ₹{totalAmount}
        </p>

        <h3 className="font-semibold mb-2">Items:</h3>
        <div className="space-y-1 mb-6">
          {items.map((item, i) => (
            <div key={i} className="flex justify-between">
              <span>
                {item.name} ({item.variant}) × {item.qty}
              </span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={downloadInvoice}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Download Invoice
          </button>

          <button
            onClick={() => navigate("/")}
            className="bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;
