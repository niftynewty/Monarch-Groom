import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase/config"; // adjust path
import { collection, getDocs, Timestamp, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function BookAppointment() {
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [formData, setFormData] = useState({
    service: "",
    barber: "",
    date: "",
    time: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  // Fetch services and barbers
  useEffect(() => {
    const fetchData = async () => {
      const serviceSnap = await getDocs(collection(db, "services"));
      const barberSnap = await getDocs(collection(db, "barbers"));

      setServices(serviceSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setBarbers(barberSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please log in first.");

    setLoading(true);

    try {
      await addDoc(collection(db, "appointments"), {
        ...formData,
        userId: user.uid,
        phone: formData.phone || user.phoneNumber || "",
        status: "waiting",
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      alert("Booking submitted!");
      setFormData({ service: "", barber: "", date: "", time: "", phone: "" });
      navigate('/dashboard')
    } catch (err) {
      console.error(err);
      alert("Error booking appointment");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mt-40 mx-auto p-6 bg-white/5 rounded-xl text-white">
      <h2 className="text-2xl font-bold mb-4">Book Your Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Service Selection */}
        <div>
          <label className="block text-sm mb-1">Service</label>
          <select name="service" value={formData.service} onChange={handleChange} required className="w-full p-2 rounded bg-white/10">
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.title}>{service.title}</option>
            ))}
          </select>
        </div>

        {/* Barber Selection */}
        <div>
          <label className="block text-sm mb-1">Barber</label>
          <select name="barber" value={formData.barber} onChange={handleChange} required className="w-full p-2 rounded bg-white/10">
            <option value="">Select a barber</option>
            {barbers.map((barber) => (
              <option key={barber.id} value={barber.name}>{barber.name}</option>
            ))}
          </select>
        </div>

        {/* Date Input */}
        <div>
          <label className="block text-sm mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-white/10"
          />
        </div>

        {/* Time Input */}
        <div>
          <label className="block text-sm mb-1">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-white/10"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-amber-500 hover:bg-amber-400 px-4 py-2 rounded-full text-gray-900 font-medium transition-slow"
        >
          {loading ? "Booking..." : "Confirm Appointment"}
        </button>
      </form>
    </div>
  );
}
