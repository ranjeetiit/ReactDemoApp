import React from 'React';

const InputFilter = (props) =>{
	return (
		<div className="input-filter">
			<span className="title">Search By Name: </span>
			<input 
				type= "text"
				placeholder="Search By Name"
				onChange ={props.filterByName}
				value = {props.nameFilterVal}
			/>
			<span>&nbsp;&nbsp;&nbsp;</span>
			<span className="title">Filter By Gender: </span>
			<select 
				type="text"
				placeholder="Search By Gender"
				onChange = {props.filterByGender}
				value = {props.genderFilterVal}
			>
				<option value="">All gender</option>
				<option value="male">male</option>
				<option value="female">female</option>
			</select>
		</div>
	)
}


export default InputFilter;