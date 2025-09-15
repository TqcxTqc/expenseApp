import { NavLink } from "react-router-dom";
import { FaHouseChimney, FaChartColumn, FaMoneyBillWave, FaHandHoldingMedical } from "react-icons/fa6";

function Sidebar() {
	return (
		<aside className="w-64 text-white p-6">
			<h2 className="text-xl font-bold mb-6 text-center">Меню</h2>
			<nav className="space-y-4">
				<NavLink to="/" className={({ isActive }) => `flex items-center gap-3 hover:text-gray-400 ${isActive ? "text-blue-400 font-semibold" : ""}`}>
					{" "}
					<FaHouseChimney className="w-5 h-5" />
					Главная
				</NavLink>

				<NavLink
					to="/expenses"
					className={({ isActive }) => `flex items-center gap-3 hover:text-gray-400 ${isActive ? "text-blue-400 font-semibold" : ""}`}>
					<FaMoneyBillWave className="w-5 h-5" />
					Расходы
				</NavLink>

				<NavLink
					to="/reports"
					className={({ isActive }) => `flex items-center gap-3 hover:text-gray-400 ${isActive ? "text-blue-400 font-semibold" : ""}`}>
					<FaChartColumn className="w-5 h-5" />
					Отчёты
				</NavLink>

				<NavLink
					to="/add"
					className={({ isActive }) => `flex items-center gap-3 hover:text-gray-300 my-10 ${isActive ? "text-blue-400 font-semibold my-10" : ""}`}>
					<FaHandHoldingMedical className="w-5 h-5" />
					Добавить
				</NavLink>
			</nav>
		</aside>
	);
}

export default Sidebar;
