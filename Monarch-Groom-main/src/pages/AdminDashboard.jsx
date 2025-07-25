import React, { useEffect, useState } from "react";
import { collection,onSnapshot, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import AdminSidebar from "../components/admin/AdminSidebar";
import AppointmentsTab from "../components/admin/AppointmentsTab";
import ServicesTab from "../components/admin/ServicesTab";
import BarbersTab from "../components/admin/BarbersTab";
import UsersTab from "../components/admin/UsersTab";
import { Link } from "react-router-dom";


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Data states
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState({
    services: false,
    barbers: false,
    appointments: false,
    users: false,
  });

  // Fetch all data
  useEffect(() => {
    const unsubServices = onSnapshot(collection(db, "services"), (snapshot) => {
      setServices(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading((prev) => ({ ...prev, services: false }));
    });
  
    const unsubBarbers = onSnapshot(collection(db, "barbers"), (snapshot) => {
      setBarbers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading((prev) => ({ ...prev, barbers: false }));
    });
  
    const unsubAppointments = onSnapshot(collection(db, "appointments"), (snapshot) => {
      setAppointments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading((prev) => ({ ...prev, appointments: false }));
    });
  
    const unsubUsers = onSnapshot(collection(db, "users"), (snapshot) => {
      setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading((prev) => ({ ...prev, users: false }));
    });
  
    // Clean up on unmount
    return () => {
      unsubServices();
      unsubBarbers();
      unsubAppointments();
      unsubUsers();
    };
  }, []);

  return (
    <div className="flex h-screen  bg-blue-950">
       
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 overflow-auto bg-blue- backdrop-blur-2xl">
        <div className="p-8 max-w-6xl mx-auto">
          {activeTab === "appointments" && (
            <AppointmentsTab
              appointments={appointments}
              services={services}
              barbers={barbers}
              users={users}
              loading={loading.appointments}
            />
          )}

          {activeTab === "services" && (
            <ServicesTab
              services={services}
              loading={loading.services}
            />
          )}

          {activeTab === "barbers" && (
            <BarbersTab
              barbers={barbers}
              services={services}
              loading={loading.barbers}
            />
          )}

          {activeTab === "users" && (
            <UsersTab
              users={users}
              loading={loading.users}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;