import Sidebar from "../components/Sidebar";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";
import MonthDropdown from "../components/MonthDropdown";
import YearDropdown from "../components/YearDropdown";
import { Link } from "react-router-dom";
import { useDashboardData } from "../hooks/useDashboardData";

function Dashboard() {
	const {
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
		monthLabel,
	} = useDashboardData();

	return (
		<div className="flex min-h-screen dark:bg-slate-900">
			<Sidebar />

			<main className="flex-1 bg-gray-200 p-6">
				<h1 className="text-2xl font-bold mb-2">Dashboard</h1>

				<div className="flex gap-3 flex-wrap items-center mb-6">
					<MonthDropdown months={months} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
					<YearDropdown years={years} selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
				</div>

				{/* Total */}
				<div className="bg-white p-4 rounded-lg shadow mb-6">
					<h2 className="text-lg font-semibold">
						Общая сумма расходов за {monthLabel} {selectedYear}
					</h2>
					<p className="text-2xl text-red-500 font-bold">{total.toLocaleString()} €</p>
				</div>

				{/* Graphs */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
					{/* Pie Chart */}
					<div className="bg-white rounded-lg shadow p-4 flex justify-center min-h-[260px]">
						<PieChart data={pieData} options={pieOptions} legend={pieData.labels} maxSize={220} />
					</div>
					{/* Line Chart */}
					<div className="bg-white rounded-lg shadow p-4 min-h-[260px]">
						<LineChart data={lineData} options={{ maintainAspectRatio: false }} />
					</div>
				</div>

				{/* Latest Expenses */}
				<div className="bg-white p-4 rounded-lg shadow mb-6">
					<h2 className="text-lg font-semibold mb-4">Последние расходы</h2>
					{latestExpenses.length === 0 ? (
						<p className="text-gray-500">Нет расходов</p>
					) : (
						<ul className="space-y-2">
							{latestExpenses.map((item, index) => (
								<li key={index} className="flex justify-between">
									<span>
										{new Date(item.date).toLocaleDateString("ru-RU")} — {item.category}
									</span>
									<span className="text-red-600">- {item.amount} €</span>
								</li>
							))}
						</ul>
					)}
				</div>

				{/* Button "Add Expenses" */}
				<div className="text-right">
					<Link to="/add" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-block">
						Добавить расход
					</Link>
				</div>
			</main>
		</div>
	);
}

export default Dashboard;
