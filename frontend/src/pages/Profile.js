import { useEffect, useState } from "react";
import api from "../services/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    name: "",
    street: "",
    city: "",
    pincode: "",
    phone: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/profile");
      setUser(res.data);
      setForm({
        name: res.data.name || "",
        street: res.data.address?.street || "",
        city: res.data.address?.city || "",
        pincode: res.data.address?.pincode || "",
        phone: res.data.address?.phone || "",
      });
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  const saveProfile = async () => {
    await api.put("/users/profile", {
      name: form.name,
      address: {
        street: form.street,
        city: form.city,
        pincode: form.pincode,
        phone: form.phone,
      },
    });
    setEdit(false);
    fetchProfile();
  };

  if (!user) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-10 max-w-xl mx-auto bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      {!edit ? (
        <>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>

          <h3 className="mt-4 font-semibold">Address</h3>
          {user.address ? (
            <>
              <p>{user.address.street}</p>
              <p>{user.address.city} - {user.address.pincode}</p>
              <p>{user.address.phone}</p>
            </>
          ) : (
            <p>No address saved</p>
          )}

          <button
            onClick={() => setEdit(true)}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        </>
      ) : (
        <>
          <input
            className="border p-2 w-full mb-2"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="border p-2 w-full mb-2"
            placeholder="Street"
            value={form.street}
            onChange={(e) => setForm({ ...form, street: e.target.value })}
          />
          <input
            className="border p-2 w-full mb-2"
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
          <input
            className="border p-2 w-full mb-2"
            placeholder="Pincode"
            value={form.pincode}
            onChange={(e) => setForm({ ...form, pincode: e.target.value })}
          />
          <input
            className="border p-2 w-full mb-2"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <button
            onClick={saveProfile}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </>
      )}
    </div>
  );
}
