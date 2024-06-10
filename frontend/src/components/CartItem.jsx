import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { GiTrashCan } from "react-icons/gi";

export default function CartItem({ item, setRefetch }) {
	const [localData, setLocalData] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	useEffect(() => {
		let ignore = false;
		const fetchCartItem = async () => {
			try {
				setError(false);
				setLoading(true);
				const res = await fetch(
					`http://localhost:5000/api/events/${item?.event_id}`
				);
				if (!res.ok) throw new Error("failed to fetch cart item !");
				const data = await res.json();
				if (ignore) return;
				setLocalData(data);
			} catch (error) {
				setLocalData({});
				setError(true);
			} finally {
				setLoading(false);
			}
		};
		fetchCartItem();
		return () => {
			ignore = true;
		};
	}, [item]);
	const handleDelete = async () => {
		try {
			const res = await fetch(
				`http://localhost:5000/api/tickets/${item?._id}`,
				{
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
				}
			);
			if (!res.ok) throw new Error("failed to delete ticket!");
			setRefetch((p) => !p);
		} catch (error) {
			toast.error(error.message);
		}
	};
	if (loading)
		return (
			<div className='w-[60%] bg-zinc-500 mx-auto min-h-20 flex items-center justify-center'>
				<span className='h-10 w-10 rounded-full border-red-300 border-l-transparent animate-spin border-[3px]' />
			</div>
		);
	if (error)
		return (
			<div className='w-[60%] bg-zinc-500 mx-auto min-h-20 flex items-center justify-center'>
				<span>Something went wrong !</span>
			</div>
		);
	return (
		<div className='flex items-center justify-center w-full px-20 gap-10'>
			<div className='mx-auto min-h-24 w-full m-4 flex items-center justify-start overflow-hidden gap-3 rounded-lg shadow shadow-zinc-500'>
				<div className='max-w-24 h-full'>
					<img
						src={localData?.logo}
						alt=''
					/>
				</div>
				<div className='w-full flex flex-col'>
					<div className='flex items-center'>
						<span>Ticket Id: </span>
						<span className='font-semibold text-lg px-5'>{item?._id}</span>
					</div>
					<div className='flex items-center'>
						<span>Event Name: </span>
						<span className='font-semibold text-lg px-5'>
							{localData?.name}
						</span>
					</div>
					<div className='flex items-center'>
						<span>Number: </span>
						<span className='font-semibold text-lg px-5'>{item?.number}</span>
					</div>
					<div className='flex items-center'>
						<span>Show Time: </span>
						<span className='font-semibold text-lg px-5'>{item?.showTime}</span>
					</div>
					<div className='flex items-center'>
						<span>Address: </span>
						<span className='font-semibold text-lg px-5'>{item?.address}</span>
					</div>
				</div>
				<div className='flex items-center justify-end w-full pr-10 font-semibold text-xl'>
					<div>Price: 250 EGP</div>
				</div>
			</div>
			<div
				onClick={handleDelete}
				className='text-red-500 cursor-pointer'>
				<GiTrashCan size={30} />
			</div>
		</div>
	);
}
