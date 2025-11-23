import Card from "@components/extras/card";
import {
    ArcElement,
    Chart,
    ChartConfiguration,
    Legend,
    Title,
    Tooltip,
} from "chart.js";
import { useEffect, useRef } from "react";

// Registrar componentes necesarios de Chart.js
Chart.register(ArcElement, Tooltip, Legend, Title);

interface AttendanceData {
    label: string;
    value: number;
    color: string;
}

function AsistenciaChart() {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart<"pie"> | null>(null);

    useEffect(() => {
        // Datos para el gráfico
        const data: AttendanceData[] = [
            {
                label: "Asistencias",
                value: 80,
                color: "rgba(76, 175, 80, 0.8)",
            },
            {
                label: "Inasistencias",
                value: 20,
                color: "rgba(244, 67, 54, 0.8)",
            },
        ];

        // Configuración del gráfico
        const config: ChartConfiguration<"pie"> = {
            type: "pie",
            data: {
                labels: data.map((item) => item.label),
                datasets: [
                    {
                        data: data.map((item) => item.value),
                        backgroundColor: data.map((item) => item.color),
                        borderColor: data.map((item) =>
                            item.color.replace("0.8", "1")
                        ),
                        borderWidth: 2,
                        hoverOffset: 15,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "bottom",
                        labels: {
                            color: "#333",
                            font: {
                                size: 14,
                                weight: "bold",
                            },
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: "circle",
                        },
                    },
                    title: {
                        display: true,
                        text: "Porcentaje de Asistencia",
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
                        callbacks: {
                            label: (context) => {
                                const label = context.label || "";
                                const value = context.parsed || 0;
                                return `${label}: ${value}%`;
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
        <Card className="p-4">
            <div style={{ height: "350px", position: "relative" }}>
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
                    textAlign: "center",
                }}
            >
                <p style={{ margin: "0 0 8px 0", fontWeight: "bold" }}>
                    Resumen:
                </p>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "20px",
                        flexWrap: "wrap",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                            style={{
                                width: "16px",
                                height: "16px",
                                backgroundColor: "rgba(76, 175, 80, 0.8)",
                                borderRadius: "50%",
                                marginRight: "8px",
                            }}
                        />
                        <span>Asistencias: 80%</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                            style={{
                                width: "16px",
                                height: "16px",
                                backgroundColor: "rgba(244, 67, 54, 0.8)",
                                borderRadius: "50%",
                                marginRight: "8px",
                            }}
                        />
                        <span>Inasistencias: 20%</span>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default AsistenciaChart;
