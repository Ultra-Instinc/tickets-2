import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
export default function Modal({
	setShowModal,
	condition,
	selectedRecord,
	setSelectedRecord,
	fullData,
	setFullData,
	fetchValue,
}) {
	const { authUser } = useAuthContext();
	const [loading, setLoading] = useState(false);
	const [selectedSeats, setSelectedSeats] = useState([]);
	const [movieOcupiedSeats, setMovieOccupiedSeats] = useState([]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (condition === "edit") {
			try {
				setLoading(true);
				const res = await fetch(
					`http://localhost:5000/api/movies/${selectedRecord?._id}`,
					{
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							name: selectedRecord?.name,
							release_date: selectedRecord?.release_date,
							rating: selectedRecord?.rating,
							logo: selectedRecord?.logo,
							available_tickets: selectedRecord?.available_tickets,
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
				const res = await fetch("http://localhost:5000/api/movies", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(selectedRecord),
				});
				if (!res.ok) throw new Error("Failed to create ");
				let arr = [];
				arr.push(selectedRecord);
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
					`http://localhost:5000/api/tickets?movie_id=${fetchValue}&user_id=${authUser?._id}`,
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
	};
	useEffect(() => {
		const fetchTickets = async () => {
			try {
				const res = await fetch(
					`http://localhost:5000/api/tickets?movie_id=${fetchValue}`
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
					className='min-w-[500px] min-h-96 bg-zinc-800 rounded-lg shadow-md flex flex-col p-10 gap-8 '>
					<h1>{condition === "create" ? "Insert Record!" : "Edit Record!"}</h1>
					<div className='w-full'>
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
						<label className='pl-2 text-zinc-400 font-semibold'>Rating</label>
						<input
							type='text'
							placeholder='Rating...'
							className='w-full h-10 px-2'
							value={selectedRecord?.rating || ""}
							onChange={(e) => {
								setSelectedRecord((prev) => ({
									...prev,
									rating: e.target.value,
								}));
							}}
						/>
					</div>
					<div className='w-full'>
						<label className='pl-2 text-zinc-400 font-semibold'>
							Available Tickets
						</label>
						<input
							type='text'
							placeholder='Available Tickets...'
							className='w-full h-10 px-2'
							value={selectedRecord?.available_tickets || ""}
							onChange={(e) => {
								setSelectedRecord((prev) => ({
									...prev,
									available_tickets: e.target.value,
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
					className='min-w-[500px]  bg-zinc-800 rounded-lg shadow-md flex flex-col p-10 gap-8'>
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
	}
}
