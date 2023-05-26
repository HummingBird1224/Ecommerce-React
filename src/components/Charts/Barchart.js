import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
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
			text: "Crop amount details",
		},
	},
};

const labels = ["Carrot", "Beet", "Leeks", "Cabbage", "Garlic", "Ginger", "Onions"];

export const data = {
	labels,
	datasets: [
		{
			label: "Last year amount",
			data: [100,200,300,400,500,600,700],
			backgroundColor: "rgb(0,21,255)",
		}
	],
};


function Barchart() {
	return (
		// eslint-disable-next-line react/react-in-jsx-scope
		<div className="chart">
			{/* eslint-disable-next-line react/react-in-jsx-scope */}
			<Bar
				options={options}
				data={data}
			/>
		</div>
	);
}

export default Barchart;
