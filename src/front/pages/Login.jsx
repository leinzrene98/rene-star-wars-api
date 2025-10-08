
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setMessage(`✅ Welcome back, ${data.user.username}!`);
        setTimeout(() => navigate("/profile"), 1200);
      } else {
        setMessage(`❌ Login failed: ${data.error || "Invalid credentials"}`);
      }
    } catch {
      setMessage("⚠️ Connection error — the Force is weak right now.");
    }
  };

  return (
    <div className="container page-container fade-in" style={{ maxWidth: 500 }}>
      <div className="card p-4 shadow-lg text-center">
     
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"
          alt="Star Wars Logo"
          className="img-fluid mb-3"
          style={{
            width: "200px",
            filter: "drop-shadow(0 0 8px #ffc107)",
          }}
        />

        <h2 className="text-warning mb-4 fw-bold">Welcome Back, Jedi</h2>
        <p className="text-light mb-4">
          Log in to continue your journey through the galaxy.
        </p>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="Your Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="Your Password"
        />

        <button className="btn btn-gold w-100 mt-2" onClick={handleSubmit}>
          Login
        </button>

        {message && (
          <div className="alert alert-info mt-4 text-center">{message}</div>
        )}

       
        <div className="mt-4">
        
              <img
            src="https://pngimg.com/d/darth_vader_PNG26.png"
            alt="Darth Vader"
            className="img-fluid"
            style={{
            width: "120px",
            opacity: 0.8,
            filter: "drop-shadow(0 0 12px #ffc107)",
           }}
         />

        </div>

       
        <div
          style={{
            height: "4px",
            width: "60%",
            margin: "20px auto 0",
            background: "linear-gradient(90deg, transparent, #ffc107, transparent)",
            boxShadow: "0 0 10px #ffc107",
            borderRadius: "10px",
            animation: "lightsaberGlow 2s infinite alternate",
          }}
        ></div>
      </div>
    </div>
  );
};
