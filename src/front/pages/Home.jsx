import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import useActions from "../hooks/actions.js";
import { Signup } from "./Signup.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const { getCharacters, getPlanets, getSpecies } = useActions();
	const backendUrl = import.meta.env.VITE_BACKEND_URL

	const loadMessage = async () => {
		try {

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}


	

	useEffect(() => {

		if (store.characters.length === 0) {
			getCharacters()
		}
		if (store.planets.length === 0) {
			getPlanets()
		}
		if (store.species.length === 0) {
			getSpecies()
		}

		loadMessage()
	}, [])

	return (

		< Signup />
	);
}; 