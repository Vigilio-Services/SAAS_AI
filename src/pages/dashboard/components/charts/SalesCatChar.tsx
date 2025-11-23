// DoughnutSalesCat.tsx
import { useThemeContext } from "@contexts/theme.context";
import {
    ArcElement,
    Chart as ChartJS,
    ChartOptions,
    Legend,
    Tooltip,
} from "chart.js";
import { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutSalesCat() {
    const themeContext = useThemeContext();
    const isDark = themeContext.state === "dark";

    /* Resuelve colores en tiempo real */
    const colors = useMemo(() => {
        const primary = getComputedStyle(document.documentElement)
            .getPropertyValue("--color-primary")
            .trim();
        return [primary, "#d946ef", "#10b981", "#f59e0b", "#6b7280"];
    }, [isDark]);

    const data = {
        labels: ["Electrónica", "Moda", "Hogar", "Deportes", "Otros"],
        datasets: [
            {
                data: [35, 25, 20, 15, 5],
                backgroundColor: colors,
                borderWidth: 0,
                hoverOffset: 4,
            },
        ],
    };

    const options: ChartOptions<"doughnut"> = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "65%",
        animation: {
            duration: 1000,
            easing: "easeOutQuart",
        },
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color: isDark ? "#fafafa" : "#111827",
                    padding: 16,
                    font: { size: 12 },
                },
            },
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
    };

    return (
        <div className="p-6 bg-card border border-border rounded-lg hover:shadow-lg hover:border-primary/50">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
                Ventas por categorías
            </h3>
            <div className="relative w-full h-72">
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
}
