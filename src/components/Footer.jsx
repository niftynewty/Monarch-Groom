import React from "react";

const Footer = () => (
  <footer className="frosted border-t border-white/10 mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center mb-4">
            <i className="fas fa-crown text-amber-500 text-xl mr-2"></i>
            <span className="heading-font text-lg font-bold">MONARCH GROOM</span>
          </div>
          <p className="text-white/70 mb-4">
            Your premium grooming experience, connecting clients with top barbers for exceptional service.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-white/70 hover:text-amber-400 transition-slow"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-white/70 hover:text-amber-400 transition-slow"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-white/70 hover:text-amber-400 transition-slow"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-white/70 hover:text-amber-400 transition-slow"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="text-white/70 hover:text-amber-400 transition-slow block">Home</a></li>
            <li><a href="/dashboard" className="text-white/70 hover:text-amber-400 transition-slow block">Dashboard</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Services</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-white/70 hover:text-amber-400 transition-slow block">Haircut & Styling</a></li>
            <li><a href="#" className="text-white/70 hover:text-amber-400 transition-slow block">Hot Towel Shave</a></li>
            <li><a href="#" className="text-white/70 hover:text-amber-400 transition-slow block">Beard Treatment</a></li>
            <li><a href="#" className="text-white/70 hover:text-amber-400 transition-slow block">Hair Coloring</a></li>
            <li><a href="#" className="text-white/70 hover:text-amber-400 transition-slow block">Scalp Massage</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-start"><i className="fas fa-map-marker-alt text-amber-500 mt-1 mr-3"></i><span className="text-white/70">Kabarak Nakuru</span></li>
            <li className="flex items-center"><i className="fas fa-phone-alt text-amber-500 mr-3"></i><span className="text-white/70">+254 711 346 177</span></li>
            <li className="flex items-center"><i className="fas fa-envelope text-amber-500 mr-3"></i><span className="text-white/70">hello@monarchgroom.com</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-white/50 text-sm mb-4 md:mb-0">&copy; 2025 Monarch Groom. All rights reserved.</p>
        <div className="flex space-x-6">
          <a href="#" className="text-white/50 hover:text-white text-sm">Privacy Policy</a>
          <a href="#" className="text-white/50 hover:text-white text-sm">Terms of Service</a>
          <a href="#" className="text-white/50 hover:text-white text-sm">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
