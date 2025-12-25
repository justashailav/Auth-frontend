import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../store/slices/productSlice";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();

  const { productList, loading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="mt-10 text-center text-gray-500">
        Loading products...
      </div>
    );
  }

  return (
    <div className="mt-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Our Products
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productList.map((product) => (
          <Link  to={`/product/${product._id}`}>
            <div
            key={product._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
          >
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.productName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-gray-400">No Image</span>
              )}
            </div>

            {/* CONTENT */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                {product.productName}
              </h3>

              <p className="text-green-600 font-bold text-xl mt-2">
                ₹{product.price}
              </p>

              <button className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
                View Product
              </button>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
