import React from "react";
import { motion } from "framer-motion";
import { GiTheater } from "react-icons/gi";
import Concert from "../../icons/Concert";
import Cinema from "../../icons/Cinema";
import Play from "../../icons/Play";
import { useNavigate } from "react-router-dom";

export default function Home() {
	const navigate = useNavigate();
	const arr = [
		{
			key: 1,
			title: "Theater",
			path: "/tickets?t=Th",
			icon: <GiTheater size={100} />,
		},
		{
			key: 2,
			title: "Cinema",
			path: "/tickets?t=Ci",
			icon: <Cinema size={90} />,
		},
		{ key: 3, title: "Play", path: "/tickets?t=Pl", icon: <Play size={100} /> },
		{
			key: 4,
			title: "Concert",
			path: "/tickets?t=Co",
			icon: <Concert size={180} />,
		},
	];
	return (
		<motion.div
			initial={{ x: "100vw", opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: "-100vw", opacity: 0 }}
			transition={{
				duration: 0.3,
				type: "spring",
				damping: 40,
				stiffness: 700,
			}}
			className='flex items-center justify-center pt-32'>
			<div className='grid grid-cols-4 gap-4'>
				{arr.map((item) => (
					<div
						key={item.key}
						onClick={() => navigate(item.path)}
						className=' flex flex-col h-[230px] w-[200px] col-span-2 rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 items-center justify-center border-gray-500 border hover:scale-105 duration-300 transition-all cursor-pointer'>
						<div className='text-[#ba9180] mb-5'>{item.icon}</div>
						<h1 className='text-4xl'>{item.title}</h1>
						<p>Tickets</p>
					</div>
				))}
			</div>
		</motion.div>
	);
}
