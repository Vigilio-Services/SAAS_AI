import {
	Chart,
	ChartConfiguration,
	BarController,
	BarElement,
	LineController,
	LineElement,
	PointElement,
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
	LineController,
	LineElement,
	PointElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend,
	Title,
);

interface MixedChartData {
	labels: string[];
	classesCompleted: number[];
	averageGrades: number[];
}

function MixedChart() {
	const chartRef = useRef<HTMLCanvasElement | null>(null);
	const chartInstance = useRef<Chart | null>(null);

	useEffect(() => {
		// Datos para el gráfico
		const data: MixedChartData = {
			labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
			classesCompleted: [12, 19, 15, 17, 16, 20],
			averageGrades: [7.2, 7.8, 8.1, 8.5, 8.7, 9.0],
		};

		// Configuración del gráfico mixto
		const config: ChartConfiguration = {
			type: "bar",
			data: {
				labels: data.labels,
				datasets: [
					{
						type: "bar",
						label: "Clases completadas",
						data: data.classesCompleted,
						backgroundColor: "rgba(54, 162, 235, 0.6)",
						borderColor: "rgb(54, 162, 235)",
						borderWidth: 2,
						borderRadius: 4,
						order: 2,
					},
					{
						type: "line",
						label: "Nota promedio",
						data: data.averageGrades,
						backgroundColor: "rgba(255, 99, 132, 0.2)",
						borderColor: "rgb(255, 99, 132)",
						borderWidth: 3,
						pointBackgroundColor: "rgb(255, 99, 132)",
						pointBorderColor: "#fff",
						pointRadius: 5,
						pointHoverRadius: 7,
						fill: false,
						tension: 0.3,
						order: 1,
						yAxisID: "y1",
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						position: "top",
						labels: {
							color: "#333",
							font: {
								size: 14,
								weight: "bold",
							},
							padding: 20,
							usePointStyle: true,
						},
					},
					title: {
						display: true,
						text: "Progreso Académico",
						font: {
							size: 18,
							weight: "bold",
						},
						padding: {
							top: 10,
							bottom: 20,
						},
						color: "#333",
					},
					tooltip: {
						mode: "index",
						intersect: false,
						callbacks: {
							label: (context) => {
								let label = context.dataset.label || "";
								if (label) {
									label += ": ";
								}
								if (context.datasetIndex === 0) {
									label += `${context.parsed.y} clases`;
								} else {
									label += context.parsed.y.toFixed(1);
								}
								return label;
							},
						},
						backgroundColor: "rgba(0, 0, 0, 0.7)",
						titleFont: {
							size: 14,
						},
						bodyFont: {
							size: 14,
						},
						padding: 10,
					},
				},
				scales: {
					x: {
						title: {
							display: true,
							text: "Meses",
							font: {
								weight: "bold",
							},
						},
						grid: {
							color: "rgba(0, 0, 0, 0.1)",
						},
					},
					y: {
						type: "linear",
						display: true,
						position: "left",
						title: {
							display: true,
							text: "Clases completadas",
							font: {
								weight: "bold",
							},
						},
						min: 0,
						max: 25,
						grid: {
							color: "rgba(0, 0, 0, 0.1)",
						},
					},
					y1: {
						type: "linear",
						display: true,
						position: "right",
						title: {
							display: true,
							text: "Nota promedio",
							font: {
								weight: "bold",
							},
						},
						min: 0,
						max: 10,
						grid: {
							drawOnChartArea: false,
						},
					},
				},
				layout: {
					padding: {
						top: 10,
						bottom: 10,
					},
				},
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
				maxWidth: "800px",
				margin: "2rem auto",
				padding: "1.5rem",
				backgroundColor: "#ffffff",
				borderRadius: "12px",
				boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
				fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
			}}
		>
			<div style={{ height: "450px", position: "relative" }}>
				<canvas ref={chartRef} />
			</div>

			<div
				style={{
					marginTop: "1.5rem",
					padding: "1rem",
					backgroundColor: "#f8f9fa",
					borderRadius: "8px",
					fontSize: "14px",
					color: "#555",
				}}
			>
				<p style={{ margin: "0 0 12px 0", fontWeight: "bold" }}>
					Resumen del progreso:
				</p>
				<ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
					<li>
						Las{" "}
						<span
							style={{
								color: "rgb(54, 162, 235)",
								fontWeight: "bold",
							}}
						>
							barras azules
						</span>{" "}
						representan la cantidad de clases completadas cada mes
					</li>
					<li>
						La{" "}
						<span
							style={{
								color: "rgb(255, 99, 132)",
								fontWeight: "bold",
							}}
						>
							línea roja
						</span>{" "}
						muestra la evolución de la nota promedio acumulada
					</li>
					<li>
						Se observa una tendencia positiva en el rendimiento académico a
						medida que avanzan los meses
					</li>
				</ul>
			</div>
		</div>
	);
}

export default MixedChart;
