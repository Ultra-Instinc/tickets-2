import React from "react";
import { useNavigate } from "react-router-dom";
import { IoTicket } from "react-icons/io5";
const Logo = () => {
	const navigate = useNavigate();
	return (
		<div
			onClick={() => navigate("/")}
			className='flex h-10 items-center gap-2 cursor-pointer'>
			<span className='text-[#BA9180]'>
				<IoTicket size={30} />
			</span>
			<span className='text-xl text-white font-semibold'>Tickets.co</span>
		</div>
	);
};

export default Logo;
