import MyHeader from "../Components/MyHeader";
import { useState } from "react";

export default function AdminPage() {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users") || "[]")
  );

  const deleteRow = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const editRow = (index) => {
    const user = users[index];
    const newName = prompt("Enter new name", user.name);
    const newEmail = prompt("Enter new email", user.email);
    const newPassword = prompt("Enter new password", user.password);

    if (newName && newEmail && newPassword) {
      const updatedUsers = [...users];
      updatedUsers[index] = {
        ...user,
        name: newName,
        email: newEmail,
        password: newPassword,
      };
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  const addUser = () => {
    let name = prompt("Enter New User Name:");
    let id = +prompt("Enter New User ID:");
    let em = prompt("Enter New User Email:");
    let pass = prompt("Enter New User Password:");

    if (!name || !em || !pass || !id) {
      alert("Please fill in all fields.");
      return;
    }

    const newUser = {
      id,
      name,
      email: em,
      password: pass,
      balace: 0,
      transactions: [],
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };
  return (
    <>
      <MyHeader />
      <div className="w-full px-4 mt-5">
        <h1 className="text-3xl mb-4">System Users Info:</h1>
        <div className="overflow-x-auto">
          <div className="flex justify-end pr-5 pb-3">
            <button className="btn btn-Soft btn-success" onClick={addUser}>
              Add New User
            </button>
          </div>
          <table className="table-auto min-w-full bg-gray-800 text-white rounded-lg overflow-hidden text-center">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">User Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Password</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.id} className="border-b border-gray-600">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.id}</td>
                    <td className="px-4 py-2">{user.password}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => editRow(index)}
                        className="btn btn-primary "
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteRow(index)}
                        className="btn btn-error"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-2 text-center" colSpan="6">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
