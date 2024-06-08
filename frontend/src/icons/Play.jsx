import React from "react";
import PLAY from "../assets/play-image2.svg";

export default function Play({ size }) {
	return (
		<img
			src={PLAY}
			className='text-yellow-500'
			height={size}
			width={size}
			alt='play'
		/>
	);
}
