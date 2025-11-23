import Button from "@components/extras/button";
import Card from "@components/extras/card";
import { faker } from "@faker-js/faker";
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
import { useEffect, useRef } from "preact/hooks";

// Registrar Chart.js
Chart.register(
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title
);

interface LeaderboardAlumno {
    name: string;
    score: number;
    photo: string; // URL de la foto del alumno
}

const LeaderboardTopAlumnos = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart<"bar"> | null>(null);

    useEffect(() => {
        // Ejemplo: Top 3 alumnos
        const alumnos: LeaderboardAlumno[] = [
            { name: "Juan Pérez", score: 95, photo: faker.image.avatar() },
            { name: "María López", score: 88, photo: faker.image.avatar() },
            { name: "Carlos García", score: 82, photo: faker.image.avatar() },
        ];

        const config: ChartConfiguration<"bar"> = {
            type: "bar",
            data: {
                labels: alumnos.map((a) => a.name),
                datasets: [
                    {
                        label: "Puntaje",
                        data: alumnos.map((a) => a.score),
                        backgroundColor: [
                            "rgba(255, 215, 0, 0.8)", // oro
                            "rgba(192, 192, 192, 0.8)", // plata
                            "rgba(205, 127, 50, 0.8)", // bronce
                        ],
                        borderColor: [
                            "rgb(255, 215, 0)",
                            "rgb(192, 192, 192)",
                            "rgb(205, 127, 50)",
                        ],
                        borderWidth: 2,
                        borderRadius: 8,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: "🏆 Leaderboard: Top 3 Alumnos",
                        font: { size: 18, weight: "bold" },
                        color: "#333",
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return `${context.label}: ${context.parsed.y} pts`;
                            },
                        },
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        bodyFont: { size: 14 },
                        padding: 10,
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "Alumnos",
                            font: { weight: "bold" },
                        },
                        ticks: {
                            callback: (_, index) => {
                                return alumnos[index].name;
                            },
                        },
                        grid: { display: false },
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: "Puntaje",
                            font: { weight: "bold" },
                        },
                        grid: { color: "rgba(0,0,0,0.1)" },
                    },
                },
            },
            plugins: [
                {
                    id: "imagesOnAxis",
                    afterDraw: (chart) => {
                        const ctx = chart.ctx;
                        const xAxis = chart.scales.x;
                        const yAxis = chart.scales.y;

                        alumnos.forEach((alumno, i) => {
                            const x = xAxis.getPixelForTick(i);
                            const y = chart.height - 40; // posición bajo el eje
                            const img = new Image();
                            img.src = alumno.photo;
                            img.onload = () => {
                                ctx.save();
                                ctx.beginPath();
                                ctx.arc(x, y, 20, 0, Math.PI * 2);
                                ctx.closePath();
                                ctx.clip();
                                ctx.drawImage(img, x - 20, y - 20, 40, 40);
                                ctx.restore();
                            };
                        });
                    },
                },
            ],
        };

        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
            chartInstance.current = new Chart(chartRef.current, config);
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return (
        <Card className="p-6 flex flex-col gap-4">
            <div class="flex justify-between items-center">
                <div />
                <Button>Ver todos</Button>
            </div>
            <div style={{ height: "400px", position: "relative" }}>
                <canvas ref={chartRef} />
            </div>
        </Card>
    );
};

export default LeaderboardTopAlumnos;
