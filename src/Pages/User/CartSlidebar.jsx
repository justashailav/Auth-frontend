import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  updateCartItem,
  removeCartItem,
} from "../../store/slices/cartSlice";

const CartSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { cartItems, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    if (isOpen) {
      dispatch(getCart());
    }
  }, [dispatch, isOpen]);

  const increaseQty = (item) => {
    dispatch(updateCartItem(item.product, item.quantity + 1));
  };

  const decreaseQty = (item) => {
    if (item.quantity > 1) {
      dispatch(updateCartItem(item.product, item.quantity - 1));
    }
  };

  const removeItem = (productId) => {
    dispatch(removeCartItem(productId));
  };

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
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose} className="text-xl">✕</button>
        </div>

        {/* CART ITEMS */}
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-140px)]">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : cartItems.length === 0 ? (
            <p className="text-gray-500 text-center">Cart is empty</p>
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

                  {/* QUANTITY CONTROLS */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decreaseQty(item)}
                      className="px-2 py-1 border rounded text-sm"
                    >
                      −
                    </button>

                    <span className="text-sm font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item)}
                      className="px-2 py-1 border rounded text-sm"
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeItem(item.product)}
                  className="text-red-500 text-sm"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t">
          <button
            className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
            disabled={cartItems.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
