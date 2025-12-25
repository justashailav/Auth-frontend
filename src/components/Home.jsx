import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../store/slices/productSlice";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();

  const { productList = [], loading } = useSelector(
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
    <div className="mt-10 px-3 sm:px-4 pb-24">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
        Our Products
      </h1>

      <div className="grid gap-5 sm:gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productList.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="group"
          >
            <div className="bg-white rounded-xl shadow-md group-hover:shadow-xl transition overflow-hidden">
              {/* IMAGE */}
              <div className="h-36 sm:h-48 bg-gray-100">
                <img
                  src={product.image}
                  alt={product.productName}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-3 sm:p-4">
                <h3 className="text-sm sm:text-lg font-semibold text-gray-800 line-clamp-2">
                  {product.productName}
                </h3>

                <p className="text-green-600 font-bold text-base sm:text-xl mt-1 sm:mt-2">
                  ₹{product.salesPrice || product.price}
                </p>

                {/* DESKTOP ONLY BUTTON */}
                <button className="hidden sm:block mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
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
