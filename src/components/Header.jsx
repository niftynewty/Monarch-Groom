import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import {db} from "../firebase/config";

const Header = () => {
  const [user] = useAuthState(auth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // Fetch user role when user changes
  React.useEffect(() => {
    if (!user) {
      setUserRole(null);
      return;
    }

    const fetchUserRole = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, [user]);

  const handleLogout = () => {
    auth.signOut();
    setMobileOpen(false);
  };

  // Navigation items for all users
  const navItems = [
    { name: "Home", href: "/", show: true },
    { name: "Services", href: "/#services", show: true },
    { name: "Barbers", href: "/#barbers", show: true },
    { name: "How It Works", href: "/#how-it-works", show: true },
  ];

  // Additional navigation items for logged-in users
  const authNavItems = [
    { name: "Dashboard", to: "/dashboard", show: user },
    { name: "Admin", to: "/admin", show: userRole === "admin" },
  ];
  

  return (
    <header className="frosted w-full fixed top-0 z-50 border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <i className="fas fa-crown text-amber-500 text-2xl mr-2"></i>
              <span className="heading-font text-xl font-bold bg-gradient-to-r from-amber-400 to-white bg-clip-text text-transparent">
                MONARCH GROOM
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {navItems.map((item) => (
                item.show && (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-white/70 hover:text-amber-400 transition-slow px-3 py-2 text-sm font-medium"
                  >
                    {item.name}
                  </a>
                )
              ))}
              {authNavItems.map((item) => (
                item.show && (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="text-white/70 hover:text-amber-400 transition-slow px-3 py-2 text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              {!user ? (
                <>
                  <Link to="/login">
                    <button className="glass-card px-6 py-2 rounded-full text-sm font-medium hover:bg-white/10 transition-slow glow-effect">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="bg-amber-500 px-6 py-2 rounded-full text-sm font-medium text-gray-900 hover:bg-amber-400 transition-slow glow-effect">
                      Sign Up
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <span className="text-white/80 mr-4">
                    Welcome, {user.displayName || user.email.split("@")[0]}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="glass-card px-6 py-2 rounded-full text-sm font-medium hover:bg-white/10 transition-slow glow-effect"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen((open) => !open)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-amber-400 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${mobileOpen ? "block" : "hidden"} frosted border-t border-white/10`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            item.show && (
              <a
                key={item.name}
                href={item.href}
                className="text-white/70 block px-3 py-2 text-base font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </a>
            )
          ))}
          {authNavItems.map((item) => (
            item.show && (
              <Link
                key={item.name}
                to={item.to}
                className="text-white/70 block px-3 py-2 text-base font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            )
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-white/10 px-4 flex flex-col space-y-3">
          {!user ? (
            <>
              <Link to="/login" className="w-full" onClick={() => setMobileOpen(false)}>
                <button className="glass-card px-6 py-2 rounded-full text-sm font-medium w-full hover:bg-white/10 transition-slow">
                  Login
                </button>
              </Link>
              <Link to="/signup" className="w-full" onClick={() => setMobileOpen(false)}>
                <button className="bg-amber-500 px-4 py-2 rounded-full text-sm font-medium text-gray-900 hover:bg-amber-400 transition-slow glow-effect w-full">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-3 mb-3">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center text-gray-900 font-medium">
                    {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
                <span className="text-white/80">
                  {user.displayName || user.email}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="glass-card px-6 py-2 rounded-full text-sm font-medium w-full hover:bg-white/10 transition-slow"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;