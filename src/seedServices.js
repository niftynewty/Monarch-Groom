// src/seedServices.js
import { db } from "./firebase/config";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const services = [
  {
    title: "Haircut & Styling",
    description: "Precision haircuts tailored to your face shape and personal style, finished with premium styling products.",
    icon: "fas fa-cut",
    price: 3000,
    duration: 30, // Added duration in minutes
    currency: "KES",
  },
  {
    title: "Hot Towel Shave",
    description: "The ultimate traditional shave experience with hot towels, pre-shave oil and a straight razor finish.",
    icon: "fas fa-scissors",
    price: 4000,
    duration: 45,
    currency: "KES",
  },
  {
    title: "Beard Treatment",
    description: "Conditioning, trimming and shaping your beard with nourishing oils and balms for a healthy look.",
    icon: "fas fa-spa",
    price: 3500,
    duration: 30,
    currency: "KES",
  },
  {
    title: "Hair Coloring",
    description: "Professional hair coloring services with high-quality, ammonia-free colors for a natural, vibrant look.",
    icon: "fas fa-hand-sparkles",
    price: 6000,
    duration: 90,
    currency: "KES",
  },
  {
    title: "Scalp Massage",
    description: "Therapeutic massage that increases blood circulation, reduces stress and promotes hair growth.",
    icon: "fas fa-hand-holding-water",
    price: 2500,
    duration: 25,
    currency: "KES",
  },
  {
    title: "Full Grooming Package",
    description: "The complete royal treatment including haircut, shave, beard treatment, facial and scalp massage.",
    icon: "fas fa-spray-can",
    price: 12000,
    duration: 120,
    currency: "KES",
  },
];

export const seedServices = async () => {
  try {
    const servicesRef = collection(db, "services");
    const existingServices = await getDocs(servicesRef);
    
    // Only seed if no services exist
    if (existingServices.size === 0) {
      console.log("🌱 Seeding services...");
      
      const seedingPromises = services.map(async (service) => {
        await addDoc(servicesRef, {
          ...service,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        console.log(`✅ Seeded: ${service.title}`);
      });
      
      await Promise.all(seedingPromises);
      console.log("🎉 All services seeded successfully!");
    } else {
      console.log("ℹ️ Services already exist in database. Skipping seeding.");
    }
  } catch (error) {
    console.error("❌ Error seeding services:", error);
  }
};

// To run the seeding:
// seedServices();