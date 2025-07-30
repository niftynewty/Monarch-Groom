import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { db } from "../firebase/config";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  deleteDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [isEdit, setIsEdit] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [editingName, setEditingName] = useState("");
  const [editingPhone, setEditingPhone] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        setEditingName(u.displayName || "");
        setEditingPhone(u.phoneNumber || "");
        fetchAppointments(u.uid);
      }
    });
    return unsub;
  }, []);

  const fetchAppointments = async (uid) => {
    const q = query(collection(db, "appointments"), where("userId", "==", uid));
    const snapshot = await getDocs(q);
    setAppointments(
      snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
  };

  const cancelAppointment = async (id) => {
    await updateDoc(doc(db, "appointments", id), {
      status: "cancelled",
    });
    fetchAppointments(user.uid);
  };

  const handleUpdateProfile = async () => {
    const auth = getAuth();
    await updateProfile(auth.currentUser, {
      displayName: editingName,
      phoneNumber: editingPhone, // only works with phone auth
    });
    setIsEdit(false)

    // If you're also storing user info in Firestore:
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      displayName: editingName,
      phone: editingPhone,
    });

    alert("Profile updated.");
  };

  if (!user) return <p>Please log in to view your dashboard.</p>;

  return (
    <div className="p-6 max-w-3xl mt-40 mx-auto text-white">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Profile</h2>
          {!isEdit && (
            <button
              onClick={() => setIsEdit(true)}
              className="bg-amber-500 hover:bg-amber-400 px-4 py-2 rounded-full text-gray-900 font-medium"
            >
              Edit
            </button>
          )}
        </div>

        {isEdit && (
          <div className="bg-white/5 p-4 rounded-xl space-y-4 mb-6">
            <input
              type="text"
              placeholder="Your Name"
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 rounded text-white placeholder-white/50"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={editingPhone}
              onChange={(e) => setEditingPhone(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 rounded text-white placeholder-white/50"
            />
            <div className="flex space-x-2">
              <button
                className="bg-amber-500 hover:bg-amber-400 px-4 py-2 rounded-full text-gray-900 font-medium flex-1"
                onClick={handleUpdateProfile}
              >
                Save Profile
              </button>
              <button
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-white font-medium flex-1"
                onClick={() => setIsEdit(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) }
      </div>

      {/* divider */}
      <hr  className="my-8"/>

      <h2 className="text-2xl font-bold mb-4">Your Appointments</h2>

      {appointments.length === 0 ? (
        <div className="flex justify-between items-center">
          <p className="text-white/60">No appointments yet.</p>
          <button onClick={()=> navigate('/book')} className="bg-amber-500 hover:bg-amber-400 px-4 py-2 rounded-full text-gray-900 font-medium">
            Book now
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="bg-white/5 p-4 rounded-xl flex justify-between items-center"
            >
              <div>
                <p className="font-medium">
                  {appt.service} with {appt.barber}
                </p>
                <p className="text-sm text-white/70">
                  {appt.date} at {appt.time} —{" "}
                  <span className="italic">{appt.status}</span>
                </p>
              </div>
              {appt.status === "waiting" && (
                <button
                  onClick={() => cancelAppointment(appt.id)}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
