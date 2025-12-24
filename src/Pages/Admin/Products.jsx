import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../../store/slices/productSlice";

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

/* ================= MAIN COMPONENT ================= */
export default function AdminProducts() {
  const dispatch = useDispatch();
  const { loading, productList = [], error, message } = useSelector(
    (state) => state.products || {}
  );

  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    productName: "",
    price: "",
    salesPrice: "",
    stock: "",
    category: "",
    images: [],
  });

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImagesChange = (e) => {
    setForm({ ...form, images: Array.from(e.target.files) });
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      productName: product.productName,
      price: product.price,
      salesPrice: product.salesPrice,
      stock: product.stock,
      category: product.category,
      images: [],
    });
    setOpenModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", form.productName);
    formData.append("price", Number(form.price));
    formData.append("salesPrice", Number(form.salesPrice));
    formData.append("stock", Number(form.stock));
    formData.append("category", form.category);

    form.images.forEach((img) => {
      formData.append("images", img);
    });

    if (editingId) {
      dispatch(updateProduct({ id: editingId, data: formData }));
    } else {
      dispatch(addProduct(formData));
    }

    setForm({
      productName: "",
      price: "",
      salesPrice: "",
      stock: "",
      category: "",
      images: [],
    });

    setEditingId(null);
    setOpenModal(false);
  };

  /* ================= UI ================= */
  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => {
            setEditingId(null);
            setOpenModal(true);
          }}
          className="bg-[#F08C7D] text-white px-5 py-2 rounded-lg hover:bg-[#d9746a]"
        >
          + Add Product
        </button>
      </div>

      {/* MESSAGES */}
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {message && <p className="text-green-600 mb-4">{message}</p>}

      {/* PRODUCT LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productList.map((p) => (
          <div
            key={p._id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            {p.images?.length > 0 && (
              <img
                src={p.images[0]}
                alt={p.productName}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}

            <h2 className="font-semibold text-lg">{p.productName}</h2>
            <p className="text-sm text-gray-600">{p.category}</p>

            <div className="mt-2 text-sm">
              <p>Price: ₹{p.price}</p>
              <p>Sale: ₹{p.salesPrice}</p>
              <p>Stock: {p.stock}</p>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(p)}
                className="flex-1 border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-50"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                className="flex-1 border border-red-500 text-red-500 px-3 py-1 rounded hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Product" : "Add Product"}
        </h2>

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

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImagesChange}
            className="w-full"
          />

          {form.images.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {form.images.map((img, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded"
                />
              ))}
            </div>
          )}

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
