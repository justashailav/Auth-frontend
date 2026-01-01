import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function OrderDetails() {
  const { currentOrder } = useSelector((state) => state.order);

  // Safety on refresh
  if (!currentOrder) {
    return <Navigate to="/orders" />;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">

      {/* ===== HEADER ===== */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-green-600">
          Order Details
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Thank you for your purchase 🎉
        </p>
      </div>

      {/* ===== ORDER INFO ===== */}
      <div className="bg-white p-5 rounded-xl shadow grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-medium">{currentOrder._id}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Order Status</p>
          <p className="font-medium text-blue-600">
            {currentOrder.orderStatus}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Payment Method</p>
          <p className="font-medium">
            {currentOrder.paymentMethod}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Payment Status</p>
          <p
            className={`font-medium ${
              currentOrder.paymentStatus === "PAID"
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            {currentOrder.paymentStatus}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Order Date</p>
          <p className="font-medium">
            {new Date(currentOrder.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* ===== DELIVERY ADDRESS ===== */}
      {currentOrder.shippingAddress && (
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Delivery Address</h2>
          <p>{currentOrder.shippingAddress.fullName}</p>
          <p>{currentOrder.shippingAddress.phone}</p>
          <p className="text-gray-600">
            {currentOrder.shippingAddress.address},{" "}
            {currentOrder.shippingAddress.city},{" "}
            {currentOrder.shippingAddress.state} -{" "}
            {currentOrder.shippingAddress.pincode}
          </p>
        </div>
      )}

      {/* ===== ORDER ITEMS ===== */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="font-semibold mb-4">Ordered Items</h2>

        <div className="space-y-4">
          {currentOrder.orderItems.map((item) => (
            <div
              key={item.product}
              className="flex gap-4 border-b pb-4 last:border-b-0"
            >
              {/* PRODUCT IMAGE */}
              <img
                src={item.image}
                alt={item.productName}
                className="w-20 h-20 rounded-lg object-cover border"
              />

              {/* PRODUCT INFO */}
              <div className="flex-1">
                <p className="font-medium">{item.productName}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
                <p className="text-sm text-gray-500">
                  Price: ₹{item.price}
                </p>
              </div>

              {/* TOTAL */}
              <p className="font-semibold">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== PRICE SUMMARY ===== */}
      <div className="bg-white p-5 rounded-xl shadow space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>₹{currentOrder.itemsPrice}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>₹{currentOrder.shippingPrice}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>₹{currentOrder.taxPrice}</span>
        </div>

        <hr />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{currentOrder.totalAmount}</span>
        </div>
      </div>
    </div>
  );
}
