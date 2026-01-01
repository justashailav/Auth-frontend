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
      <div className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-green-600">
          Order Confirmed 🎉
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Your order has been placed successfully
        </p>
      </div>

      {/* ===== ORDER INFO ===== */}
      <div className="bg-white p-6 rounded-xl shadow grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-medium break-all">{currentOrder._id}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Order Status</p>
          <p className="font-medium text-blue-600">
            {currentOrder.orderStatus}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Payment</p>
          <p className="font-medium">
            {currentOrder.paymentMethod} •{" "}
            <span
              className={
                currentOrder.paymentStatus === "PAID"
                  ? "text-green-600"
                  : "text-yellow-600"
              }
            >
              {currentOrder.paymentStatus}
            </span>
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
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Delivery Address</h2>
          <p className="font-medium">
            {currentOrder.shippingAddress.fullName}
          </p>
          <p className="text-sm text-gray-600">
            {currentOrder.shippingAddress.phone}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {currentOrder.shippingAddress.address},{" "}
            {currentOrder.shippingAddress.city},{" "}
            {currentOrder.shippingAddress.state} –{" "}
            {currentOrder.shippingAddress.pincode}
          </p>
        </div>
      )}

      {/* ===== ORDER ITEMS ===== */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold mb-4">Items in your order</h2>

        <div className="space-y-4">
          {currentOrder.orderItems.map((item) => (
            <div
              key={item.product}
              className="flex items-center gap-4 border-b pb-4 last:border-b-0"
            >
              <img
                src={item.image}
                alt={item.productName}
                className="w-20 h-20 rounded-lg object-cover border"
              />

              <div className="flex-1">
                <p className="font-medium">{item.productName}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              <p className="font-semibold">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== PRICE SUMMARY ===== */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold mb-4">Price Summary</h2>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{currentOrder.totalAmount}</span>
          </div>

          {currentOrder.discountAmount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>- ₹{currentOrder.discountAmount}</span>
            </div>
          )}
        </div>

        <hr className="my-3" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total Paid</span>
          <span className="text-green-600">
            ₹{currentOrder.totalAmount}
          </span>
        </div>
      </div>
    </div>
  );
}
