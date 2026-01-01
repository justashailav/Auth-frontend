import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function OrderDetails() {
  const { currentOrder } = useSelector((state) => state.order);

  if (!currentOrder) {
    return <Navigate to="/orders" />;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">

      <h1 className="text-2xl font-bold">Order Details</h1>

      <div className="bg-white p-4 rounded shadow">
        <p><b>Order ID:</b> {currentOrder._id}</p>
        <p><b>Status:</b> {currentOrder.orderStatus}</p>
        <p><b>Payment:</b> {currentOrder.paymentMethod} • {currentOrder.paymentStatus}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3">Items</h2>

        {currentOrder.orderItems.map((item) => (
          <div key={item.product} className="flex justify-between border-b py-3">
            <div>
              <p>{item.productName}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold">₹{item.price * item.quantity}</p>
          </div>
        ))}
      </div>

      <div className="text-right font-bold text-lg">
        Total: ₹{currentOrder.totalAmount}
      </div>

    </div>
  );
}
