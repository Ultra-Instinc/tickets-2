import React from "react";

export default function GenderCheckBox({ inputs, setInputs }) {
	return (
		<div className='flex items-start h-10'>
			<div className='flex h-full items-center gap-2'>
				<label className='label gap-2 cursor-pointer'></label>
				<span className='label-text'>Male</span>
				<input
					type='checkbox'
					className='checkbox border-slate-900'
					checked={inputs.gender === "male"}
					onChange={() => setInputs({ ...inputs, gender: "male" })}
				/>
			</div>
			<div className='flex h-full items-center gap-2'>
				<label className='label gap-2 cursor-pointer'></label>
				<span className='label-text'>Female</span>
				<input
					type='checkbox'
					className='checkbox border-slate-900'
					checked={inputs.gender === "female"}
					onChange={() => setInputs({ ...inputs, gender: "female" })}
				/>
			</div>
		</div>
	);
}
