import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

export default function ShoppingCart() {
	const [localData, setLocalData] = useState([]);
	const [loading, setLoading] = useState(false);
	const { authUser } = useAuthContext();
	useEffect(() => {
		const fetchUserTransactions = async () => {
			try {
				setLoading(true);
				const res = await fetch(
					`http://localhost:5000/api/transactions?user_id=${authUser?._id}`
				);
				if (!res.ok) throw new Error("failed to fetch user transactions !");
				const data = await res.json();
				setLocalData(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};
		fetchUserTransactions();
	}, []);
	if (loading) {
		return (
			<div className='w-full h-12 flex items-center justify-center'>
				<span className='h-10 w-10 border-[3px] border-red-300 border-r-transparent rounded-full animate-spin' />
			</div>
		);
	}
	return (
		<motion.div
			initial={{ x: "100vw", opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: "-100vw", opacity: 0 }}
			transition={{
				duration: 0.3,
				type: "spring",
				damping: 40,
				stiffness: 700,
			}}
			className=' w-[70%] mx-auto my-auto min-h-96 bg-zinc-800 rounded-2xl flex flex-col gap-10'>
			<h1 className='text-3xl p-3 font-semibold text-zinc-300 border-b w-full'>
				Transactions
			</h1>
			{localData?.length < 1 && (
				<div className='w-full flex items-center justify-center text-2xl'>
					No Transactions Yet !!
				</div>
			)}
			<div className='flex flex-col gap-3 max-h-[50vh] overflow-auto w-full py-5'>
				{localData?.length > 0 &&
					localData?.map((item, ix) => (
						<div
							key={ix}
							className='w-full flex items-center justify-around'>
							<div className='flex flex-col w-[80%] min-h-20 rounded-lg shadow-sm bg-zinc-700 p-3'>
								<div>Transaction ID : {item?._id}</div>
								<div>User ID : {item?.user_id}</div>
								<div>Price : {item?.price}</div>
								<div>
									Time of creation :{" "}
									{new Date(item?.createdAt).toLocaleDateString("en-US", {
										hour: "2-digit",
										minute: "2-digit",
										day: "numeric",
										month: "2-digit",
										year: "numeric",
										hour12: false,
									})}
								</div>
							</div>
						</div>
					))}
			</div>
		</motion.div>
	);
}
