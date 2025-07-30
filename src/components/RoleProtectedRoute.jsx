import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";


const RoleProtectedRoute = ({ allowedRoles, fallback = "/dashboard" }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const role = userSnap.data().role;
          setAuthorized(allowedRoles.includes(role));
        } else {
          setAuthorized(false);
        }
      } catch (error) {
        console.error("Failed to fetch user role:", error);
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [allowedRoles]);

  if (loading) return <div className="text-center py-10 text-white/80">Checking access...</div>;

  return authorized ? <Outlet /> : <Navigate to={fallback} replace />;
};

export default RoleProtectedRoute;
