import React from "react";
import "./ActivityBlockItem.css";
const activityBlockItem = ({ activity, deleteActivity, datesWeek,getValue }) => {
	

	const renderInput = () => {
		return datesWeek.map((input, index) => {
			return (
				<td key={index}>
					<input type="number"  
					onChange={(event)=>getValue(event, input, activity)}
					/>
				</td>
			);
		});
	};

	return (
		<tr>
			<td>{activity}</td>
			{renderInput()}
			<td>
				<button onClick={deleteActivity}>X</button>
			</td>
		</tr>
	);
};

export default activityBlockItem;
