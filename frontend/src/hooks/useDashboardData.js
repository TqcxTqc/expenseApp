import { useState } from "react";
import { useExpenses } from "../context/ExpensesContext";

export function useDashboardData() {
	const { expenses } = useExpenses();

	const currentDate = new Date();
	const currentYear = currentDate.getFullYear().toString();
	const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");

	const years = Array.from({ length: 5 }, (_, i) => (currentDate.getFullYear() - i).toString());
	const [selectedYear, setSelectedYear] = useState(currentYear);
	const [selectedMonth, setSelectedMonth] = useState(currentMonth);

	const monthLabelMap = {
		"01": "Январь",
		"02": "Февраль",
		"03": "Март",
		"04": "Апрель",
		"05": "Май",
		"06": "Июнь",
		"07": "Июль",
		"08": "Август",
		"09": "Сентябрь",
		"10": "Октябрь",
		"11": "Ноябрь",
		"12": "Декабрь",
	};
	const months = Object.keys(monthLabelMap)
		.sort((a, b) => Number(a) - Number(b))
		.map((key) => [key, monthLabelMap[key]]);

	const monthKey = `${selectedYear}-${selectedMonth}`;
	const filteredExpenses = expenses.filter((exp) => exp.date.startsWith(monthKey));

	const total = filteredExpenses.reduce((sum, item) => sum + Number(item.amount), 0);

	const latestExpenses = [...filteredExpenses].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

	const categoryColors = {
		Продукты: "#FF6384",
		Транспорт: "#36A2EB",
		Развлечения: "#FFCE56",
		Обязательные: "#F87171",
		Кредиты: "#A78BFA",
		Другое: "#9CA3AF",
	};

	const categoryTotals = filteredExpenses.reduce((acc, curr) => {
		if (!acc[curr.category]) acc[curr.category] = 0;
		acc[curr.category] += Number(curr.amount);
		return acc;
	}, {});

	const labels = Object.keys(categoryTotals);
	const data = Object.values(categoryTotals);
	const backgroundColor = labels.map((label) => categoryColors[label] || categoryColors["Другое"]);

	const pieData = {
		labels,
		datasets: [
			{
				data,
				backgroundColor,
			},
		],
	};

	const pieOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
		},
	};

	const dayTotals = {};
	filteredExpenses.forEach((exp) => {
		const day = exp.date.slice(8, 10);
		if (!dayTotals[day]) dayTotals[day] = 0;
		dayTotals[day] += Number(exp.amount);
	});

	const daysInMonth = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));

	const lineLabels = [];
	const lineDataPoints = [];

	daysInMonth.forEach((day) => {
		const value = dayTotals[day] || 0;
		if (value > 0) {
			lineLabels.push(`${day}.${selectedMonth}`);
			lineDataPoints.push(value);
		}
	});

	const lineData = {
		labels: lineLabels,
		datasets: [
			{
				label: "Расходы по дням",
				data: lineDataPoints,
				fill: true,
				backgroundColor: "rgba(59, 130, 246, 0.2)",
				borderColor: "#3B82F6",
				tension: 0.3,
				pointBackgroundColor: "#3B82F6",
			},
		],
	};

	return {
		years,
		months,
		selectedYear,
		setSelectedYear,
		selectedMonth,
		setSelectedMonth,
		total,
		latestExpenses,
		pieData,
		pieOptions,
		lineData,
		monthLabel: monthLabelMap[selectedMonth],
	};
}
