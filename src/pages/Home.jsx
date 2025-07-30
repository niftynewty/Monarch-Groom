import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import Barbers from "../components/BarberSection";
import Services from "../components/ServicesSection";

const Home = () => {
  const navigate = useNavigate();

  const [barbers, setBarbers] = useState([]);

  useEffect(() => {
    const fetchBarbers = async () => {
      const querySnapshot = await getDocs(collection(db, "barbers"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBarbers(data);
    };

    fetchBarbers();
  }, []);

  return (
    <main class="flex-1 pt-16">
      {/* <!-- Hero Section --> */}
      <section class="relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 text-center md:text-left z-10">
            <h1 class="heading-font text-4xl md:text-6xl font-bold leading-tight mb-6">
              <span class="bg-gradient-to-r from-amber-400 to-white bg-clip-text text-transparent">
                Your Style,
              </span>
              <span class="block">Your Time</span>
            </h1>
            <p class="text-lg text-white/80 mb-8 max-w-lg">
              Elevate your grooming experience with Monarch - where luxury meets
              convenience. Book top-rated barbers at your preferred time and
              location.
            </p>
            <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <Link to={"/book"}>
                <button class="bg-amber-500 hover:bg-amber-400 px-8 py-3 rounded-full text-gray-900 font-medium transition-slow glow-effect">
                  Book Now <i class="fas fa-arrow-right ml-2"></i>
                </button>
              </Link>
              {/* <button class="glass-card px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-slow glow-effect">
                <i class="fas fa-play-circle mr-2"></i> Watch Demo
              </button> */}
            </div>
          </div>
          <div class="md:w-1/2 mt-12 md:mt-0 relative">
            <div class="relative max-w-md mx-auto">
              {/* <!-- Floating hero image with glass effect --> */}
              <div class="glass-card p-6 rounded-2xl shadow-xl relative overflow-hidden floating">
                <img
                  src="https://images.unsplash.com/photo-1717089256239-dc2ed4d9dfc6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFyYmVyJTIwYmxhY2t8ZW58MHx8MHx8fDA%3D"
                  alt="Barber at work"
                  class="rounded-xl w-full h-auto max-h-96 object-cover"
                />
                <div class="absolute -bottom-5 -right-5 w-24 h-24 bg-amber-500/20 rounded-full filter blur-xl"></div>
              </div>
              {/* <!-- Decorative elements --> */}
              <div class="absolute -top-10 -left-10 w-32 h-32 bg-blue-400/10 rounded-full filter blur-xl"></div>
              <div class="absolute -bottom-8 -left-8 w-20 h-20 bg-amber-500/10 rounded-full filter blur-xl"></div>
            </div>
          </div>
        </div>

        {/* <!-- Background decorative elements --> */}
        <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-b from-blue-400/5 to-transparent rounded-full filter blur-3xl -z-1"></div>
        <div class="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-r from-amber-500/5 to-transparent rounded-full filter blur-3xl -z-1"></div>
      </section>

      {/* <!-- Stats Section --> */}
      {/* <section class="py-12 md:py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="glass-card p-6 rounded-xl hover:bg-white/5 transition-slow glow-effect">
              <div class="flex flex-col items-center text-center">
                <div class="text-3xl md:text-4xl font-bold text-amber-500 mb-2">
                  10K+
                </div>
                <div class="text-white/80 text-sm">Happy Clients</div>
              </div>
            </div>
            <div class="glass-card p-6 rounded-xl hover:bg-white/5 transition-slow glow-effect">
              <div class="flex flex-col items-center text-center">
                <div class="text-3xl md:text-4xl font-bold text-amber-500 mb-2">
                  500+
                </div>
                <div class="text-white/80 text-sm">Professional Barbers</div>
              </div>
            </div>
            <div class="glass-card p-6 rounded-xl hover:bg-white/5 transition-slow glow-effect">
              <div class="flex flex-col items-center text-center">
                <div class="text-3xl md:text-4xl font-bold text-amber-500 mb-2">
                  50+
                </div>
                <div class="text-white/80 text-sm">Cities Covered</div>
              </div>
            </div>
            <div class="glass-card p-6 rounded-xl hover:bg-white/5 transition-slow glow-effect">
              <div class="flex flex-col items-center text-center">
                <div class="text-3xl md:text-4xl font-bold text-amber-500 mb-2">
                  98%
                </div>
                <div class="text-white/80 text-sm">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <!-- Services Section --> */}
      <section id="services" class="py-12 md:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="heading-font text-3xl md:text-4xl font-bold mb-4">
              <span class="bg-gradient-to-r from-amber-400 to-white bg-clip-text text-transparent">
                Premium Services
              </span>
            </h2>
            <p class="text-white/80 max-w-2xl mx-auto">
              We offer a wide range of grooming services tailored to your needs.
              Each service is performed by our certified professionals using
              premium products.
            </p>
          </div>

          <Services/>
        </div>
      </section>

      {/* <!-- Featured Barbers Section --> */}
      <section
        id="barbers"
        class="py-12 md:py-20 bg-gradient-to-b from-white/5 to-transparent"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="heading-font text-3xl md:text-4xl font-bold mb-4">
              <span class="bg-gradient-to-r from-amber-400 to-white bg-clip-text text-transparent">
                Meet Our Masters
              </span>
            </h2>
            <p class="text-white/80 max-w-2xl mx-auto">
              Our certified barbers are carefully selected for their skills,
              experience and attention to detail.
            </p>
          </div>

          <Barbers/>

          <div class="text-center mt-12">
            {/* <button class="glass-card px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-slow glow-effect">
              View All Barbers <i class="fas fa-arrow-right ml-2"></i>
            </button> */}
          </div>
        </div>
      </section>

      {/* <!-- How It Works Section --> */}
      <section id="how-it-works" class="py-12 md:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="heading-font text-3xl md:text-4xl font-bold mb-4">
              <span class="bg-gradient-to-r from-amber-400 to-white bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p class="text-white/80 max-w-2xl mx-auto">
              Booking your perfect grooming experience is quick and effortless
              with Monarch Groom.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* <!-- Step 1 --> */}
            <div class="glass-card p-8 rounded-xl hover:bg-white/5 transition-slow glow-effect">
              <div class="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-6">
                <span class="text-amber-500 font-bold">1</span>
              </div>
              <h3 class="text-xl font-bold mb-4">Select Your Service</h3>
              <p class="text-white/70">
                Choose from our premium menu of grooming services based on your
                needs and preferences.
              </p>
            </div>

            {/* <!-- Step 2 --> */}
            <div class="glass-card p-8 rounded-xl hover:bg-white/5 transition-slow glow-effect">
              <div class="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-6">
                <span class="text-amber-500 font-bold">2</span>
              </div>
              <h3 class="text-xl font-bold mb-4">Pick Your Barber & Time</h3>
              <p class="text-white/70">
                Browse our professional barbers, check their availability and
                select your preferred appointment time.
              </p>
            </div>

            {/* <!-- Step 3 --> */}
            <div class="glass-card p-8 rounded-xl hover:bg-white/5 transition-slow glow-effect">
              <div class="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-6">
                <span class="text-amber-500 font-bold">3</span>
              </div>
              <h3 class="text-xl font-bold mb-4">Confirm & Enjoy</h3>
              <p class="text-white/70">
                Confirm your booking, make payment and look forward to your
                premium grooming experience.
              </p>
            </div>
          </div>

          {/* <!-- Demo Video --> */}
          {/* <div class="glass-card rounded-xl overflow-hidden">
            <div class="aspect-w-16 aspect-h-9 bg-black/50">
              <div class="flex items-center justify-center h-64 md:h-96 bg-gradient-to-r from-amber-500/10 to-blue-500/10 relative">
                <button id="playDemo" class="absolute z-10">
                  <div class="w-20 h-20 rounded-full bg-amber-500/30 hover:bg-amber-500/40 backdrop-blur-md flex items-center justify-center transition-slow">
                    <i class="fas fa-play text-3xl text-white"></i>
                  </div>
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* <!-- Testimonials Section --> */}
      <section class="py-12 md:py-20 bg-gradient-to-b from-white/5 to-transparent">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="heading-font text-3xl md:text-4xl font-bold mb-4">
              <span class="bg-gradient-to-r from-amber-400 to-white bg-clip-text text-transparent">
                Client Testimonials
              </span>
            </h2>
            <p class="text-white/80 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients say about
              their Monarch experience.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* <!-- Testimonial 1 --> */}
            <div class="glass-card p-6 rounded-xl hover:bg-white/5 transition-slow glow-effect">
              <div class="flex items-start mb-4">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Client"
                  class="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 class="font-bold">Michael Thompson</h4>
                  <div class="flex text-amber-500 text-xs mt-1">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p class="text-white/80 italic">
                "James transformed my look completely. His attention to detail
                is unmatched. The hot towel shave is now a weekly ritual for
                me."
              </p>
            </div>

            {/* <!-- Testimonial 2 --> */}
            <div class="glass-card p-6 rounded-xl hover:bg-white/5 transition-slow glow-effect">
              <div class="flex items-start mb-4">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Client"
                  class="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 class="font-bold">Sarah Johnson</h4>
                  <div class="flex text-amber-500 text-xs mt-1">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p class="text-white/80 italic">
                "Sophia is a true artist! She understood exactly what I wanted
                for my color job. The app makes booking so convenient around my
                busy schedule."
              </p>
            </div>

            {/* <!-- Testimonial 3 --> */}
            <div class="glass-card p-6 rounded-xl hover:bg-white/5 transition-slow glow-effect">
              <div class="flex items-start mb-4">
                <img
                  src="https://randomuser.me/api/portraits/men/67.jpg"
                  alt="Client"
                  class="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 class="font-bold">David Kim</h4>
                  <div class="flex text-amber-500 text-xs mt-1">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                  </div>
                </div>
              </div>
              <p class="text-white/80 italic">
                "The beard treatment from Marcus is next level. My beard has
                never been so soft and well-groomed. The app reminders keep me
                on schedule."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Ready to Book Section --> */}
      <section class="py-16 md:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="glass-card rounded-xl p-8 md:p-16 text-center relative overflow-hidden">
            <div class="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/20 rounded-full filter blur-3xl"></div>
            <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full filter blur-3xl"></div>
            <div class="relative">
              <h2 class="heading-font text-3xl md:text-4xl font-bold mb-6">
                Ready to Experience{" "}
                <span class="bg-gradient-to-r from-amber-400 to-white bg-clip-text text-transparent">
                  Premium Grooming?
                </span>
              </h2>
              <p class="text-white/80 max-w-2xl mx-auto mb-8">
                Join thousands of satisfied clients who trust Monarch for their
                grooming needs. Elevate your style with our certified
                professionals.
              </p>
              <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
                <Link to="/book">
                <button class="bg-amber-500 hover:bg-amber-400 px-8 py-3 rounded-full text-gray-900 font-medium transition-slow glow-effect">
                  Book Now <i class="fas fa-arrow-right ml-2"></i>
                </button>
                </Link>

                {/*  */}
                {/* <Link to="/contact">
                <button class="glass-card px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-slow glow-effect">
                  <i class="fas fa-phone-alt mr-2"></i> Contact Us
                </button>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
