import React, { useEffect, useState } from "react";

export const ProfilePage = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setError("⚠️ You are not logged in.");

      try {
        const response = await fetch(`${backendUrl}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) setUser(data);
        else setError(data.error || "Failed to load profile.");
      } catch {
        setError("Network error — could not reach the Force.");
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="container page-container fade-in text-center">
    
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"
        alt="Star Wars Logo"
        className="img-fluid mb-3"
        style={{
          width: "200px",
          filter: "drop-shadow(0 0 8px #ffc107)",
        }}
      />

      <h2 className="text-warning mb-4 fw-bold">Your Jedi Profile</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {user && (
        <div
          className="holo-card mx-auto p-4"
          style={{
            maxWidth: "420px",
            background: "rgba(0, 0, 50, 0.25)",
            borderRadius: "15px",
            border: "1px solid rgba(0, 150, 255, 0.6)",
            boxShadow:
              "0 0 10px rgba(0,150,255,0.5), inset 0 0 15px rgba(0,150,255,0.3)",
            backdropFilter: "blur(6px)",
            color: "#fff",
          }}
        >
          <img
            src="https://i.ibb.co/m6gVnk3/jedi-holocron.png"
            alt="Jedi Holocron"
            className="img-fluid mb-3"
            style={{
              width: "100px",
              filter: "drop-shadow(0 0 12px #00baff)",
              animation: "holoPulse 3s infinite ease-in-out",
            }}
          />
          <h4 className="text-info">{user.username}</h4>
          <p className="text-light">{user.email}</p>

          <hr
            style={{
              border: "none",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, #00baff, transparent)",
              boxShadow: "0 0 10px #00baff",
              margin: "1rem 0",
            }}
          />

          <p className="text-muted">Rank: <span className="text-warning">Jedi Knight</span></p>
          <p className="text-muted">Joined: <span className="text-warning">A long time ago...</span></p>

          <button
            className="btn btn-outline-gold w-100 mt-3"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}

   
      <div className="floating-lights">
        <div className="light-ball"></div>
        <div className="light-ball"></div>
        <div className="light-ball"></div>
      </div>
    </div>
  );
};
