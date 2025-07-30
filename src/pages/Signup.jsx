import React, { useState } from "react";
import { auth, db } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // 🔐 Add user to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid:user.uid,
        fullName: fullName,
        email: user.email,
        role: "customer", // default role
        createdAt: serverTimestamp(),
        lastSignIn: serverTimestamp(),
      });
  
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <form onSubmit={handleSubmit} className="glass-card rounded-xl max-w-md w-full p-8 relative overflow-hidden">
        <h2 className="heading-font text-2xl font-bold mb-6 text-center">Create Account</h2>
        {error && <div className="text-red-400 mb-4 text-center">{error}</div>}
        <div className="space-y-6">
        <div>
            <label htmlFor="full name" className="block text-sm font-medium text-white/80 mb-1">Full Name</label>
            <input type="text" id="email name" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-slow" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">Email</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-slow" required />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1">Password</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-slow" required />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80 mb-1">Confirm Password</label>
            <input type="password" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-slow" required />
          </div>
          <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-slow">Create Account</button>
        </div>
        <p className="mt-6 text-center text-sm text-white/70">
          Already have an account? <a href="/login" className="text-amber-500 hover:text-amber-400 font-medium">Sign In</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
