import React, { Component } from "react";
import "./ActivityBlock.css";
import ActivityBlockItem from "../ActivityBlockItem/ActivityBlockItem";

export default class ActivityBlock extends Component {
	render() {
		const { activity, deleteActivity, datesWeek,getValue } = this.props;
		return (
			<ActivityBlockItem
				activity={activity}
				deleteActivity={deleteActivity}
				datesWeek={datesWeek}
				getValue={getValue}
			/>
		);
	}
}
