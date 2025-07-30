import React from "react";
import { FiUser, FiMail, FiPhone } from "react-icons/fi";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";

const UsersTab = ({ users, loading }) => {
  const updateUserRole = async (userId, role) => {
    try {
      await updateDoc(doc(db, "users", userId), { role });
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  console.log("Users in UsersTab:", users);


  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <FiUser className="mr-2" /> Users
        </h2>
        <div className="text-sm text-white font-medium">
          {users.length} user{users.length !== 1 ? "s" : ""}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : users.length === 0 ? (
        <div className="bg-blue-950 rounded-lg shadow p-6 text-center">
          <p className="text-white font-medium">No users found</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-12 p-4 font-bold text-blue-950 text-sm uppercase tracking-wider border-b border-blue-100 bg-blue-50">
            <div className="col-span-3">User</div>
            <div className="col-span-3">Contact</div>
            <div className="col-span-2">Appointments</div>
            <div className="col-span-2">Role</div>
            <div className="col-span-2">Actions</div>
          </div>

          {users.map((user, idx) => (
            <div
              key={user.id}
              className={`grid grid-cols-12 p-4 border-b border-blue-50 ${
                idx % 2 === 0 ? "bg-white" : "bg-blue-50"
              } hover:bg-blue-100 transition`}
            >
              <div className="col-span-3">
                <div className="font-semibold text-blue-950">
                  {user.fullName}
                </div>
              </div>
              <div className="col-span-3">
                <div className="text-sm flex items-center text-blue-950">
                  <FiMail className="mr-2" /> {user.email}
                </div>
                <div className="text-sm flex items-center text-blue-950">
                  <FiPhone className="mr-2" /> {user.phone || "N/A"}
                </div>
              </div>
              <div className="col-span-2">
                <div className="text-sm text-blue-700">
                  {user.appointments?.length || 0} appointment
                  {user.appointments?.length !== 1 ? "s" : ""}
                </div>
              </div>
              <div className="col-span-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                    user.role === "admin"
                      ? "bg-purple-100 text-purple-800"
                      : user.role === "barber"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {user.role || "customer"}
                </span>
              </div>
              <div className="col-span-2 flex justify-end space-x-2">
                {user.role !== "admin" && (
                  <button
                    onClick={() => updateUserRole(user.id, "admin")}
                    className="px-2 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700 shadow"
                    title="Make admin"
                  >
                    Admin
                  </button>
                )}
                {user.role !== "barber" && (
                  <button
                    onClick={() => updateUserRole(user.id, "barber")}
                    className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 shadow"
                    title="Make barber"
                  >
                    Barber
                  </button>
                )}
                {user.role !== "customer" && (
                  <button
                    onClick={() => updateUserRole(user.id, "customer")}
                    className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 shadow"
                    title="Make customer"
                  >
                    Customer
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersTab;