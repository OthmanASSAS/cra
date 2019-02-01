import React, { Component } from "react";
import Moment from "react-moment";
import moment from "moment";

import ActivityBlock from "../components/ActivityBlock/ActivityBlock";
import WeekSelected from "../components/WeekSelected/WeekSelected";
import "./App.css";

import Header from "../components/Header/Header";

class App extends Component {
	state = {
		activities: [
			"Maladie",
			"Visite médicale",
			"Démarches administratives",
			"Présentation client"
		],
		newActivity: "",
		date: moment().day("Monday"),
		dateSelected: "",
		datesWeek: [],
		globalData: {},
		dataGlobal: [],
		dataWeek: { 
			user_id: "", 
			date: "",
			values:[
				{
					activity_id:'',
					totalDay:[

					]
				}
			]
		},
		dataWeekGlobal: []
	};

	componentDidMount() {
		this.generateDates();
	}

	onChangeDate = forward => {
		const newDate = this.state.date;
		if (forward) {
			newDate.add(7, "days");
		} else {
			newDate.subtract(7, "days");
		}
		this.setState({ date: newDate }, this.generateDates);
	};

	addDate() {
		console.log("addDate");
		const newDate = this.state.date;
		newDate.add(7, "days");

		this.setState({ date: newDate }, this.generateDates);
	}
	subtractDate() {
		console.log("subtractDate");
		const newDate = this.state.date;
		newDate.subtract(7, "days");
		console.log("newDate", newDate);
		this.setState({ date: newDate }, this.generateDates);
		console.log(moment().weekday(3));
	}

	generateDates = () => {
		let dateClone = this.state.date.clone();
		let datesWeek = [dateClone.clone()];

		for (let i = 0; i <= 3; i++) {
			datesWeek.push(dateClone.add(1, "days").clone());
		}

		this.setState({ datesWeek });
	};

	renderDate() {
		const { datesWeek } = this.state;

		return datesWeek.map((date, index) => {
			return (
				<th key={index}>
					<Moment format="DD/MM/YYYY">{date}</Moment>
				</th>
			);
		});
	}

	getValue = (value, date, activity) => {
		const data = {
			id: `${moment(date).format("YYYY-MM-DD")}_${activity}`,
			name: activity,
			values: {
				date: moment(date).format("YYYY-MM-DD"),
				value: value.target.value
			}
		};

		let newDataGlobal = this.state.dataGlobal;

		//update

		let newDataGlobalFiltered = newDataGlobal.filter(
			element => element.id !== data.id
		);

		newDataGlobal = [...newDataGlobalFiltered, data];
		this.setState({ dataGlobal: newDataGlobal });
	};

	saveData = event => {
		event.preventDefault();
		console.log("Fonction saveData");
	};

	deleteActivity = activityIndex => {
		console.log("deleteActivity");
		const activities = [...this.state.activities];
		activities.splice(activityIndex, 1);
		this.setState({ activities });
	};

	renderActivityBlock() {
		return this.state.activities.map((activity, index) => {
			return (
				<ActivityBlock
					key={index}
					activity={activity}
					datesWeek={this.state.datesWeek}
					deleteActivity={() => this.deleteActivity(index)}
					getValue={this.getValue}
				/>
			);
		});
	}

	onChange(event) {
		this.setState({ newActivity: event.target.value });
	}

	addActivity(event) {
		event.preventDefault();
		console.log("addActivity");
		if (this.state.newActivity) {
			this.setState({
				activities: [...this.state.activities, this.state.newActivity],
				newActivity: ""
			});
		}
	}

	render() {
		console.log("this.state.dataGlobal", this.state.dataGlobal);
		return (
			<div className="wrap">
				<Header />
				<WeekSelected date={this.state.date} onChangeDate={this.onChangeDate} />
				<form onSubmit={event => this.addActivity(event)}>
					<input
						placeholder="Ajouter activité"
						value={this.state.newActivity}
						onChange={e => this.onChange(e)}
					/>
					<button type="submit">+</button>
				</form>

				<form>
					<table>
						<thead>
							<tr>
								<th>Activités Transverses France </th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th />
								{this.renderDate()}
							</tr>

							{this.renderActivityBlock()}
						</tbody>
					</table>
					<div className="div-valider">
						<button
							type="submit"
							className="btn-valider"
							onClick={this.saveData}
						>
							Valider
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default App;
