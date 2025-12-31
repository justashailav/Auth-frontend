import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../store/slices/cartSlice";
import Address from "../Address/Address";

export default function Checkout() {
  const dispatch = useDispatch();

  const { cartItems, loading } = useSelector(
    (state) => state.cart
  );
  const { selectedAddress } = useSelector(
    (state) => state.address
  );

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 p-4">
      {/* ================= ADDRESS SECTION ================= */}
      <div>
        <Address />
      </div>

      {/* ================= CART SUMMARY ================= */}
      <div className="bg-white p-4 rounded shadow space-y-4">
        <h2 className="text-lg font-semibold">Order Summary</h2>

        {loading && <p>Loading cart...</p>}

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
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>

            <button
              disabled={!selectedAddress}
              className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
            >
              Place Order
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
