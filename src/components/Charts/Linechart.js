import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import {Line} from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top",
		},
		title: {
			display: true,
			text: "Crop Amounts",
		},
	},
};

const labels = ["Carrot", "Beet", "Leeks", "Cabbage", "Garlic", "Ginger","Onions"];

export const data = {
	labels,
	datasets: [
		{
			label: "Last year crops",
			data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
			borderColor: "rgb(255, 99, 132)",
			backgroundColor: "rgba(255, 99, 132, 0.5)",
		},
		{
			label: "Current crops",
			data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
			borderColor: "rgb(53, 162, 235)",
			backgroundColor: "rgba(53, 162, 235, 0.5)",
		},
	],
};

function Linechart() {
	return (
		// eslint-disable-next-line react/react-in-jsx-scope
		<div className="chart">
			{/* eslint-disable-next-line react/react-in-jsx-scope */}
			<Line
				options={options}
				data={data}
			/>
		</div>
	);
}

export default Linechart;
