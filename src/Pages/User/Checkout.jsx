import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../store/slices/cartSlice";
import { createOrder, verifyRazorpayPayment } from "../../store/slices/orderSlice";
import Address from "./Address";

export default function Checkout() {
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const { cartItems, loading: cartLoading } = useSelector(
    (state) => state.cart
  );
  const { selectedAddress } = useSelector(
    (state) => state.address
  );
  const { loading: orderLoading, razorpayOrder } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ================= PLACE ORDER ================= */
  const placeOrderHandler = async () => {
    if (!selectedAddress) return;

    try {
      const res = await dispatch(
        createOrder({
          addressId: selectedAddress._id,
          paymentMethod,
        })
      );

      // ================= COD =================
      if (paymentMethod === "COD") {
        alert("Order placed successfully (COD)");
        return;
      }

      // ================= RAZORPAY =================
      if (paymentMethod === "RAZORPAY") {
        openRazorpay(res.razorpayOrder);
      }
    } catch (error) {
      console.error("Order failed", error);
    }
  };

  /* ================= RAZORPAY ================= */
  const openRazorpay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Your Store",
      description: "Order Payment",
      order_id: order.id,
      handler: function (response) {
        dispatch(
          verifyRazorpayPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          })
        );
        alert("Payment successful");
      },
      theme: { color: "#000" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 p-4">
      {/* ================= ADDRESS SECTION ================= */}
      <div>
        <Address />
      </div>

      {/* ================= CART SUMMARY ================= */}
      <div className="bg-white p-4 rounded shadow space-y-4">
        <h2 className="text-lg font-semibold">Order Summary</h2>

        {cartLoading && <p>Loading cart...</p>}

        {cartItems.length === 0 && (
          <p className="text-gray-500">Cart is empty</p>
        )}

        {cartItems.map((item) => (
          <div key={item.product} className="flex gap-3 border-b pb-3">
            <img
              src={item.image}
              alt={item.productName}
              className="w-16 h-16 rounded object-cover"
            />

            <div className="flex-1">
              <p className="font-medium">{item.productName}</p>
              <p className="text-sm text-gray-600">
                Qty: {item.quantity}
              </p>
              <p className="text-green-600 font-semibold">
                ₹{item.price * item.quantity}
              </p>
            </div>
          </div>
        ))}

        {cartItems.length > 0 && (
          <>
            {/* PAYMENT METHOD */}
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                />
                Cash on Delivery
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="RAZORPAY"
                  checked={paymentMethod === "RAZORPAY"}
                  onChange={() => setPaymentMethod("RAZORPAY")}
                />
                Pay Online (Razorpay)
              </label>
            </div>

            {/* TOTAL */}
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>

            <button
              onClick={placeOrderHandler}
              disabled={!selectedAddress || orderLoading}
              className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
            >
              {orderLoading ? "Placing Order..." : "Place Order"}
            </button>

            {!selectedAddress && (
              <p className="text-sm text-red-500 text-center">
                Please select an address
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
