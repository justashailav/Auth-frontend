import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, deleteAddress, getAddresses, updateAddress } from "../../store/slices/addressSlice";


const Address = () => {
  const dispatch = useDispatch();
  const { addresses, selectedAddress, loading } = useSelector(
    (state) => state.address
  );

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    addressLine: "",
    city: "",
    state: "",
    landmark: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(getAddresses());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (editId) {
      dispatch(updateAddress(editId, form));
    } else {
      dispatch(addAddress(form));
    }

    // reset form
    setForm({
      fullName: "",
      phone: "",
      pincode: "",
      addressLine: "",
      city: "",
      state: "",
      landmark: "",
    });
    setEditId(null);
  };

  const handleEdit = (addr) => {
    setEditId(addr._id);
    setForm({
      fullName: addr.fullName,
      phone: addr.phone,
      pincode: addr.pincode,
      addressLine: addr.addressLine,
      city: addr.city,
      state: addr.state,
      landmark: addr.landmark || "",
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* ===== ADDRESS FORM ===== */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">
          {editId ? "Edit Address" : "Add Address"}
        </h2>

        <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" className="input" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="input" />
          <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" className="input" />
          <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="input" />
          <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="input" />

          <textarea
            name="addressLine"
            value={form.addressLine}
            onChange={handleChange}
            placeholder="Address"
            className="input md:col-span-2"
          />

          <input
            name="landmark"
            value={form.landmark}
            onChange={handleChange}
            placeholder="Landmark (optional)"
            className="input md:col-span-2"
          />

          <button className="md:col-span-2 bg-black text-white py-2 rounded">
            {editId ? "Update Address" : "Save Address"}
          </button>
        </form>
      </div>

      {/* ===== ADDRESS LIST ===== */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Saved Addresses</h2>

        {loading && <p>Loading...</p>}

        {addresses.length === 0 && (
          <p className="text-gray-500">No address added yet</p>
        )}

        {addresses.map((addr) => (
          <div
            key={addr._id}
            onClick={() => dispatch(selectAddress(addr))}
            className={`border p-3 rounded cursor-pointer ${
              selectedAddress?._id === addr._id
                ? "border-black bg-gray-50"
                : ""
            }`}
          >
            <p className="font-medium">{addr.fullName}</p>
            <p className="text-sm text-gray-600">
              {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
            </p>
            <p className="text-sm">{addr.phone}</p>

            <div className="flex gap-4 mt-2 text-sm">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(addr);
                }}
                className="text-blue-600"
              >
                Edit
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(deleteAddress(addr._id));
                }}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Address;
