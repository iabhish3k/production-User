import React, { useState, useEffect } from "react";
import "./App.css";
import UserForm from "./UserForm";
import UserList from "./UserList";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/user?page=${page}`
      );
      setUsers(res.data.data);
      setTotalPages(res.data.pagination.pages || 0);
    } catch (error) {
      console.error(error);
    }finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <ToastContainer />
      <h1>CRUD App</h1>
      <UserForm selectedUser={selectedUser} fetchUsers={fetchUsers} />
      <UserList
        selectUser={setSelectedUser}
        users={users}
        fetchUsers={fetchUsers}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        isLoading={isLoading}
      />
    </>
  );
}

export default App;
