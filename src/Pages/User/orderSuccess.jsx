import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function OrderSuccess() {
  const navigate = useNavigate();

  const { currentOrder } = useSelector((state) => state.order);

  useEffect(() => {
    if (!currentOrder) {
      navigate("/");
    }
  }, [currentOrder, navigate]);

  if (!currentOrder) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 text-center space-y-4">
        {/* SUCCESS ICON */}
        <div className="text-green-600 text-5xl">✔</div>

        <h1 className="text-2xl font-bold">Order Placed Successfully</h1>

        <p className="text-gray-600">
          Thank you for your order! Your order has been placed successfully.
        </p>

        {/* ORDER INFO */}
        <div className="border rounded p-3 text-left space-y-1 text-sm">
          <p>
            <span className="font-medium">Order ID:</span>{" "}
            {currentOrder._id}
          </p>
          <p>
            <span className="font-medium">Payment Method:</span>{" "}
            {currentOrder.paymentMethod}
          </p>
          <p>
            <span className="font-medium">Payment Status:</span>{" "}
            {currentOrder.paymentStatus}
          </p>
          <p>
            <span className="font-medium">Total Amount:</span> ₹
            {currentOrder.totalAmount}
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/orders")}
            className="flex-1 bg-black text-white py-2 rounded"
          >
            View Orders
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex-1 border py-2 rounded"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
