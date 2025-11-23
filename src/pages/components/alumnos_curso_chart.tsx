import {
    BarController,
    BarElement,
    CategoryScale,
    Chart,
    ChartConfiguration,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from "chart.js";
import { useEffect, useRef } from "react";

// Registrar componentes necesarios de Chart.js
Chart.register(
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title
);

interface CourseData {
    label: string;
    value: number;
}

function AlumnosCursoChart() {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart<"bar"> | null>(null);

    useEffect(() => {
        // Datos para el gráfico
        const data: CourseData[] = [
            { label: "Curso A", value: 120 },
            { label: "Curso B", value: 75 },
            { label: "Curso C", value: 180 },
            { label: "Curso D", value: 40 },
        ];

        // Configuración del gráfico
        const config: ChartConfiguration<"bar"> = {
            type: "bar",
            data: {
                labels: data.map((item) => item.label),
                datasets: [
                    {
                        label: "Cantidad",
                        data: data.map((item) => item.value),
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.8)",
                            "rgba(54, 162, 235, 0.8)",
                            "rgba(75, 192, 192, 0.8)",
                            "rgba(153, 102, 255, 0.8)",
                        ],
                        borderColor: [
                            "rgb(255, 99, 132)",
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
                        display: false,
                    },
                    title: {
                        display: true,
                        text: "Distribución de Cursos",
                        font: {
                            size: 18,
                            weight: "bold",
                        },
                        padding: {
                            top: 10,
                            bottom: 20,
                        },
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => `Cantidad: ${context.raw}`,
                        },
                    },
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: "Cantidad",
                            font: {
                                weight: "bold",
                            },
                        },
                        ticks: {
                            stepSize: 30,
                        },
                        grid: {
                            color: "rgba(0, 0, 0, 0.1)",
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Cursos",
                            font: {
                                weight: "bold",
                            },
                        },
                        grid: {
                            color: "rgba(0, 0, 0, 0.1)",
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
                maxWidth: "650px",
                margin: "2rem auto",
                padding: "1.5rem",
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
        >
            <div style={{ height: "350px" }}>
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
                <p style={{ margin: "0 0 8px 0", fontWeight: "bold" }}>
                    Leyenda:
                </p>
                <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
                    <li>Curso A: 120 estudiantes</li>
                    <li>Curso B: 75 estudiantes</li>
                    <li>Curso C: 180 estudiantes</li>
                    <li>Curso D: 40 estudiantes</li>
                </ul>
            </div>
        </div>
    );
}

export default AlumnosCursoChart;
