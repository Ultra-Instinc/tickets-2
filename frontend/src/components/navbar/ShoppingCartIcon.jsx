import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ShoppingCartIcon() {
	const navigate = useNavigate();
	return (
		<FaCartPlus
			onClick={() => navigate("/cart")}
			size={25}
			className='cursor-pointer'
			color='white'
		/>
	);
}
