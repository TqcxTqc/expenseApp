import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useExpenses } from "../context/ExpensesContext";
import { FaTrash } from "react-icons/fa6";

function Expenses() {
	const { expenses, deleteExpense } = useExpenses();

	return (
		<div className="flex min-h-screen dark:bg-slate-900">
			<Sidebar />
			<main className="flex-1 bg-gray-100 p-6">
				<h1 className="text-2xl font-bold mb-4">Расходы</h1>

				<div className="mb-4 text-right">
					<Link to="/add" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-block">
						Добавить расход
					</Link>
				</div>

				<div className="bg-white shadow rounded-lg overflow-x-auto">
					<table className="w-full table-auto">
						<thead className="bg-gray-200 text-left">
							<tr>
								<th className="px-4 py-2">Дата</th>
								<th className="px-4 py-2">Категория</th>
								<th className="px-4 py-2">Описание</th>
								<th className="px-4 py-2">Сумма</th>
								<th className="px-4 py-2">Действия</th>
							</tr>
						</thead>
						<tbody>
							{expenses.length === 0 ? (
								<tr>
									<td colSpan="5" className="text-center py-4 text-gray-500">
										Пока нет расходов
									</td>
								</tr>
							) : (
								expenses.map((expense, index) => (
									<tr key={index} className="border-t">
										<td className="px-4 py-2">{new Date(expense.date).toLocaleDateString("ru-RU")}</td>
										<td className="px-4 py-2">{expense.category}</td>
										<td className="px-4 py-2">{expense.description}</td>
										<td className="px-4 py-2 text-red-600">- {expense.amount} €</td>
										<td className="px-4 py-2 text-right">
											{expense._id && (
												<button
													onClick={() => deleteExpense(expense._id)}
													className="text-red-500 hover:text-red-700"
													title="Удалить"
												>
													<FaTrash />
												</button>
											)}
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</main>
		</div>
	);
}

export default Expenses;
