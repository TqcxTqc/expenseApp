import { useState } from "react";
import { useExpenses } from "../context/ExpensesContext";

export function useReportData() {
	const { expenses } = useExpenses();

	const currentYearNum = new Date().getFullYear();
	const years = Array.from({ length: 5 }, (_, i) => (currentYearNum - i).toString());
	const [selectedYear, setSelectedYear] = useState(currentYearNum.toString());
	const yearExpenses = expenses.filter((exp) => exp.date.startsWith(selectedYear));
	const yearTotal = yearExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
	const monthNames = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

	const monthlyTotals = Array(12).fill(0);
	yearExpenses.forEach((exp) => {
		const monthIndex = new Date(exp.date).getMonth();
		monthlyTotals[monthIndex] += Number(exp.amount);
	});

	const barData = {
		labels: monthNames,
		datasets: [
			{
				label: "Расходы",
				data: monthlyTotals,
				backgroundColor: "#3B82F6",
			},
		],
	};

	const barOptions = {
		responsive: true,
		plugins: { legend: { display: false } },
		animation: { duration: 800 },
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					callback: (value) => `${value} €`,
				},
			},
		},
	};

	const categoryTotals = yearExpenses.reduce((acc, curr) => {
		if (!acc[curr.category]) acc[curr.category] = 0;
		acc[curr.category] += Number(curr.amount);
		return acc;
	}, {});

	const categoryColors = {
		Продукты: "#FF6384",
		Транспорт: "#36A2EB",
		Развлечения: "#FFCE56",
		Обязательные: "#F87171",
		Кредиты: "#A78BFA",
		Другое: "#9CA3AF",
	};

	const labels = Object.keys(categoryTotals);
	const values = Object.values(categoryTotals);
	const backgroundColor = labels.map((label) => categoryColors[label] || categoryColors["Другое"]);

	const pieData = {
		labels,
		datasets: [
			{
				data: values,
				backgroundColor,
			},
		],
	};

	const pieOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: { legend: { position: "bottom" } },
		animation: { duration: 800 },
	};

	return {
		years,
		selectedYear,
		setSelectedYear,
		yearTotal,
		barData,
		barOptions,
		pieData,
		pieOptions,
	};
}
