import React from "react";
import {
  FiCalendar,
  FiCheck,
  FiTrash2,
  FiClock,
  FiUser,
  FiScissors,
} from "react-icons/fi";

const AppointmentsTab = ({
  appointments,
  services,
  barbers,
  users,
  loading,
}) => {
  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleStatusUpdate = (appointmentId, newStatus) => {
    // TODO: Implement status update logic
    console.log(`Updating appointment ${appointmentId} to ${newStatus}`);
  };

  const handleDelete = (appointmentId) => {
    // TODO: Implement delete logic
    console.log(`Deleting appointment ${appointmentId}`);
  };

  const statusOptions = [
    {
      value: "pending",
      label: "Pending",
      color: "bg-yellow-100 text-yellow-800",
      icon: <FiClock className="mr-1" />,
    },
    {
      value: "confirmed",
      label: "Confirmed",
      color: "bg-blue-100 text-blue-800",
      icon: <FiCheck className="mr-1" />,
    },
    {
      value: "completed",
      label: "Completed",
      color: "bg-green-100 text-green-800",
      icon: <FiCheck className="mr-1" />,
    },
    {
      value: "cancelled",
      label: "Cancelled",
      color: "bg-red-100 text-red-800",
      icon: <FiTrash2 className="mr-1" />,
    },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center text-blue-950">
          <FiCalendar className="mr-2" /> Appointments
        </h2>
        <div className="text-sm bg-blue-950 text-white font-medium px-3 py-1 rounded-full">
          {appointments.length} appointment
          {appointments.length !== 1 ? "s" : ""}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : appointments.length === 0 ? (
        <div className="bg-blue-50 rounded-lg shadow p-6 text-center border border-blue-100">
          <p className="text-blue-900 font-medium">No appointments found</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
          <div className="grid grid-cols-12 p-4 font-bold text-blue-950 text-sm uppercase tracking-wider border-b border-blue-100 bg-blue-50">
            <div className="col-span-3">Service Details</div>
            <div className="col-span-2">Client</div>
            <div className="col-span-2">Barber</div>
            <div className="col-span-2">When</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-2">Actions</div>
          </div>

          {appointments.map((appointment) => {
            const service = services.find(
              (s) => s.id === appointment.serviceId
            );
            const barber = barbers.find((b) => b.id === appointment.barberId);
            const user = users.find((u) => u.id === appointment.userId);
            const currentStatus = statusOptions.find(
              (s) => s.value === appointment.status
            );

            return (
              <div
                key={appointment.id}
                className={`grid grid-cols-12 p-4 border-b border-blue-50 items-center ${
                  appointment.status === "completed"
                    ? "bg-green-50"
                    : appointment.status === "cancelled"
                    ? "bg-red-50"
                    : "hover:bg-blue-50"
                } transition-colors`}
              >
                {/* Service Details */}
                <div className="col-span-3">
                  <div className="font-semibold text-blue-950 flex items-center">
                    <FiScissors className="mr-2 text-blue-700" />
                    {service?.title ||
                      appointment?.service ||
                      "Unknown Service"}
                  </div>
                  <div className="text-xs text-blue-700 mt-1">
                    {service?.duration
                      ? `${service.duration} mins`
                      : "Duration not specified"}{" "}
                    • ${service?.price || appointment?.price || "--"}
                  </div>
                </div>

                {/* Client */}
                <div className="col-span-2">
                  <div className="text-sm text-blue-950 flex items-center">
                    <FiUser className="mr-2 text-blue-700" />
                    {user?.name || "Unknown Client"}
                  </div>
                  <div className="text-xs text-blue-700 truncate">
                    {user?.email || user?.phone || "No contact info"}
                  </div>
                </div>

                {/* Barber */}
                <div className="col-span-2">
                  <div className="text-sm text-blue-950">
                    {barber?.name || appointment?.barber || "Any Barber"}
                  </div>
                  <div className="text-xs text-blue-700">
                    {barber?.email || ""}
                  </div>
                </div>

                {/* Date & Time */}
                <div className="col-span-2">
                  <div className="text-sm font-medium text-blue-950">
                    {formatDate(appointment.date)}
                  </div>
                  <div className="text-xs text-blue-700">
                    {appointment.time}
                  </div>
                </div>

                {/* Status */}
                <div className="col-span-1">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium capitalize flex items-center ${currentStatus?.color}`}
                  >
                    {currentStatus?.icon}
                    {currentStatus?.label || appointment.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-2 flex space-x-2 justify-end">
                  {appointment.status !== "completed" && (
                    <button
                      onClick={() =>
                        handleStatusUpdate(appointment.id, "completed")
                      }
                      className="p-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center shadow"
                      title="Mark as completed"
                    >
                      <FiCheck size={16} />
                    </button>
                  )}
                  {appointment.status !== "confirmed" &&
                    appointment.status !== "completed" && (
                      <button
                        onClick={() =>
                          handleStatusUpdate(appointment.id, "confirmed")
                        }
                        className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center shadow"
                        title="Confirm appointment"
                      >
                        <FiCheck size={16} />
                      </button>
                    )}
                  {appointment.status !== "cancelled" && (
                    <button
                      onClick={() =>
                        handleStatusUpdate(appointment.id, "cancelled")
                      }
                      className="p-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center shadow"
                      title="Cancel appointment"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AppointmentsTab;
