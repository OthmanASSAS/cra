import React from "react";
import Moment from "react-moment";
import moment from "moment";
import "./WeekSelected.css";

const weekSelected = ({ date, onChangeDate }) => {
	return (
		<div className="container">
			<button onClick={() => onChangeDate(false)}>Précédente</button>
			<div>
				<Moment format="DD/MM/YY">{date}</Moment> au{" "}
				<Moment format="DD/MM/YY" add={{ days: 4 }}>
					{date}
				</Moment>
			</div>
			<button onClick={() => onChangeDate(true)}>Suivante</button>
		</div>
	);
};

export default weekSelected;
