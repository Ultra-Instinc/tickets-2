import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import CartItem from "./CartItem";
import Modal from "./Modal";

export default function ShoppingCart() {
	const [localData, setLocalData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [refetch, setRefetch] = useState(false);
	const { authUser } = useAuthContext();
	const [showCheckOutModal, setShowCheckOutModal] = useState(false);
	useEffect(() => {
		const fetchUserTickets = async () => {
			try {
				setLoading(true);
				const res = await fetch(
					`http://localhost:5000/api/tickets?user_id=${authUser?._id}`
				);
				if (!res.ok) throw new Error("failed to fetch user tickets !");
				const data = await res.json();
				setLocalData(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};
		fetchUserTickets();
	}, [refetch]);
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
				Shopping Cart
			</h1>
			{localData?.length < 1 && (
				<div className='w-full flex items-center justify-center text-2xl'>
					Shopping Cart is Empty !!
				</div>
			)}
			<div className='flex flex-col gap-3 max-h-[50vh] overflow-auto w-full'>
				{localData?.length > 0 &&
					localData?.map((item, ix) => (
						<CartItem
							key={ix}
							item={item}
							setRefetch={setRefetch}
						/>
					))}
			</div>
			{localData?.length > 0 && (
				<div className='w-full h-20 flex items-center justify-end gap-5 pr-5'>
					<div> Total : {localData?.length * 250} EGP</div>
					<button
						onClick={() => setShowCheckOutModal(true)}
						className='h-16 w-32 bg-green-500 text-white font-semibold rounded-lg'>
						Checkout!
					</button>
				</div>
			)}
			{showCheckOutModal && (
				<Modal
					setShowModal={setShowCheckOutModal}
					condition={"checkout"}
				/>
			)}
		</motion.div>
	);
}
