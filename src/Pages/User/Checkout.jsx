import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddresses } from "../../store/slices/addressSlice";
import { getCart } from "../../store/slices/cartSlice";


export default function Checkout() {
  const dispatch = useDispatch();

  const { addresses, selectedAddress } = useSelector(
    (state) => state.address
  );
  const { cartItems, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getAddresses());
    dispatch(getCart());
  }, [dispatch]);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded shadow space-y-4">
        <h2 className="text-lg font-semibold">Delivery Address</h2>

        {addresses.length === 0 && (
          <p className="text-gray-500">Please add an address</p>
        )}

        {addresses.map((addr) => (
          <div
            key={addr._id}
            onClick={() => dispatch(selectedAddress(addr))}
            className={`border p-3 rounded cursor-pointer ${
              selectedAddress?._id === addr._id
                ? "border-black bg-gray-50"
                : ""
            }`}
          >
            <p className="font-medium">{addr.fullName}</p>
            <p className="text-sm text-gray-600">
              {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
            </p>
            <p className="text-sm">{addr.phone}</p>
          </div>
        ))}
      </div>
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
