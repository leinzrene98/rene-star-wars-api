// import React from "react";
// // import bootstrap from "bootstrap/dist/css/bootstrap.css";
// import { useState } from "react";

// export const AddPlanet = () => {

//     const [planetInformation, setPlanetInformation] = useState(
//         {
//             name: "",
//             population: null,
//         }
//     )

//     const backendUrl = import.meta.env.VITE_BACKEND_URL


//     const addPlanetFetch = async () => {
//         const response = await fetch(backendUrl + "/api/planet",
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(planetInformation)
//             }
//         )
//         const data = await response.json()

//         console.log("New planet ", data)
//     }


//     return (
//         <>
//             <input type="text"
//                 value={planetInformation.name}
//                 onChange={(event) => setPlanetInformation({ ...planetInformation, name: event.target.value })}
//                 className="form-control" placeholder="Planet Name" aria-label="Example text with button addon" aria-describedby="button-addon1"
//             />
//             <input type="number"
//                 value={planetInformation.population}
//                 onChange={(event) => setPlanetInformation({ ...planetInformation, population: event.target.value })}
//                 className="form-control" placeholder="Planet Population" aria-label="Example text with button addon" aria-describedby="button-addon1"
//             />
//             <button onClick={addPlanetFetch}>Add Planet</button>
//         </>
//     )
// }

import React, { useState } from "react";

export const AddPlanet = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [planetInfo, setPlanetInfo] = useState({
    name: "",
    population: "",
    terrain: "",
    climate: "",
  });

  const [message, setMessage] = useState("");

  const addPlanetFetch = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/planet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(planetInfo),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ Planet "${data.name}" added successfully!`);
        setPlanetInfo({ name: "", population: "", terrain: "", climate: "" });
      } else {
        setMessage(`❌ Failed: ${data.error || "Unknown error"}`);
      }
    } catch {
      setMessage("⚠️ Network error: Could not connect to backend.");
    }
  };

  return (
    <div className="container page-container fade-in" style={{ maxWidth: 600 }}>
      <div className="card p-4 shadow-lg">
        <h2 className="text-center text-warning mb-4">Add a New Planet</h2>

        <div className="mb-3">
          <label className="form-label">Planet Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Tatooine"
            value={planetInfo.name}
            onChange={(e) =>
              setPlanetInfo({ ...planetInfo, name: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Population</label>
          <input
            type="number"
            className="form-control"
            placeholder="e.g. 200000"
            value={planetInfo.population}
            onChange={(e) =>
              setPlanetInfo({ ...planetInfo, population: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Terrain</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Desert"
            value={planetInfo.terrain}
            onChange={(e) =>
              setPlanetInfo({ ...planetInfo, terrain: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Climate</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Arid"
            value={planetInfo.climate}
            onChange={(e) =>
              setPlanetInfo({ ...planetInfo, climate: e.target.value })
            }
          />
        </div>

        <button onClick={addPlanetFetch} className="btn btn-gold w-100 mt-2">
          Add Planet
        </button>

        {message && (
          <div className="alert alert-info text-center mt-4">{message}</div>
        )}
      </div>
    </div>
  );
};
