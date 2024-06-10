import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useLogin from "../../hooks/useLogin";

export default function Login() {
	const { loading, login } = useLogin();
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};
	return (
		<motion.div
			initial={{ x: "100vw", opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: "-100vw", opacity: 0 }}
			transition={{
				duration: 0.3,
				type: "spring",
				stiffness: 700,
				damping: 30,
			}}
			className='backdrop-filter backdrop-blur-md bg-clip-padding p-6 bg-opacity-10 w-full flex items-center justify-center rounded-lg max-w-96 mx-auto flex-col text-white'>
			<div className='w-full p-6 '>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Login
					<span className='text-[#CCBA84]'>Tickets.co</span>
				</h1>
				<form onSubmit={handleSubmit}>
					<div>
						<label
							htmlFor=''
							className='label p-2'>
							<span className='text-base'>Username</span>
						</label>
						<input
							type='text'
							placeholder='Enter Username'
							className='w-full input text-gray-100 input-bordered h-10'
							value={username}
							onChange={(e) => setUserName(e.target.value)}
						/>
					</div>
					<div>
						<label
							htmlFor=''
							className='label p-2'>
							<span className='text-base'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input text-gray-100 input-bordered h-10'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<Link
						to='/signup'
						className='text-[12px] hover:underline hover:text-yellow-200 mt-2 inline-block'>
						{"Don't have an account?"}
					</Link>
					<div>
						<button
							disabled={loading}
							className='btn btn-block btn-sm mt-2'>
							{loading ? <span className='loading'></span> : "Login"}
						</button>
					</div>
				</form>
			</div>
		</motion.div>
	);
}
