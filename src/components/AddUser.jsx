import React, { useEffect, useState } from "react";
import { db } from "../firebaseconfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

function AddUser() {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState("");

  // Fetch data initially
  useEffect(() => {
    getData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  // Add or update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!editId) {
        const newDoc = await addDoc(collection(db, "user"), user);
        setData((prev) => [...prev, { id: newDoc.id, ...user }]);
      } else {
        await updateDoc(doc(db, "user", editId), user);
        setData((prev) =>
          prev.map((item) =>
            item.id === editId ? { id: editId, ...user } : item
          )
        );
        setEditId("");
      }
      setUser({});
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  // Fetch all users
  const getData = async () => {
    try {
      const res = await getDocs(collection(db, "user"));
      const allData = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(allData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "user", id));
      setData((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Edit user
  const handleEdit = (user) => {
    setUser(user);
    setEditId(user.id);
  };

  return (
    <div className="container mt-5">
      {/* User Form */}
      <div className="card shadow-lg p-4 mb-4">
        <h2 className="text-center mb-4">
          {editId ? "Edit User" : "Add User"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email || ""}
              onChange={handleChange}
              className="form-control"
              id="email"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password || ""}
              onChange={handleChange}
              className="form-control"
              id="password"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className={`btn ${editId ? "btn-warning" : "btn-primary"} w-100`}
          >
            {editId ? "Update User" : "Add User"}
          </button>
        </form>
      </div>

      {/* User List */}
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h4 className="text-center mb-0">User List</h4>
        </div>
        <table className="table table-hover mb-0">
          <thead className="table-dark">
            <tr>
              <th>Email</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <button
                    onClick={() => handleEdit(user)}
                    className="btn btn-sm btn-warning me-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddUser;
