import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Modal({
	setShowModal,
	condition,
	selectedRecord,
	setSelectedRecord,
	fullData,
	setFullData,
	fetchValue,
	price,
}) {
	const { authUser } = useAuthContext();
	const [loading, setLoading] = useState(false);
	const [selectedSeats, setSelectedSeats] = useState([]);
	const [movieOcupiedSeats, setMovieOccupiedSeats] = useState([]);
	const navigate = useNavigate();
	console.log({ selectedRecord });
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (condition === "edit") {
			try {
				setLoading(true);
				const res = await fetch(
					`http://localhost:5000/api/events/${selectedRecord?._id}`,
					{
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							name: selectedRecord?.name,
							release_date: selectedRecord?.release_date,
							description: selectedRecord?.description,
							logo: selectedRecord?.logo,
							address: selectedRecord?.address,
							showTime: selectedRecord?.showTime,
						}),
					}
				);
				if (!res.ok) throw new Error("Failed to edit ");
				setFullData(
					fullData?.map((item) => {
						if (item?._id === selectedRecord?._id) {
							return { ...selectedRecord };
						} else return { ...item };
					})
				);
				toast.success("Record Updated !");
			} catch (error) {
				toast.error("Failed to update !");
			} finally {
				setLoading(false);
				setShowModal(false);
			}
		}
		if (condition === "create") {
			try {
				setLoading(true);
				const res = await fetch("http://localhost:5000/api/events", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(selectedRecord),
				});
				if (!res.ok) throw new Error("Failed to create ");
				const data = await res.json();
				console.log({ data });
				let arr = [];
				arr.push(data);
				setFullData([...arr, ...fullData]);
				toast.success("Record Created !");
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
				setShowModal(false);
			}
		}
		if (condition === "order") {
			try {
				setLoading(true);
				const res = await fetch(
					`http://localhost:5000/api/tickets?event_id=${fetchValue}&user_id=${authUser?._id}`,
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ seats: selectedSeats }),
					}
				);
				if (!res.ok) throw new Error("Failed to sumbit order !");
				const data = await res.json();
				toast.success("Tickets added to cart !");
				console.log({ data });
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
				setShowModal(false);
			}
		}
		if (condition === "checkout") {
			try {
				const res = await fetch("http://localhost:5000/api/transactions", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						user_id: authUser?._id,
						price,
					}),
				});
				if (!res.ok) throw new Error("failed to create transaction !");
				toast.success("transaction created successfully !");
				const res2 = await fetch(
					`http://localhost:5000/api/tickets?user_id=${authUser?._id}`,
					{
						method: "DELETE",
						headers: { "Content-Type": "application/json" },
					}
				);
				if (!res2.ok) throw new Error("failed to delete tickets!");
				setTimeout(() => {
					navigate("/transactions");
				}, 1000);
				navigate;
				setShowModal(false);
			} catch (error) {
				console.log(error);
				toast.error(error.message);
			}
		}
	};
	useEffect(() => {
		const fetchTickets = async () => {
			try {
				const res = await fetch(
					`http://localhost:5000/api/tickets?event_id=${fetchValue}`
				);
				if (!res.ok) throw new Error("failed to place order !");
				const data = await res.json();
				console.log({ data: data?.data });
				let arr = [];
				data?.forEach((item) => {
					arr.push(item?.number);
					console.log({ item });
				});
				setMovieOccupiedSeats(arr);
			} catch (error) {
				setMovieOccupiedSeats([]);
				toast.error(error.message);
			}
		};
		if (condition === "order") {
			fetchTickets();
		}
	}, []);
	if (condition === "edit" || condition === "create") {
		return ReactDOM.createPortal(
			<div
				className={`flex z-[101] fixed inset-0 bg-gray-900/80 items-center justify-center overflow-hidden`}>
				<form
					onSubmit={handleSubmit}
					className='min-w-[500px]  min-h-96 bg-zinc-800 rounded-lg shadow-md flex flex-col p-10 gap-2 relative'>
					<div
						onClick={() => setShowModal(false)}
						className='absolute top-5 right-5 h-5 w-5 rounded-lg bg-red-400 flex items-center justify-center text-white cursor-pointer hover:rotate-180 transition-all duration-200 text-xs'>
						X
					</div>
					<h1>{condition === "create" ? "Insert Record!" : "Edit Record!"}</h1>
					<div className='w-full '>
						<label className='pl-2 text-zinc-400 font-semibold'>Title</label>
						<input
							type='text'
							placeholder='Title...'
							className='w-full h-10 px-2'
							value={selectedRecord?.name || ""}
							onChange={(e) => {
								setSelectedRecord((prev) => ({
									...prev,
									name: e.target.value,
								}));
							}}
						/>
					</div>
					<div className='w-full'>
						<label className='pl-2 text-zinc-400 font-semibold'>Release</label>
						<input
							type='text'
							placeholder='Release Date...'
							className='w-full h-10 px-2'
							value={selectedRecord?.release_date || ""}
							onChange={(e) => {
								setSelectedRecord((prev) => ({
									...prev,
									release_date: e.target.value,
								}));
							}}
						/>
					</div>
					<div className='w-full'>
						<label className='pl-2 text-zinc-400 font-semibold'>
							Show Time
						</label>
						<input
							type='text'
							placeholder='Show Time...'
							className='w-full h-10 px-2'
							value={selectedRecord?.showTime || ""}
							onChange={(e) => {
								setSelectedRecord((prev) => ({
									...prev,
									showTime: e.target.value,
								}));
							}}
						/>
					</div>
					<div className='w-full'>
						<label className='pl-2 text-zinc-400 font-semibold'>Address</label>
						<input
							type='text'
							placeholder='Address...'
							className='w-full h-10 px-2'
							value={selectedRecord?.address || ""}
							onChange={(e) => {
								setSelectedRecord((prev) => ({
									...prev,
									address: e.target.value,
								}));
							}}
						/>
					</div>
					<div className='w-full'>
						<label className='pl-2 text-zinc-400 font-semibold'>Image</label>
						<input
							type='text'
							placeholder='Image...'
							className='w-full h-10 px-2'
							value={selectedRecord?.logo || ""}
							onChange={(e) => {
								setSelectedRecord((prev) => ({
									...prev,
									logo: e.target.value,
								}));
							}}
						/>
					</div>
					<div className='w-full'>
						<label className='pl-2 text-zinc-400 font-semibold'>
							Description
						</label>
						<textarea
							name=''
							id=''
							cols='30'
							rows='5'
							className='w-full h-auto px-2'
							value={selectedRecord?.description || ""}
							onChange={(e) => {
								setSelectedRecord((prev) => ({
									...prev,
									description: e.target.value,
								}));
							}}></textarea>
					</div>
					<div className='flex items-center justify-end h-10 w-full gap-5 '>
						<button
							type='submit'
							className='flex items-center justify-center rounded-lg w-20 h-10 bg-green-400 text-white hover:scale-[101%] active:scale-[99%]'>
							{loading ? (
								<span className='h-6 w-6 border-2 border-white rounded-full animate-spin border-l-transparent' />
							) : (
								"Confirm"
							)}
						</button>
						<button
							onClick={() => setShowModal(false)}
							className='flex items-center justify-center rounded-lg w-20 h-10 bg-red-400 text-white hover:scale-[101%] active:scale-[99%]'>
							Close
						</button>
					</div>
				</form>
			</div>,
			document.querySelector(".modal_container")
		);
	} else if (condition === "order") {
		return ReactDOM.createPortal(
			<div
				className={`flex z-[101] fixed inset-0 bg-gray-900/80 items-center justify-center overflow-hidden`}>
				<form
					onSubmit={handleSubmit}
					className='min-w-[500px] bg-zinc-800 rounded-lg shadow-md flex flex-col p-10 gap-2 relative'>
					<div
						onClick={() => setShowModal(false)}
						className='absolute top-5 right-5 h-5 w-5 rounded-lg bg-red-400 flex items-center justify-center text-white cursor-pointer hover:rotate-180 transition-all duration-200 text-xs'>
						X
					</div>
					<h1 className=''>{"Manage Order!"}</h1>
					<p>{"Select Your seat(s) below"}</p>
					<div className='grid grid-cols-12 max-h-[450px] overflow-auto'>
						{Array(200)
							.fill(0)
							.map((_, ix) => {
								return (
									<div
										onClick={() => {
											if (movieOcupiedSeats?.includes(ix + 1)) {
												return;
											} else if (
												!movieOcupiedSeats?.includes(ix + 1) &&
												selectedSeats?.includes(ix + 1)
											) {
												setSelectedSeats(
													selectedSeats?.map((item) => {
														if (item === ix + 1) {
															return -1;
														} else return item;
													})
												);
											} else {
												setSelectedSeats((p) => {
													return [...p, ix + 1];
												});
											}
										}}
										key={ix}
										className={`p-1 rounded-lg flex items-center justify-center m-1 cursor-pointer ${
											movieOcupiedSeats?.includes(ix + 1)
												? "bg-red-500/40"
												: selectedSeats?.includes(ix + 1)
												? "bg-green-500/40"
												: "bg-blue-500/40"
										}`}>
										{ix + 1}
									</div>
								);
							})}
					</div>
					<div className='flex items-center justify-end h-10 w-full gap-5 '>
						<button
							type='submit'
							className='flex items-center justify-center rounded-lg w-20 h-10 bg-green-400 text-white hover:scale-[101%] active:scale-[99%]'>
							{loading ? (
								<span className='h-6 w-6 border-2 border-white rounded-full animate-spin border-l-transparent' />
							) : (
								"Confirm"
							)}
						</button>
						<button
							onClick={() => setShowModal(false)}
							className='flex items-center justify-center rounded-lg w-20 h-10 bg-red-400 text-white hover:scale-[101%] active:scale-[99%]'>
							Close
						</button>
					</div>
				</form>
			</div>,
			document.querySelector(".modal_container")
		);
	} else if (condition === "checkout") {
		return ReactDOM.createPortal(
			<div
				className={`flex z-[101] fixed inset-0 bg-gray-900/80 items-center justify-center overflow-hidden`}>
				<form
					onSubmit={handleSubmit}
					className='min-w-[500px] min-h-56 bg-zinc-800 rounded-lg shadow-md flex flex-col p-10 gap-2 relative'>
					<div
						onClick={() => setShowModal(false)}
						className='absolute top-5 right-5 h-5 w-5 rounded-lg bg-red-400 flex items-center justify-center text-white cursor-pointer hover:rotate-180 transition-all duration-200 text-xs'>
						X
					</div>
					<h1 className='font-semibold text-xl mb-10'>{"Payment"}</h1>
					<h1 className='font-semibold text-xl mb-10'>
						{"Are you sure you want to continue ?"}
					</h1>
					<div className='flex items-center justify-center h-full w-full gap-5  '>
						<button
							type='submit'
							className='flex items-center justify-center rounded-lg h-10 bg-green-400 text-white hover:scale-[101%] active:scale-[99%] px-2 w-fit min-w-32'>
							{loading ? (
								<span className='h-6 w-6 border-2 border-white rounded-full animate-spin border-l-transparent' />
							) : (
								"Yes"
							)}
						</button>
						<button
							onClick={() => setShowModal(false)}
							className='flex items-center justify-center rounded-lg  h-10 bg-red-400 text-white hover:scale-[101%] active:scale-[99%] w-fit min-w-32'>
							No
						</button>
					</div>
				</form>
			</div>,
			document.querySelector(".modal_container")
		);
	}
}
