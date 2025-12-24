import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, getAllProducts } from "../../store/slices/productSlice";


const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[95%] max-w-md rounded-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 text-xl"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default function AdminProducts() {
  const dispatch = useDispatch();
  const { loading, productList, error, message } = useSelector(
    (state) => state.products
  );

  const [openModal, setOpenModal] = useState(false);

  const [form, setForm] = useState({
    productName: "",
    price: "",
    salesPrice: "",
    stock: "",
    category: "",
  });

  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

//   /* ---------------- CLEAR MESSAGE ---------------- */
//   useEffect(() => {
//     if (message || error) {
//       setTimeout(() => {
//         dispatch(clearMessage());
//       }, 3000);
//     }
//   }, [message, error, dispatch]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addProduct({
        productName: form.productName,
        price: Number(form.price),
        salesPrice: Number(form.salesPrice),
        stock: Number(form.stock),
        category: form.category,
      })
    );

    setForm({
      productName: "",
      price: "",
      salesPrice: "",
      stock: "",
      category: "",
    });

    setOpenModal(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => setOpenModal(true)}
          className="bg-[#F08C7D] text-white px-5 py-2 rounded-lg hover:bg-[#d9746a]"
        >
          + Add Product
        </button>
      </div>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {message && <p className="text-green-600 mb-4">{message}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productList.map((p) => (
          <div
            key={p._id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <h2 className="font-semibold text-lg">{p.productName}</h2>
            <p className="text-sm text-gray-600">{p.category}</p>

            <div className="mt-2 text-sm">
              <p>Price: ₹{p.price}</p>
              <p>Sale: ₹{p.salesPrice}</p>
              <p>Stock: {p.stock}</p>
            </div>

            <button
              onClick={() => handleDelete(p._id)}
              className="mt-4 text-red-600 text-sm hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={form.productName}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />

          <input
            type="number"
            name="salesPrice"
            placeholder="Sale Price"
            value={form.salesPrice}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="border px-5 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#F08C7D] text-white px-6 py-2 rounded"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
