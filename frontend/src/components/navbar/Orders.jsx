import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RiExchangeDollarFill } from "react-icons/ri";

export default function Orders() {
	const navigate = useNavigate();
	const pathname = useLocation().pathname;
	return (
		<RiExchangeDollarFill
			onClick={() => navigate("/transactions")}
			size={25}
			className='cursor-pointer'
			color={pathname === "/transactions" ? "#BA9180" : "white"}
		/>
	);
}
