import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "../../pages/home/Home";
import Login from "../../pages/login/Login";
import SignUp from "../../pages/signup/SignUp";
import { AnimatePresence } from "framer-motion";
import { useAuthContext } from "../../context/AuthContext";
import Tickets from "../../pages/tickets/Tickets";
import NavBar from "../navbar/NavBar";
import Footer from "./../Footer";

export default function RoutesWithAnimation() {
	const { authUser } = useAuthContext();
	const location = useLocation();
	return (
		<AnimatePresence mode='wait'>
			<div className='w-full min-h-screen flex flex-col '>
				<NavBar />
				<div className='min-h-[calc(100vh_-_100px)] py-10'>
					<Routes
						location={location}
						key={location.pathname}>
						<Route
							path='/'
							element={authUser ? <Home /> : <Navigate to='/login' />}
						/>
						<Route
							path='/tickets'
							element={authUser ? <Tickets /> : <Navigate to='/login' />}
						/>
						<Route
							path='/login'
							element={authUser ? <Navigate to='/' /> : <Login />}
						/>
						<Route
							path='/signup'
							element={authUser ? <Navigate to='/' /> : <SignUp />}
						/>
					</Routes>
				</div>
				<Footer />
			</div>
		</AnimatePresence>
	);
}
