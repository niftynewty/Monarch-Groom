// src/components/Barbers.jsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export default function Barbers() {
  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch services first
        const servicesSnapshot = await getDocs(collection(db, "services"));
        const servicesData = servicesSnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        }));
        setServices(servicesData);

        // Then fetch barbers
        const barbersSnapshot = await getDocs(collection(db, "barbers"));
        const barbersData = barbersSnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        }));
        setBarbers(barbersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to get service names by IDs
  const getServiceNames = (serviceIds) => {
    return serviceIds
      .map(id => {
        const service = services.find(s => s.id === id);
        return service ? service.title : null;
      })
      .filter(name => name !== null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {barbers.map((barber) => {
        const barberServices = barber.services ? getServiceNames(barber.services) : [];
        
        return (
          <div
            key={barber.id}
            className="glass-card rounded-xl overflow-hidden group hover:bg-white/5 transition-slow"
          >
            <div className="relative h-72">
              <img
                src={barber.image || "https://via.placeholder.com/400x300"}
                alt={barber.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x300";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-bold text-white">{barber.name}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-amber-500">
                    {Array.from({ length: Math.floor(barber.averageRating || 0) }).map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                    {(barber.averageRating || 0) % 1 >= 0.5 && (
                      <i className="fas fa-star-half-alt"></i>
                    )}
                  </div>
                  <span className="text-sm text-white/70 ml-2">
                    {barber.averageRating?.toFixed(1) || "0.0"} (
                    {barber.ratings?.length || 0} reviews)
                  </span>
                </div>
                {barberServices.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {barberServices.map((service, i) => (
                      <span
                        key={i}
                        className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="p-6">
              <p className="text-white/70 mb-4">{barber.bio || "No bio available"}</p>
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => navigate(`/book?barber=${barber.id}`)} 
                  className="bg-amber-500 hover:bg-amber-400 px-4 py-2 rounded-full text-gray-900 text-sm font-medium transition-slow"
                >
                  Book Appointment
                </button>
                {/* <button className="text-sm text-white/70 hover:text-amber-400 transition-slow">
                  View Portfolio <i className="fas fa-arrow-right ml-1"></i>
                </button> */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}