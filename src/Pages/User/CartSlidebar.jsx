import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  updateCartItem,
  removeCartItem,
} from "../../store/slices/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const CartSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { cartItems = [], loading } = useSelector((state) => state.cart);

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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* OVERLAY */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* SIDEBAR */}
          <motion.div
            className="fixed top-0 right-0 h-full w-[360px] bg-white z-50 shadow-2xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            {/* HEADER */}
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-lg font-semibold">Your Cart</h2>
              <button
                onClick={onClose}
                className="text-2xl text-gray-500 hover:text-black transition"
              >
                ✕
              </button>
            </div>

            {/* CART ITEMS */}
            <div className="flex-1 p-5 space-y-5 overflow-y-auto">
              {loading ? (
                <p className="text-center text-gray-500">
                  Loading your cart...
                </p>
              ) : cartItems.length === 0 ? (
                <div className="text-center text-gray-500 mt-20">
                  Your cart is empty
                </div>
              ) : (
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.product}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.2 }}
                      className="flex gap-4"
                    >
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-16 h-16 rounded-lg object-cover"
                      />

                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800 line-clamp-1">
                          {item.productName}
                        </p>

                        <p className="text-green-600 font-semibold mt-1">
                          ₹{item.price}
                        </p>

                        {/* QUANTITY */}
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() => decreaseQty(item)}
                            className="w-8 h-8 border rounded-lg hover:bg-gray-100 transition"
                          >
                            −
                          </button>

                          <span className="text-sm font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQty(item)}
                            disabled={item.quantity >= item.stock}
                            className="w-8 h-8 border rounded-lg hover:bg-gray-100 transition disabled:opacity-40"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.product)}
                        className="text-red-500 text-lg hover:scale-110 transition"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* FOOTER */}
            <Link to="/checkout">
              <div className="p-5 border-t">
              <button
                disabled={cartItems.length === 0}
                className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition disabled:opacity-40"
              >
                Checkout
              </button>
            </div>
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
