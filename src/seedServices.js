// src/seedServices.js
import { db } from "./firebase/config"; // your Firebase config file
import { collection, addDoc } from "firebase/firestore";

const services  = [
    {
      title: "Haircut & Styling",
      description:
        "Precision haircuts tailored to your face shape and personal style, finished with premium styling products.",
      icon: "fas fa-cut",
      price: 3000, // in KES
      currency: "KES",
    },
    {
      title: "Hot Towel Shave",
      description:
        "The ultimate traditional shave experience with hot towels, pre-shave oil and a straight razor finish.",
      icon: "fas fa-scissors",
      price: 4000,
      currency: "KES",
    },
    {
      title: "Beard Treatment",
      description:
        "Conditioning, trimming and shaping your beard with nourishing oils and balms for a healthy look.",
      icon: "fas fa-spa",
      price: 3500,
      currency: "KES",
    },
    {
      title: "Hair Coloring",
      description:
        "Professional hair coloring services with high-quality, ammonia-free colors for a natural, vibrant look.",
      icon: "fas fa-hand-sparkles",
      price: 6000,
      currency: "KES",
    },
    {
      title: "Scalp Massage",
      description:
        "Therapeutic massage that increases blood circulation, reduces stress and promotes hair growth.",
      icon: "fas fa-hand-holding-water",
      price: 2500,
      currency: "KES",
    },
    {
      title: "Full Grooming Package",
      description:
        "The complete royal treatment including haircut, shave, beard treatment, facial and scalp massage.",
      icon: "fas fa-spray-can",
      price: 12000,
      currency: "KES",
    },
  ];
  

export const seedServices = async () => {
  const servicesRef = collection(db, "services");
  for (const service of services) {
    await addDoc(servicesRef, service);
    console.log(`Seeded: ${service.title}`);
  }
  console.log("✅ All services seeded.");
};


