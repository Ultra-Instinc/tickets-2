import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

export default function ShoppingCartIcon() {
	const pathname = useLocation().pathname;
	const navigate = useNavigate();
	return (
		<FaCartPlus
			onClick={() => navigate("/cart")}
			size={25}
			className='cursor-pointer'
			color={pathname === "/cart" ? "#BA9180" : "white"}
		/>
	);
}
