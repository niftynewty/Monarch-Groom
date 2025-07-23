// src/components/Services.jsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { seedServices } from "../seedServices";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const [services, setServices] = useState([]);
  
  const navigate = useNavigate()

  useEffect(() => {
    const fetchServices = async () => {
      const querySnapshot = await getDocs(collection(db, "services"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setServices(data);
    };

    fetchServices();
  }, []);

  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map(service => (
        <div
          key={service.id}
          className="glass-card p-6 rounded-xl group hover:bg-white/5 transition-slow"
        >
          <div className="w-16 h-16 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-slow">
            <i className={`${service.icon} text-2xl text-amber-500`}></i>
          </div>
          <h3 className="text-xl font-bold mb-2">{service.title}</h3>
          <p className="text-white/70 mb-4">{service.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-amber-500 font-medium">From ${service.price}</span>
            
            <button onClick={()=> navigate('/book')} className="text-sm text-white/70 hover:text-amber-400 transition-slow">
              Book Now <i className="fas fa-arrow-right ml-1"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
