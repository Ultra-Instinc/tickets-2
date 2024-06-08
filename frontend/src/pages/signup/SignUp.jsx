import React, { useState } from "react";
import GenderCheckBox from "./GenderCheckBox";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSignup from "../../hooks/useSignup";

export default function SignUp() {
	const { loading, signup } = useSignup();
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: "",
	});
	const handleChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
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
			className=' backdrop-filter backdrop-blur-md bg-clip-padding p-6 bg-opacity-10 w-full flex items-center justify-center rounded-lg max-w-96 mx-auto flex-col bg-red-500'>
			<h1 className='text-3xl font-semibold text-center text-gray-300'>
				Sign Up <span className='text-[#CCBA84]'>Tickets.co</span>
			</h1>
			<form
				onSubmit={handleSubmit}
				className='w-full'>
				<div className='w-full'>
					<label className='label p-2'>
						<span className='text-base label-text'>FullName</span>
					</label>
					<input
						type='text'
						placeholder='Enter FullName'
						name='fullName'
						className='w-full input input-bordered h-10'
						value={inputs.fullName}
						onChange={handleChange}
					/>
				</div>
				<div className='w-full'>
					<label className='label p-2'>
						<span className='text-base label-text'>UserName</span>
					</label>
					<input
						type='text'
						placeholder='Enter UserName'
						className='w-full input input-bordered h-10'
						name='username'
						value={inputs.username}
						onChange={handleChange}
					/>
				</div>
				<div className='w-full'>
					<label className='label p-2'>
						<span className='text-base label-text'>Password</span>
					</label>
					<input
						type='password'
						placeholder='Enter Password'
						name='password'
						className='w-full input input-bordered h-10'
						value={inputs.password}
						onChange={handleChange}
					/>
				</div>
				<div className='w-full'>
					<label className='label p-2'>
						<span className='text-base label-text'>Confirm Password</span>
					</label>
					<input
						type='password'
						placeholder='Confirm Password'
						name='confirmPassword'
						className='w-full input input-bordered h-10'
						value={inputs.confirmPassword}
						onChange={handleChange}
					/>
				</div>
				{/* GENDER CHECKBOX GOES HERE*/}
				<GenderCheckBox
					inputs={inputs}
					setInputs={setInputs}
				/>
				<Link
					to='/login'
					className='text-[12px] hover:underline hover:text-yellow-200 mt-2 inline-block'>
					Already have an account?
				</Link>
				<div>
					<button
						disabled={loading}
						className='btn btn-block btn-sm mt-2'>
						{loading ? <span className='loading'></span> : "Sign Up"}
					</button>
				</div>
			</form>
		</motion.div>
	);
}
