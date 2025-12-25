import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addCart } from "../store/slices/cartSlice";
import { motion } from "framer-motion";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { productList = [] } = useSelector((state) => state.products);
  const product = productList.find((p) => String(p._id) === String(id));

  if (!product) {
    return (
      <div className="mt-20 text-center text-gray-500">
        Product not found
      </div>
    );
  }

  const images = [product.image, ...(product.images || [])];
  const [activeImage, setActiveImage] = useState(images[0]);

  const discount =
    product.salesPrice &&
    Math.round(((product.price - product.salesPrice) / product.price) * 100);

  const handleAddToCart = () => {
    dispatch(addCart(product));
  };

  return (
    <div className="max-w-6xl mx-auto mt-20 px-4 pb-32">
      <div className="grid md:grid-cols-2 gap-12">
        {/* LEFT : IMAGES */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gray-100 rounded-2xl overflow-hidden mb-5">
            <motion.img
              key={activeImage}
              src={activeImage}
              alt={product.productName}
              className="w-full h-[420px] object-cover"
              initial={{ opacity: 0.5, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="flex gap-3">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(img)}
                className={`h-20 w-20 rounded-xl overflow-hidden border-2 transition-all ${
                  activeImage === img
                    ? "border-black"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`thumbnail-${index}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* RIGHT : DETAILS */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            {product.productName}
          </h1>

          {/* PRICE */}
          <div className="mt-5 flex items-center gap-4">
            <span className="text-3xl font-bold text-green-600">
              ₹{product.salesPrice || product.price}
            </span>

            {product.salesPrice && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  ₹{product.price}
                </span>

                <span className="text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* STOCK */}
          <p
            className={`mt-4 text-sm font-medium ${
              product.stock > 0 ? "text-green-700" : "text-red-600"
            }`}
          >
            {product.stock > 0
              ? `In stock (${product.stock} available)`
              : "Out of stock"}
          </p>

          {/* DESCRIPTION (OPTIONAL BUT NICE) */}
          {product.description && (
            <p className="mt-6 text-gray-600 leading-relaxed">
              {product.description}
            </p>
          )}

          {/* ACTION BUTTONS */}
          <div className="mt-10 flex gap-4">
            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.02 }}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 py-3 rounded-xl text-white font-semibold transition-all ${
                product.stock > 0
                  ? "bg-black hover:bg-gray-900"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Add to Cart
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.02 }}
              disabled={product.stock === 0}
              className={`flex-1 py-3 rounded-xl font-semibold border transition-all ${
                product.stock > 0
                  ? "border-black text-black hover:bg-black hover:text-white"
                  : "border-gray-300 text-gray-400 cursor-not-allowed"
              }`}
            >
              Buy Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
