import React, { useState } from "react";
import { FiScissors, FiPlus, FiTrash2 } from "react-icons/fi";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";

const ServicesTab = ({ services, loading }) => {
  const [newService, setNewService] = useState({
    title: "",
    price: "",
    description: "",
    duration: 30,
  });
  

  const addService = async () => {
    if (!newService.title || !newService.price) return;
    try {
      await addDoc(collection(db, "services"), {
        title: newService.title,
        price: parseFloat(newService.price),
        description: newService.description,
        duration: parseInt(newService.duration),
        createdAt: new Date().toISOString(),
      });
      setNewService({ title: "", price: "", description: "", duration: 30 });
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  const deleteService = async (id) => {
    try {
      await deleteDoc(doc(db, "services", id));
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <FiScissors className="mr-2" /> Services
        </h2>
        <div className="text-sm text-white font-medium">
          {services.length} service{services.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Add New Service</h3>
        <div className="grid text-blue-950 grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Title
            </label>
            <input
              value={newService.title}
              onChange={(e) =>
                setNewService({ ...newService, title: e.target.value })
              }
              placeholder="Hot Towel Shave"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (Kes )
            </label>
            <input
              type="number"
              value={newService.price}
              onChange={(e) =>
                setNewService({ ...newService, price: e.target.value })
              }
              placeholder="40.00"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={newService.duration}
              onChange={(e) =>
                setNewService({
                  ...newService,
                  duration: e.target.value,
                })
              }
              placeholder="30"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={newService.description}
            onChange={(e) =>
              setNewService({
                ...newService,
                description: e.target.value,
              })
            }
            placeholder="Service description..."
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-blue-950"
          />
        </div>
        <button
          onClick={addService}
          className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-900 flex items-center shadow"
        >
          <FiPlus className="mr-2" /> Add Service
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : services.length === 0 ? (
        <div className="bg-blue-950 rounded-lg shadow p-6 text-center">
          <p className="text-white font-medium">No services found</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-12 p-4 font-bold text-blue-950 text-sm uppercase tracking-wider border-b border-blue-100 bg-blue-50">
            <div className="col-span-4">Service</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Duration</div>
            <div className="col-span-3">Description</div>
            <div className="col-span-1">Actions</div>
          </div>

          {services.map((service, idx) => (
            <div
              key={service.id}
              className={`grid grid-cols-12 p-4 border-b border-blue-50 ${
                idx % 2 === 0 ? "bg-white" : "bg-blue-50"
              } hover:bg-blue-100 transition`}
            >
              <div className="col-span-4 font-semibold text-blue-950">
                {service.title}
              </div>
              <div className="col-span-2 text-blue-700">
                Kes {service.price}
              </div>
              <div className="col-span-2 text-blue-700">
                {service.duration} min
              </div>
              <div className="col-span-3 text-sm text-blue-700 truncate">
                {service.description}
              </div>
              <div className="col-span-1 flex justify-end">
                <button
                  onClick={() => deleteService(service.id)}
                  className="p-1 text-red-600 hover:text-red-800 bg-white rounded shadow"
                  title="Delete service"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesTab;