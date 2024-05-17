import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserForm = (props) => {
  const { selectedUser, fetchUsers } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
  });

  useEffect(() => {
    if (selectedUser) {
      setIsEdit(true);
      setForm(selectedUser);
    } else {
      setIsEdit(false);
      setForm({
        name: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, ''); 
      setForm({ ...form, [name]: numericValue });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedUser) {
        await axios.put(
          `http://localhost:3000/api/v1/user/${selectedUser._id}`,
          form
        );
        toast.success("User updated successfully");
      } else {
        await axios.post("http://localhost:3000/api/v1/user", form);
        toast.success("User added successfully");
      }
      setIsEdit(false);
      fetchUsers(); // Call fetchUsers after adding or updating a user
      setForm({
        name: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
      });
    } catch (error) {
      if (error?.response && error?.response?.status === 500) {
        if (error.response.data.includes("duplicate key error collection")) {
          toast.error("Use diffrent email or phone");
        } else {
          toast.error("An internal server error occurred.");
        }
      } else {
        toast.error("Failed to save user.");
      }
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="tel"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone"
        pattern="[0-9]*"
        minLength={10}
        maxLength={10}
        required
      />

      <input
        type="date"
        name="dob"
        value={form.dob}
        onChange={handleChange}
        required
      />
      <select
        name="gender"
        value={form.gender}
        onChange={handleChange}
        required
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <button type="submit">{isEdit ? "Update" : "Add"}</button>
    </form>
  );
};

export default UserForm;
