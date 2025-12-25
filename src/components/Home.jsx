import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../store/slices/productSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const dispatch = useDispatch();

  const { productList = [], loading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  /* -------------------- Loading Skeleton -------------------- */
  if (loading) {
    return (
      <div className="mt-16 px-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-white rounded-xl shadow p-4"
          >
            <div className="h-44 bg-gray-200 rounded-lg mb-4" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-5 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-16 px-4 max-w-7xl mx-auto">
      {/* HEADING */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-center mb-10"
      >
        Our Products
      </motion.h1>

      {/* PRODUCTS GRID */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productList.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -6 }}
            className="group"
          >
            <Link to={`/product/${product._id}`}>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-xl">
                {/* IMAGE */}
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.productName}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <span className="text-gray-400 flex items-center justify-center h-full">
                      No Image
                    </span>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                    {product.productName}
                  </h3>

                  <p className="text-green-600 font-bold text-xl mt-2">
                    ₹{product.price}
                  </p>

                  <button className="mt-4 w-full bg-black text-white py-2 rounded-lg transition-all duration-300 hover:bg-gray-900 hover:scale-[1.02]">
                    View Product
                  </button>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
