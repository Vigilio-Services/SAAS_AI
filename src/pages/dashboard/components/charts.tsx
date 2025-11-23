import { useThemeContext } from "@contexts/theme.context";
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    ChartOptions,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import { HorizontalStatusBar } from "./charts/HorizontalStatusBar";
import { DoughnutSalesCat } from "./charts/SalesCatChar";
import TopProductsBar from "./charts/TopProductsBar";
import UsersChart from "./charts/UsersChart";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export function Charts() {
    const themeContext = useThemeContext();
    const isDark = themeContext.state === "dark";
    const gridColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
    const textColor = isDark ? "#fafafa" : "#111827";
    const primary = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-primary")
        .trim();
    const muted = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-muted-foreground")
        .trim();

    const options2: ChartOptions<"bar"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
                labels: { color: textColor, font: { size: 12 } },
            },
            tooltip: {
                backgroundColor: isDark ? "#111" : "#fff",
                titleColor: textColor,
                bodyColor: textColor,
                borderColor: gridColor,
                borderWidth: 1,
                padding: 10,
                boxPadding: 6,
            },
        },
        scales: {
            x: {
                border: { display: false }, // ← elimina borde inferior
                grid: { color: gridColor },
                ticks: { color: muted, font: { size: 12 } },
            },
            y: {
                border: { display: false }, // ← elimina borde lateral
                grid: { color: gridColor },
                ticks: { color: muted, font: { size: 12 } },
            },
        },
    };
    const revenueData = [
        { name: "Jan", revenue: 4000, users: 2400 },
        { name: "Feb", revenue: 3000, users: 1398 },
        { name: "Mar", revenue: 2000, users: 9800 },
        { name: "Apr", revenue: 2780, users: 3908 },
        { name: "May", revenue: 1890, users: 4800 },
        { name: "Jun", revenue: 2390, users: 3800 },
        { name: "Jul", revenue: 3490, users: 4300 },
    ];
    const data = {
        labels: revenueData.map((d) => d.name),
        datasets: [
            {
                label: "Revenue",
                data: revenueData.map((d) => d.revenue),
                borderColor: primary,
                backgroundColor: `${primary}80`,
                tension: 0.3,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: primary,
                pointBorderColor: textColor,
                pointBorderWidth: 2,
            },
            {
                label: "Users",
                data: revenueData.map((d) => d.users),
                borderColor: textColor,
                backgroundColor: textColor,
                tension: 0.3,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: textColor,
                pointBorderColor: textColor,
                pointBorderWidth: 2,
            },
        ],
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Line Chart */}
            <UsersChart />

            <DoughnutSalesCat />
            <TopProductsBar />
            <HorizontalStatusBar />

            {/* Bar Chart */}
            {/* <div className="p-6 bg-card border border-border rounded-lg  hover:shadow-lg hover:border-primary/50">
                <h3 className="text-lg font-semibold mb-4">
                    Monthly Performance
                </h3>
                <div className="w-full max-w-full h-72">
                    <Bar data={data} options={options2} />
                </div>
            </div> */}
        </div>
    );
}
