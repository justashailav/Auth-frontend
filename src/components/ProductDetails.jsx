import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addCart } from "../store/slices/cartSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { productList = [] } = useSelector((state) => state.products);

  const product = productList.find((p) => String(p._id) === String(id));

  if (!product) {
    return (
      <div className="mt-20 text-center text-gray-500">Product not found</div>
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
    <div className="max-w-5xl mx-auto mt-20 px-4 pb-32">
      <div className="grid md:grid-cols-2 gap-10">
        {/* LEFT : IMAGES */}
        <div>
          <div className="bg-gray-100 rounded-xl overflow-hidden mb-4">
            <img
              src={activeImage}
              alt={product.productName}
              className="w-full h-96 object-cover"
            />
          </div>

          <div className="flex gap-3">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(img)}
                className={`h-20 w-20 rounded-lg overflow-hidden border-2 transition ${
                  activeImage === img ? "border-black" : "border-transparent"
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
        </div>

        {/* RIGHT : DETAILS */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {product.productName}
          </h1>

          {/* PRICE */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-bold text-green-600">
              ₹{product.salesPrice || product.price}
            </span>

            {product.salesPrice && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  ₹{product.price}
                </span>

                <span className="text-sm font-semibold text-green-700 bg-green-100 px-2 py-1 rounded">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* STOCK */}
          <p className="mt-4 text-sm text-gray-600">
            {product.stock > 0
              ? `In stock (${product.stock} available)`
              : "Out of stock"}
          </p>

          {/* ADD TO CART BUTTON */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`mt-8 w-full py-3 rounded-lg text-white transition ${
              product.stock > 0
                ? "bg-black hover:bg-gray-800"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
