import {
	Chart,
	ChartConfiguration,
	BarController,
	BarElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend,
	Title,
} from "chart.js";
import { useEffect, useRef } from "preact/hooks";

// Registrar componentes necesarios de Chart.js
Chart.register(
	BarController,
	BarElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend,
	Title,
);

interface TeacherData {
	label: string;
	value: number;
}

const TeacherChart = () => {
	const chartRef = useRef<HTMLCanvasElement | null>(null);
	const chartInstance = useRef<Chart<"bar"> | null>(null);

	useEffect(() => {
		// Datos para el gráfico
		const data: TeacherData[] = [
			{ label: "Prof. García", value: 20 },
			{ label: "Prof. López", value: 10 },
			{ label: "Prof. Rivera", value: 25 },
		];

		// Configuración del gráfico con tipos TypeScript
		const config: ChartConfiguration<"bar"> = {
			type: "bar",
			data: {
				labels: data.map((item) => item.label),
				datasets: [
					{
						label: "Número de clases",
						data: data.map((item) => item.value),
						backgroundColor: [
							"rgba(54, 162, 235, 0.8)",
							"rgba(75, 192, 192, 0.8)",
							"rgba(153, 102, 255, 0.8)",
						],
						borderColor: [
							"rgb(54, 162, 235)",
							"rgb(75, 192, 192)",
							"rgb(153, 102, 255)",
						],
						borderWidth: 1,
						borderRadius: 4,
						barThickness: 30,
					},
				],
			},
			options: {
				indexAxis: "y",
				layout: {
					padding: {
						left: 20,
						right: 20,
						top: 0,
						bottom: 0,
					},
				},
				plugins: {
					legend: {
						display: true,
						position: "top",
					},
					title: {
						display: true,
						text: "Clases por Profesor",
						font: {
							size: 16,
						},
					},
					tooltip: {
						callbacks: {
							label: (context) => `Clases: ${context.raw}`,
						},
					},
				},
				scales: {
					x: {
						beginAtZero: true,
						title: {
							display: true,
							text: "Número de clases",
						},
						ticks: {
							stepSize: 5,
						},
					},
					y: {
						title: {
							display: true,
							text: "Profesores",
						},
					},
				},
				maintainAspectRatio: false,
				responsive: true,
			},
		};

		// Crear el gráfico
		if (chartRef.current) {
			// Destruir instancia anterior si existe
			if (chartInstance.current) {
				chartInstance.current.destroy();
			}

			chartInstance.current = new Chart(chartRef.current, config);
		}

		// Limpieza al desmontar el componente
		return () => {
			if (chartInstance.current) {
				chartInstance.current.destroy();
			}
		};
	}, []);

	return (
		<div
			style={{
				width: "100%",
				maxWidth: "600px",
				margin: "0 auto",
				padding: "20px",
				backgroundColor: "#f5f5f5",
				borderRadius: "8px",
				boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
			}}
		>
			<div style={{ height: "300px" }}>
				<canvas ref={chartRef} />
			</div>
		</div>
	);
};

export default TeacherChart;
