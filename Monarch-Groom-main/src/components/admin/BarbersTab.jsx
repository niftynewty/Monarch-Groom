import React, { useState } from "react";
import { FiUsers, FiPlus, FiTrash2, FiMail, FiPhone, FiChevronDown, FiX } from "react-icons/fi";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";

const BarbersTab = ({ barbers, services, loading }) => {
  const [newBarber, setNewBarber] = useState({
    name: "",
    email: "",
    phone: "",
    services: [],
    image: "",
  });

  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const addBarber = async () => {
    if (!newBarber.name || !newBarber.email) return;
    try {
      await addDoc(collection(db, "barbers"), {
        name: newBarber.name,
        email: newBarber.email,
        phone: newBarber.phone,
        image: newBarber.image,
        bio: newBarber.bio,
        services: newBarber.services,
        ratings: [],
        averageRating: 0,
        createdAt: new Date().toISOString(),
      });
      setNewBarber({ name: "", email: "", phone: "", services: [], image: "" });
    } catch (error) {
      console.error("Error adding barber:", error);
    }
  };

  const deleteBarber = async (id) => {
    try {
      await deleteDoc(doc(db, "barbers", id));
    } catch (error) {
      console.error("Error deleting barber:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <FiUsers className="mr-2" /> Barbers
        </h2>
        <div className="text-sm text-white font-medium">
          {barbers.length} barber{barbers.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Add New Barber</h3>
        <div className="grid grid-cols-1 text-blue-900 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              value={newBarber.name}
              onChange={(e) =>
                setNewBarber({ ...newBarber, name: e.target.value })
              }
              placeholder="John Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={newBarber.email}
              onChange={(e) =>
                setNewBarber({ ...newBarber, email: e.target.value })
              }
              placeholder="john@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              value={newBarber.phone}
              onChange={(e) =>
                setNewBarber({ ...newBarber, phone: e.target.value })
              }
              placeholder="+1234567890"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              value={newBarber.image}
              onChange={(e) =>
                setNewBarber({ ...newBarber, image: e.target.value })
              }
              placeholder="Enter image URL"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Services
            </label>
            <div className="relative">
              <button
                type="button"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-blue-950 text-left flex justify-between items-center"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              >
                <span>
                  {newBarber.services?.length > 0
                    ? `${newBarber.services.length} selected`
                    : "Select services"}
                </span>
                <FiChevronDown className="h-5 w-5 text-gray-400" />
              </button>

              {isServicesOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-auto">
                  {services.map((service) => (
                    <label
                      key={service.id}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={
                          newBarber.services?.includes(service.id) || false
                        }
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setNewBarber((prev) => ({
                            ...prev,
                            services: isChecked
                              ? [...(prev.services || []), service.id]
                              : prev.services?.filter(
                                  (id) => id !== service.id
                                ) || [],
                          }));
                        }}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="ml-3 text-gray-700">
                        {service.title}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {newBarber.services?.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-1">Selected Services:</p>
                <div className="flex flex-wrap gap-2">
                  {newBarber.services.map((serviceId) => {
                    const service = services.find((s) => s.id === serviceId);
                    return service ? (
                      <span
                        key={service.id}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex items-center"
                      >
                        {service.title}
                        <button
                          type="button"
                          onClick={() => {
                            setNewBarber({
                              ...newBarber,
                              services: newBarber.services.filter(
                                (id) => id !== service.id
                              ),
                            });
                          }}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>

          {/* bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <input
              value={newBarber.bio}
              onChange={(e) =>
                setNewBarber({ ...newBarber, bio: e.target.value })
              }
              placeholder="bio"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
        <button
          onClick={addBarber}
          className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-900 flex items-center shadow"
        >
          <FiPlus className="mr-2" /> Add Barber
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : barbers.length === 0 ? (
        <div className="bg-blue-950 rounded-lg shadow p-6 text-center">
          <p className="text-white font-medium">No barbers found</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-12 p-4 font-bold text-blue-950 text-sm uppercase tracking-wider border-b border-blue-100 bg-blue-50">
            <div className="col-span-2">Image</div>
            <div className="col-span-2">Barber</div>
            <div className="col-span-2">Contact</div>
            <div className="col-span-4">Services</div>
            <div className="col-span-2">Actions</div>
          </div>

          {barbers.map((barber, idx) => {
            const barberServices = services.filter((s) =>
              barber.services?.includes(s.id)
            );

            return (
              <div
                key={barber.id}
                className={`grid grid-cols-12 p-4 border-b border-blue-50 ${
                  idx % 2 === 0 ? "bg-white" : "bg-blue-50"
                } hover:bg-blue-100 transition`}
              >
                <img
                  src={barber.image || "https://via.placeholder.com/150"}
                  alt={barber.name}
                  className="h-12 w-20 object-cover rounded col-span-2"
                />
                <div className="col-span-2">
                  <div className="font-semibold text-blue-950">
                    {barber.name}
                  </div>
                  <div className="text-sm text-blue-700">
                    Rating: {barber.averageRating || "N/A"}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-sm flex items-center text-blue-950">
                    <FiMail className="mr-2" /> {barber.email}
                  </div>
                  <div className="text-sm flex items-center text-blue-950">
                    <FiPhone className="mr-2" /> {barber.phone || "N/A"}
                  </div>
                </div>
                <div className="col-span-4">
                  {barberServices.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {barberServices.map((s) => (
                        <span
                          key={s.id}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {s.title}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-blue-700">
                      No services assigned
                    </span>
                  )}
                </div>
                <div className="col-span-2 flex justify-end space-x-2">
                  <button
                    onClick={() => deleteBarber(barber.id)}
                    className="p-1 text-red-600 hover:text-red-800 bg-white rounded shadow"
                    title="Delete barber"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BarbersTab;