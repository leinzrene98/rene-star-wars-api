// import { Link } from "react-router-dom";
// import storeReducer from "../store";
// import useGlobalReducer from "../hooks/useGlobalReducer";

// export const Navbar = () => {

// 	const { store, dispatch } = useGlobalReducer();

// 	return (
// 		<nav className="navbar navbar-light bg-light">
// 			<div className="container">
// 				<Link to="/">
// 					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
// 				</Link>
// 				<div className="ml-auto">
// 					<Link to="/demo">
// 						<button className="btn btn-primary">Check the Context in action</button>
// 					</Link>
// 				</div>
// 				<div>
// 					<Link to="/addcharacter">
// 						<button className="btn btn-warning">Add Character</button>
// 					</Link>
// 				</div>
// 				<div>
// 					<Link to="/addplanet">
// 						<button className="btn btn-warning">Add Planet</button>
// 					</Link>
// 				</div>
// 				<div>
// 					<Link to="/addspecies">
// 						<button className="btn btn-warning">Add Species</button>
// 					</Link>
// 				</div>
				
// 						{!store.user ? 
// 							<div>
// 								<div>
// 									<Link to="/login">
// 										<p>Login</p>
// 									</Link>
// 								</div>
// 								<div>
// 									<Link to="/signup">
// 										<p>Sign-in</p>
// 									</Link>
// 								</div>
// 							</div>
// 						: 
// 							<div>
// 								<Link to="/profilepage">
// 									<button className="btn btn-dark">Profile Page</button>
// 								</Link>

// 								<button 
// 								className="btn btn-dark"
// 								onClick={ () => dispatch({ type: "log_out_user"}) }
// 								>Logout</button>
// 							</div>
// 						} 
// 			</div>
// 		</nav>
// 	);
// };

import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  const handleLogout = () => {
    dispatch({ type: "log_out_user" });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand fw-bold text-warning" to="/">
          🌌 Star Wars DB
        </Link>

        {/* Toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Left side */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/">
                Home
              </Link>
            </li>

            {/* <li className="nav-item">
              <Link className="nav-link text-light" to="/demo">
                Demo
              </Link>
            </li> */}

            <li className="nav-item">
              <Link className="nav-link text-light" to="/addcharacter">
                Add Character
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-light" to="/addplanet">
                Add Planet
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-light" to="/addspecies">
                Add Species
              </Link>
            </li>
          </ul>

          {/* Right side (auth buttons) */}
          <div className="d-flex align-items-center gap-3">
            {!store.user ? (
              <>
                <Link to="/login" className="btn btn-outline-light">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-success">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link to="/profilepage" className="btn btn-outline-info">
                  Profile
                </Link>
                <button onClick={handleLogout} className="btn btn-warning">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
