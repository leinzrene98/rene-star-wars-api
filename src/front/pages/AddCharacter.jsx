// import React from "react";
// import bootstrap from "bootstrap/dist/css/bootstrap.css";
// import { useState, useEffect } from "react";
// import useGlobalReducer from "../hooks/useGlobalReducer";
// import useActions from "../hooks/actions";




// export const AddCharacter = () => {

//     const { store, dispatch } = useGlobalReducer()

//     const backendUrl = import.meta.env.VITE_BACKEND_URL

//     const { getSpecies, getPlanets } = useActions()

//     const [characterInformation, setCharacterInformation] = useState(
//         {
//             name: "",
//             hair_color: "",
//             eye_color: "",
//             homeworld_id: null,
//             species_id: null
//         }
//     ); /* this stores what the user types */



//     const addCharacterFetch = async () => {

//         const response = await fetch(backendUrl + "/api/character",
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(characterInformation)
//             }
//         )
//         const data = await response.json()
//         console.log("Added Character: ", data)
//     }

//     useEffect(() => {
//         if (store.planets.length === 0) {
//             getPlanets()
//         }
//         if (store.species.length === 0) {
//             getSpecies()
//         }
//     }, [])

//     return (
//         <>
//             <input
//                 type="text"
//                 value={characterInformation.name}
//                 onChange={(event) => setCharacterInformation({ ...characterInformation, name: event.target.value })}
//                 className="form-control" placeholder="Character Name" aria-label="Example text with button addon" aria-describedby="button-addon1"
//             />
//             <input
//                 type="text"
//                 value={characterInformation.hair_color}
//                 onChange={(event) => setCharacterInformation({ ...characterInformation, hair_color: event.target.value })}
//                 className="form-control" placeholder="Hair Color" aria-label="Example text with button addon" aria-describedby="button-addon1"
//             />
//             <input
//                 type="text"
//                 value={characterInformation.eye_color}
//                 onChange={(event) => setCharacterInformation({ ...characterInformation, eye_color: event.target.value })}
//                 className="form-control" placeholder="Eye Color" aria-label="Example text with button addon" aria-describedby="button-addon1"
//             />
//             <div>
//                 <label for="select-homeworld">Select Homeworld</label>
//                 <select id="select-homeworld"
//                     value={characterInformation.homeworld_id}
//                     onChange={(event) => setCharacterInformation({ ...characterInformation, homeworld_id: event.target.value })}>
//                     <option value="">Choose...</option>
//                     <optgroup label="Select Planet">
//                         {store.planets.map((planet) => (
//                             <option value={planet.id}
//                                 key={planet.id}
//                             >{planet.name}
//                             </option>
//                         ))}
//                     </optgroup>
//                 </select>
//             </div>
//             <div>
//                 <label for="select-species">Select Species</label>
//                 <select id="select-species"
//                     value={characterInformation.species_id}
//                     onChange={(event) => setCharacterInformation({ ...characterInformation, species_id: event.target.value })}>
//                     <option value="">Choose...</option>
//                     <optgroup label="Select Species">
//                         {store.species.map((element) => (
//                             <option value={element.id}
//                                 key={element.id}
//                             >{element.name}
//                             </option>
//                         ))}
//                     </optgroup>
//                 </select>

//             </div>
//             <button onClick={addCharacterFetch}>Add Character</button>
//         </>
//     )
// }

import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import useActions from "../hooks/actions";

export const AddCharacter = () => {
  const { store, dispatch } = useGlobalReducer();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { getSpecies, getPlanets } = useActions();

  const [characterInformation, setCharacterInformation] = useState({
    name: "",
    hair_color: "",
    eye_color: "",
    homeworld_id: "",
    species_id: "",
  });

  const [message, setMessage] = useState("");

  const addCharacterFetch = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/character`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(characterInformation),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ Character "${data.name}" added successfully!`);
        setCharacterInformation({
          name: "",
          hair_color: "",
          eye_color: "",
          homeworld_id: "",
          species_id: "",
        });
      } else {
        setMessage(`❌ Failed to add character: ${data.error || "Unknown error"}`);
      }
    } catch {
      setMessage("⚠️ Network error: Could not connect to backend.");
    }
  };

  useEffect(() => {
    if (store.planets.length === 0) getPlanets();
    if (store.species.length === 0) getSpecies();
  }, []);

  return (
    <div className="container page-container fade-in" style={{ maxWidth: 600 }}>
      <div className="card p-4 shadow-lg">
        <h2 className="text-center text-warning mb-4">Add a New Character</h2>

        <div className="mb-3">
          <label className="form-label">Character Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Luke Skywalker"
            value={characterInformation.name}
            onChange={(e) =>
              setCharacterInformation({ ...characterInformation, name: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Hair Color</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Brown"
            value={characterInformation.hair_color}
            onChange={(e) =>
              setCharacterInformation({ ...characterInformation, hair_color: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Eye Color</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Blue"
            value={characterInformation.eye_color}
            onChange={(e) =>
              setCharacterInformation({ ...characterInformation, eye_color: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Select Homeworld</label>
          <select
            className="form-select form-control"
            value={characterInformation.homeworld_id}
            onChange={(e) =>
              setCharacterInformation({ ...characterInformation, homeworld_id: e.target.value })
            }
          >
            <option value="">Choose a planet...</option>
            {store.planets.map((planet) => (
              <option key={planet.id} value={planet.id}>
                {planet.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Select Species</label>
          <select
            className="form-select form-control"
            value={characterInformation.species_id}
            onChange={(e) =>
              setCharacterInformation({ ...characterInformation, species_id: e.target.value })
            }
          >
            <option value="">Choose a species...</option>
            {store.species.map((sp) => (
              <option key={sp.id} value={sp.id}>
                {sp.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={addCharacterFetch}
          className="btn btn-gold w-100 mt-2"
        >
          Add Character
        </button>

        {message && (
          <div className="alert alert-info text-center mt-4">{message}</div>
        )}
      </div>
    </div>
  );
};
