import React from "react";
import CONCERT from "../assets/concert-image2.svg";

export default function Concert({ size }) {
	return (
		<img
			src={CONCERT}
			className='text-yellow-500'
			height={size}
			width={size}
			alt='concert_sv'
		/>
	);
}
