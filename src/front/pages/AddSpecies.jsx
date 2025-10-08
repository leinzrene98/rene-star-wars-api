// import React from "react";
// import { useState } from "react";


// export const AddSpecies = () => {

//     const [speciesInformation, setSpeciesInformation] = useState(
//         {
//             name: "",
//             average_height: null,
//             average_lifespan: null,
//             language: ""
//         }
//     )

//     const backendUrl = import.meta.env.VITE_BACKEND_URL

//     const addSpeciesFetch = async () => {
//         const response = await fetch(backendUrl + "/api/species",
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(speciesInformation)
//             }
//         )
//         const data = await response.json()

//         console.log("New Species ", data)
//     }




//     return (

//         <>
//             <input
//                 type="text"
//                 value={speciesInformation.name}
//                 onChange={(event) => setSpeciesInformation({ ...speciesInformation, name: event.target.value })}
//                 className="form-control" placeholder="Species Name" aria-label="Example text with button addon" aria-describedby="button-addon1"
//             />
//             <input
//                 type="number"
//                 value={speciesInformation.average_height}
//                 onChange={(event) => setSpeciesInformation({ ...speciesInformation, average_height: event.target.value })}
//                 className="form-control" placeholder="Average Height" aria-label="Example text with button addon" aria-describedby="button-addon1"
//             />
//             <input
//                 type="number"
//                 value={speciesInformation.average_lifespan}
//                 onChange={(event) => setSpeciesInformation({ ...speciesInformation, average_lifespan: event.target.value })}
//                 className="form-control" placeholder="Average Lifespan" aria-label="Example text with button addon" aria-describedby="button-addon1"
//             />
//             <input
//                 type="text"
//                 value={speciesInformation.language}
//                 onChange={(event) => setSpeciesInformation({ ...speciesInformation, language: event.target.value })}
//                 className="form-control" placeholder="Language" aria-label="Example text with button addon" aria-describedby="button-addon1"
//             />
//             <button
//                 onClick={addSpeciesFetch}>Add Species</button>
//         </>
//     )
// }

import React, { useState } from "react";

export const AddSpecies = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [speciesInfo, setSpeciesInfo] = useState({
    name: "",
    classification: "",
    language: "",
    average_lifespan: "",
  });

  const [message, setMessage] = useState("");

  const addSpeciesFetch = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/species`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(speciesInfo),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ Species "${data.name}" added successfully!`);
        setSpeciesInfo({
          name: "",
          classification: "",
          language: "",
          average_lifespan: "",
        });
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
        <h2 className="text-center text-warning mb-4">Add a New Species</h2>

        <div className="mb-3">
          <label className="form-label">Species Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Wookiee"
            value={speciesInfo.name}
            onChange={(e) =>
              setSpeciesInfo({ ...speciesInfo, name: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Classification</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Mammal"
            value={speciesInfo.classification}
            onChange={(e) =>
              setSpeciesInfo({ ...speciesInfo, classification: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Language</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Shyriiwook"
            value={speciesInfo.language}
            onChange={(e) =>
              setSpeciesInfo({ ...speciesInfo, language: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Average Lifespan</label>
          <input
            type="number"
            className="form-control"
            placeholder="e.g. 400"
            value={speciesInfo.average_lifespan}
            onChange={(e) =>
              setSpeciesInfo({ ...speciesInfo, average_lifespan: e.target.value })
            }
          />
        </div>

        <button onClick={addSpeciesFetch} className="btn btn-gold w-100 mt-2">
          Add Species
        </button>

        {message && (
          <div className="alert alert-info text-center mt-4">{message}</div>
        )}
      </div>
    </div>
  );
};
