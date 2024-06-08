import React from "react";
import CINEMA from "../assets/cinema-image2.svg";

export default function Cinema({ size }) {
	return (
		<img
			src={CINEMA}
			className='text-yellow-500'
			height={size}
			width={size}
			alt='cinema'
		/>
	);
}
