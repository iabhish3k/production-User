import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UserList = ({
  selectUser,
  users,
  fetchUsers,
  page,
  setPage,
  totalPages,
  selectedIds,
  setSelectedIds,
  isLoading
}) => {
  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleDeleteMultiple = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/deletemultiple",
        {
          ids: selectedIds,
        }
      );
      console.log(res);
      fetchUsers(page);
      setSelectedIds([]);
      toast.success("Selected users deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSelect = (id) => {
    const updatedIds = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id];
    setSelectedIds(updatedIds);
  };

  return (
    <div>
      <button
        onClick={handleDeleteMultiple}
        disabled={selectedIds.length === 0}
      >
        Delete Selected
      </button>
      <table className="user-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                Loading....
              </td>
            </tr>
          ) : Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => toggleSelect(user._id)}
                    checked={selectedIds.includes(user._id)}
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button onClick={() => selectUser(user)}>Edit</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                No Users Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          disabled={page <= 1}
        >
          Previous
        </button>
        <span>{`Page ${page} of ${totalPages}`}</span>
        <button
          onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
