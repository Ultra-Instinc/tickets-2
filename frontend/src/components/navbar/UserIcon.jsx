import React from "react";
import { FaUserAlt } from "react-icons/fa";
import useLogout from "../../hooks/useLogout";
export default function UserIcon() {
	const { logout } = useLogout();
	return (
		<span
			onClick={logout}
			title='logout'
			className='flex h-10 items-center gap-2 cursor-pointer hover:scale-105 duration-300 text-[#BA9180]'>
			<FaUserAlt size={22} />
		</span>
	);
}
