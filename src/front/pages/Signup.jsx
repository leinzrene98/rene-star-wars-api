import React, { useState } from "react";

export const Signup = () => {
  const [signinInfo, setSigninInfo] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const addUserFetch = async () => {
    try {
      const response = await fetch(backendUrl + "/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signinInfo),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ You’ve successfully joined the Force! Now log in.");
        setSigninInfo({ email: "", password: "" });
      } else {
        setMessage(`❌ Signup failed: ${data.error || "Unknown error"}`);
      }
    } catch {
      setMessage("⚠️ Connection failed. Check backend or internet.");
    }
  };

  return (
    <div className="container page-container fade-in" style={{ maxWidth: 500 }}>
      <div className="card p-4 shadow-lg text-center">
        {/* Star Wars Graphic */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"
          alt="Star Wars Logo"
          className="img-fluid mb-3"
          style={{
            width: "200px",
            filter: "drop-shadow(0 0 8px #ffc107)",
          }}
        />

        <h2 className="text-warning mb-4 fw-bold">Sign up for FREE</h2>
        <p className="text-light mb-4">
          Join the Star Wars Databank and explore the galaxy far, far away 🌌
        </p>

        <input
          type="text"
          value={signinInfo.email}
          onChange={(e) =>
            setSigninInfo({ ...signinInfo, email: e.target.value })
          }
          className="form-control mb-3"
          placeholder="Your Email"
        />
        <input
          type="password"
          value={signinInfo.password}
          onChange={(e) =>
            setSigninInfo({ ...signinInfo, password: e.target.value })
          }
          className="form-control mb-3"
          placeholder="Your Password"
        />

        <button
          className="btn btn-gold w-100 mt-2"
          onClick={addUserFetch}
        >
          Sign Up
        </button>

        {message && (
          <div className="alert alert-info mt-4 text-center">{message}</div>
        )}

        <div className="mt-4">
          {/* <img
            src="https://i.ibb.co/2hgQxtK/stormtrooper-silhouette.png"
            alt="Stormtrooper"
            className="img-fluid"
            style={{
              width: "100px",
              opacity: 0.7,
              filter: "drop-shadow(0 0 8px #ffc107)",
            }}
          /> */}
          <img
  src="https://pngimg.com/uploads/starwars/starwars_PNG28.png"
  alt="Stormtrooper"
  className="img-fluid"
  style={{
    width: "100px",
    opacity: 0.7,
    filter: "drop-shadow(0 0 8px #ffc107)",
  }}
/>

        </div>
      </div>
    </div>
  );
};
