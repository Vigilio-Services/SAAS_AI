import Card from "@components/extras/card";
import {
    CategoryScale,
    Chart,
    ChartConfiguration,
    Legend,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import { useEffect, useRef } from "preact/hooks";

// Registrar componentes necesarios de Chart.js
Chart.register(
    LineController,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title
);

interface EnrollmentData {
    labels: string[];
    enrollments: number[];
}

const CantidadEstudiantesChart = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart<"line"> | null>(null);

    useEffect(() => {
        // Datos para el gráfico (ejemplo de crecimiento de inscripciones)
        const data: EnrollmentData = {
            labels: [
                "Ene",
                "Feb",
                "Mar",
                "Abr",
                "May",
                "Jun",
                "Jul",
                "Ago",
                "Sep",
                "Oct",
                "Nov",
                "Dic",
            ],
            enrollments: [
                120, 145, 163, 188, 210, 235, 263, 290, 320, 355, 390, 430,
            ],
        };

        // Configuración del gráfico de línea
        const config: ChartConfiguration<"line"> = {
            type: "line",
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: "Número de estudiantes",
                        data: data.enrollments,
                        backgroundColor: "rgba(54, 162, 235, 0.2)",
                        borderColor: "rgb(54, 162, 235)",
                        borderWidth: 3,
                        pointBackgroundColor: "rgb(54, 162, 235)",
                        pointBorderColor: "#fff",
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        fill: true,
                        tension: 0.3,
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
                        },
                    },
                    title: {
                        display: true,
                        text: "Tendencia de Inscripciones Mensuales",
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
                            label: (context) =>
                                `Estudiantes: ${context.parsed.y}`,
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
                        title: {
                            display: true,
                            text: "Número de estudiantes",
                            font: {
                                weight: "bold",
                            },
                        },
                        min: 0,
                        suggestedMax: 500,
                        grid: {
                            color: "rgba(0, 0, 0, 0.1)",
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
        <Card className="p-6">
            <div style={{ height: "400px", position: "relative" }}>
                <canvas ref={chartRef} />
            </div>
        </Card>
    );
};

export default CantidadEstudiantesChart;
