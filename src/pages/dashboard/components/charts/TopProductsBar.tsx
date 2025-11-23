import { useThemeContext } from "@contexts/theme.context";
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    ChartOptions,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from "chart.js";
import { useMemo } from "preact/hooks";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
function TopProductsBar() {
    const themeContext = useThemeContext();
    const isDark = themeContext.state === "dark";

    /* Resuelve colores en tiempo real */
    const barColor = useMemo(() => {
        return getComputedStyle(document.documentElement)
            .getPropertyValue("--color-primary")
            .trim();
    }, [isDark]);

    const data = {
        labels: ["iPhone 15", "AirPods", "iPad Air", "Watch 9", "MacBook Air"],
        datasets: [
            {
                label: "Unidades",
                data: [320, 280, 240, 190, 160],
                backgroundColor: `${barColor}80`, // 50 % opacidad
                borderColor: barColor,
                borderWidth: 1,
                borderRadius: 4,
                barPercentage: 0.5,
            },
        ],
    };

    const options: ChartOptions<"bar"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: isDark ? "#111" : "#fff",
                titleColor: isDark ? "#fafafa" : "#111",
                bodyColor: isDark ? "#fafafa" : "#111",
                borderColor: isDark ? "#333" : "#ddd",
                borderWidth: 1,
                padding: 12,
                boxPadding: 6,
            },
        },
        scales: {
            x: {
                border: { display: false },
                grid: { display: false },
                ticks: { color: isDark ? "#a3a3a3" : "#6b7280" },
            },
            y: {
                border: { display: false },
                grid: {
                    color: isDark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.08)",
                },
                ticks: { color: isDark ? "#a3a3a3" : "#6b7280" },
            },
        },
    };
    return (
        <div className="p-6 bg-card border border-border rounded-lg  hover:shadow-lg hover:border-primary/50">
            <h3 className="text-lg font-semibold mb-4 ">Revenue & Users</h3>
            <div className="w-full h-72">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}

export default TopProductsBar;
