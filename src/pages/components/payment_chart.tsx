import Card from "@components/extras/card";
import {
    ArcElement,
    Chart,
    ChartConfiguration,
    Legend,
    Title,
    Tooltip,
} from "chart.js/auto";
import { useEffect, useRef } from "preact/hooks";

// Registrar componentes necesarios de Chart.js
Chart.register(ArcElement, Tooltip, Legend, Title);

interface PaymentData {
    label: string;
    value: number;
    color: string;
}

function PaymentPieChart() {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart<"pie"> | null>(null);

    useEffect(() => {
        // Datos para el gráfico
        const data: PaymentData[] = [
            { label: "Pagados", value: 70, color: "rgba(76, 175, 80, 0.8)" },
            { label: "Pendientes", value: 30, color: "rgba(244, 67, 54, 0.8)" },
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
                        text: "Estado de Pagos",
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
        <Card className="p-6">
            <div style={{ height: "350px", position: "relative" }}>
                <canvas ref={chartRef} />
            </div>
        </Card>
    );
}

export default PaymentPieChart;
