import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMyOrders, setCurrentOrder } from "../../store/slices/orderSlice";

export default function MyOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">My Orders</h1>

      {orders.length === 0 && (
        <p className="text-gray-500">You have not placed any orders yet.</p>
      )}

      {orders.map((order) => (
        <div
          key={order._id}
          onClick={() => {
            dispatch(setCurrentOrder(order));
            navigate("/order-details");
          }}
          className="border rounded-lg p-4 bg-white shadow-sm space-y-4 cursor-pointer hover:shadow-md transition"
        >
          {/* HEADER */}
          <div className="flex flex-wrap justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-medium">{order._id}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Payment</p>
              <p className="font-medium">
                {order.paymentMethod} • {order.paymentStatus}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium">{order.orderStatus}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="font-semibold">₹{order.totalAmount}</p>
            </div>
          </div>

          {/* ITEMS */}
          <div className="border-t pt-4 space-y-3">
            {order.orderItems.map((item) => (
              <div key={item.product} className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-16 h-16 rounded object-cover"
                />

                <div className="flex-1">
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
