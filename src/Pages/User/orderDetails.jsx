import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function OrderDetails() {
  const { currentOrder, loading } = useSelector((state) => state.order);

  if (loading) return <p>Loading...</p>;

  // If page refresh → redirect safely
  if (!currentOrder) {
    return <Navigate to="/orders" />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">

      <div className="bg-white p-4 shadow rounded">
        <h2 className="font-bold text-lg">
          Order Placed Successfully 🎉
        </h2>
        <p className="text-sm text-gray-500">
          Order ID: {currentOrder._id}
        </p>
      </div>

      <div className="bg-white p-4 shadow rounded">
        <p>Status: <b>{currentOrder.orderStatus}</b></p>
        <p>Payment: <b>{currentOrder.paymentStatus}</b></p>
        <p>Method: <b>{currentOrder.paymentMethod}</b></p>
      </div>

      <div className="bg-white p-4 shadow rounded">
        <h3 className="font-semibold mb-2">Items</h3>

        {currentOrder.items.map((item) => (
          <div key={item._id} className="flex justify-between border-b py-2">
            <span>{item.productName} × {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 shadow rounded text-right font-bold">
        Total: ₹{currentOrder.totalAmount}
      </div>

    </div>
  );
}
