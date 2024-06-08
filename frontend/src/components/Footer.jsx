import React from "react";
import { useAuthContext } from "../context/AuthContext";

export default function Footer() {
	const { authUser } = useAuthContext();
	if (authUser) {
		return (
			<div className='bg-[#65637D] w-screen rounded-lg  -translate-x-[5vw] flex items-center justify-center text-[30px]'>
				Footer
			</div>
		);
	}
}
