import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import Logo from "./Logo";
import UserIcon from "./UserIcon";
import ShoppingCartIcon from "./ShoppingCartIcon";

export default function NavBar() {
	const { authUser } = useAuthContext();
	if (authUser) {
		return (
			<nav className='w-screen rounded-lg flex overflow-hidden bg-[#65637D] -translate-x-[5vw]'>
				<div className='w-[90%] mx-auto flex px-5 justify-between min-h-10'>
					<Logo />
					<div className='flex items-center gap-10'>
						<ShoppingCartIcon />
						<UserIcon />
					</div>
				</div>
			</nav>
		);
	}
}
