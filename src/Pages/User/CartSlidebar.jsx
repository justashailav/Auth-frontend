import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../store/slices/cartSlice";

const CartSidebar = ({ isOpen, onClose }) => {
  const dispatch=useDispatch()
  const { cartItems} = useSelector((state) => state.cart);
  useEffect(()=>{
    dispatch(getCart)
  },[dispatch])
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-[340px] bg-white z-50 shadow-xl
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose} className="text-xl">✕</button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-120px)]">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center">
              Cart is empty
            </p>
          ) : (
            cartItems.map((item) => (
              <div key={item.product} className="flex gap-3">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-16 h-16 rounded object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {item.productName}
                  </p>
                  <p className="text-green-600 font-semibold">
                    ₹{item.price}
                  </p>
                  <p className="text-xs text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t">
          <button className="w-full bg-black text-white py-2 rounded">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
