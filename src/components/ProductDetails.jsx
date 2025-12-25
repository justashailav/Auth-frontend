import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProductDetails() {
  const { id } = useParams();

  const { productList = [] } = useSelector(
    (state) => state.products
  );

  const product = productList.find((p) => p._id === id);

  if (!product) {
    return (
      <div className="mt-20 text-center text-gray-500">
        Product not found
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-20 px-4">
      <div className="grid md:grid-cols-2 gap-10">
        {/* IMAGE */}
        <div className="bg-gray-100 rounded-xl overflow-hidden">
          <img
            src={product.image}
            alt={product.productName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {product.productName}
          </h1>

          <p className="text-green-600 text-2xl font-bold mt-4">
            ₹{product.price}
          </p>

          <p className="text-gray-600 mt-6">
            {product.description || "No description available"}
          </p>

          <button className="mt-8 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
