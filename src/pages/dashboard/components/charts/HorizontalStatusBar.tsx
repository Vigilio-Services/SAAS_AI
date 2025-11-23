import { useThemeContext } from "@contexts/theme.context";
import useIntersectionObserver from "@hooks/useIntersectionOberver";
import { useSignal } from "@preact/signals";
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
import { useEffect, useMemo } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function HorizontalStatusBar() {
    const themeContext = useThemeContext();

    const isDark = themeContext.state === "dark";

    /* Resuelve colores CSS en tiempo real */
    const colors = useMemo(() => {
        const primary = getComputedStyle(document.documentElement)
            .getPropertyValue("--color-primary")
            .trim();
        return ["#10b981", "#3b82f6", primary, "#ef4444"];
    }, [isDark]);
    const realData = [120, 95, 80, 5];

    const showData = useSignal<number[]>([0, 0, 0, 0]);
    const { ref, inView } = useIntersectionObserver({
        threshold: 0.3,
    });

    useEffect(() => {
        if (inView) {
            showData.value = realData;
        }
    }, [inView]);

    const data = {
        labels: ["Pagado", "Enviado", "Entregado", "Devuelto"],
        datasets: [
            {
                label: "Órdenes",
                data: showData.value,
                backgroundColor: colors,
                borderWidth: 0,
                borderRadius: 4,
                barPercentage: 0.6,
            },
        ],
    };

    const options: ChartOptions<"bar"> = {
        indexAxis: "y",
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
                grid: { color: "transparent" },
                ticks: { color: isDark ? "#a3a3a3" : "#6b7280" },
            },
            y: {
                border: { display: false },
                grid: { color: "transparent" },
                ticks: { color: isDark ? "#a3a3a3" : "#6b7280" },
            },
        },
    };

    return (
        <div
            ref={ref}
            className="p-6 bg-card border border-border rounded-lg hover:shadow-lg hover:border-primary/50"
        >
            <h3 className="text-lg font-semibold mb-4 text-foreground">
                Estado de órdenes
            </h3>
            <div className="w-full h-72">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}
