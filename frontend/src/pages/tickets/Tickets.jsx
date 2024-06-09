import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { GiCancel } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import Modal from "../../components/Modal";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
export default function Tickets() {
	const location = useLocation();
	const useParams = new URLSearchParams(location.search);
	const [showModal, setShowModal] = useState(false);
	const pageType = useParams.get("t");
	const [localData, setLocalData] = useState([]);
	const [condition, setCondition] = useState("");
	const [fetchValue, setFetchValue] = useState(null);
	const { authUser } = useAuthContext();
	const [orderModal, setShowOrderModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const ticketsType =
		pageType === "Th"
			? "Theater"
			: pageType === "Ci"
			? "Cinema"
			: pageType === "Pl"
			? "Play"
			: pageType === "Co"
			? "Concert"
			: "";

	const [selectedRecord, setSelectedRecord] = useState(null);
	const handleAdd = async () => {
		setCondition("create");
		setSelectedRecord({
			name: "",
			description: "",
			release_date: "",
			logo: "",
			description: "",
			type:
				ticketsType === "Theater"
					? "Theater"
					: ticketsType === "Cinema"
					? "Cinema"
					: ticketsType === "Concert"
					? "Concert"
					: ticketsType === "Play"
					? "Play"
					: "",
		});
		setShowModal(true);
	};
	const handleEdit = (record) => {
		setCondition("edit");
		setSelectedRecord(record);
		setShowModal(true);
	};
	const handleDelete = async (item) => {
		try {
			const res = await fetch(`http://localhost:5000/api/events/${item?._id}`, {
				method: "DELETE",
			});
			if (!res.ok) throw new Error("Failed to delete !");
			setLocalData((p) => p.filter((item2) => item2?._id !== item?._id));
			toast.success("Item deleted successfully!");
		} catch (error) {
			toast.error("Failed to delete !");
		}
	};
	const handleOrder = (item) => {
		setFetchValue(item);
		setShowOrderModal(true);
	};
	useEffect(() => {
		setLoading(true);
		setError(false);
		const fetchMovies = async () => {
			try {
				const res = await fetch(
					`http://localhost:5000/api/events?filter=${ticketsType}`,
					{
						method: "GET",
					}
				);
				if (!res.ok) throw new Error("Failed to fetch !");
				const data = await res.json();
				setLocalData(data);
			} catch (error) {
				console.log(error);
				toast.error(error.message);
				setError(true);
			} finally {
				setLoading(false);
			}
		};
		fetchMovies();
	}, []);
	if (error) return <div>Something went wrong !</div>;
	if (loading)
		return (
			<div className='w-full h-[80vh] flex items-center justify-center'>
				<span className='h-12 w-12 rounded-full border-4 border-red-300 border-l-transparent animate-spin' />
			</div>
		);
	return (
		<motion.div
			layout
			initial={{ x: "200%" }}
			animate={{ x: 0 }}
			className=' w-full h-[calc(100vh_-_170px)] flex flex-col overflow-y-auto justify-start items-center gap-5 relative'>
			{authUser?.username === "admin" && (
				<div className='w-full min-h-20 flex items-center justify-end px-20 sticky top-0 z-10 rounded-lgbackdrop-filter backdrop-blur-md bg-clip-padding bg-opacity-100'>
					<button
						title='add'
						onClick={handleAdd}
						className='min-h-10 w-32 rounded-lg flex items-center justify-center top-2 right-8 text-white bg-green-400 hover:opacity-90 text-lg font-semibold'>
						<div>
							<IoCreate size={20} />
						</div>
						<div>Add</div>
					</button>
				</div>
			)}
			{localData?.length > 0 &&
				localData?.map((item, ix) => (
					<div
						key={ix}
						className='w-[90%] h-32 hover:h-64 flex rounded-xl group overflow-hidden cursor-pointer hover:opacity-95 transition-all duration-500 relative'>
						{authUser?.username === "admin" && (
							<>
								<span
									title='edit'
									onClick={() => handleEdit(item)}
									className='absolute h-6 w-6 rounded-lg flex items-center justify-center top-2 right-8 text-blue-400 opacity-0 group-hover:opacity-100 delay-100 hover:opacity-90'>
									<FaEdit size={17} />
								</span>
								<span
									title='delete'
									onClick={() => handleDelete(item)}
									className='absolute h-6 w-6 rounded-lg flex items-center justify-center top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 delay-100 hover:opacity-90'>
									<GiCancel />
								</span>
							</>
						)}
						<div className='flex-[0.2] transition-all duration-300 '>
							<img
								src={item?.logo}
								defaultValue={""}
								alt='logo'
								className='object-cover h-full w-full'
							/>
						</div>
						<div className='flex-[0.8] flex gap-5 bg-gray-900/60 text-white'>
							<div className='flex-1 flex items-start justify-center mx-5 flex-col '>
								<p className='font-semibold text-[2rem]'>{item?.name} </p>
								<p className='font-normal'>Released : {item?.release_date}</p>
								<p className='font-normal line-clamp-2 group-hover:line-clamp-none transition-all duration-300 delay-200 '>
									Descruption : {item?.description}
								</p>
							</div>
							<div
								onClick={() => handleOrder(item?._id)}
								className='flex-[0.5] flex flex-col items-start justify-center gap-5 h-full'>
								<div className='bg-green-500 rounded-lg font-semibold mx-auto h-[70px] opacity-0 group-hover:opacity-100 w-[45%] min-w-32 flex items-center justify-center transition-all duration-300 active:scale-95'>
									Book Now!
								</div>
							</div>
						</div>
					</div>
				))}
			{localData?.length < 1 && (
				<div className='w-full flex items-center justify-center text-4xl text-red-400 '>
					No records Were Found !
				</div>
			)}
			{showModal && (
				<Modal
					setShowModal={setShowModal}
					selectedRecord={selectedRecord}
					setSelectedRecord={setSelectedRecord}
					condition={condition}
					fullData={localData}
					setFullData={setLocalData}
				/>
			)}
			{orderModal && (
				<Modal
					setShowModal={setShowOrderModal}
					selectedRecord={selectedRecord}
					setSelectedRecord={setSelectedRecord}
					condition={"order"}
					fetchValue={fetchValue}
					fullData={localData}
					setFullData={setLocalData}
				/>
			)}
		</motion.div>
	);
}
