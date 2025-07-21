import React, { useState } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <form onSubmit={handleSubmit} className="glass-card rounded-xl max-w-md w-full p-8 relative overflow-hidden">
        <h2 className="heading-font text-2xl font-bold mb-6 text-center">Welcome Back</h2>
        {error && <div className="text-red-400 mb-4 text-center">{error}</div>}
        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">Email</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-slow" required />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1">Password</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-slow" required />
          </div>
          <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-slow">Sign In</button>
          {/* <button type="button" onClick={handleGoogleLogin} className="w-full glass-card py-3 px-4 border border-white/20 rounded-lg shadow-sm text-sm font-medium text-white flex items-center justify-center space-x-2 transition-slow hover:bg-white/10 mt-2">
            <i className="fab fa-google text-red-500"></i>
            <span>Continue with Google</span>
          </button> */}
        </div>
        <p className="mt-6 text-center text-sm text-white/70">
          Don't have an account? <a href="/signup" className="text-amber-500 hover:text-amber-400 font-medium">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
