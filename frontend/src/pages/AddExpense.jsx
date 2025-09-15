import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useExpenses } from "../context/ExpensesContext";
import toast from "react-hot-toast";

function AddExpense() {
	const getToday = () => new Date().toISOString().split("T")[0];

	const [form, setForm] = useState({
		amount: "",
		category: "",
		description: "",
		date: new Date().toISOString().split("T")[0],
	});

	const [successMessage, setSuccessMessage] = useState("");

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const { addExpense } = useExpenses();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await addExpense(form);
			toast.success(`Добавлено: ${form.amount} € — ${form.category}${form.description ? ` (${form.description})` : ""}`);
			setTimeout(() => setSuccessMessage(""), 3000);
			setForm({ amount: "", category: "", description: "", date: getToday() });
		} catch (err) {
			toast.error(err.message || "Ошибка при добавлении");
		}
	};

	return (
		<div className="flex min-h-screen dark:bg-slate-900">
			<Sidebar />
			<main className="flex-1 bg-gray-100 p-6 flex items-center justify-center">
				<div className="w-full max-w-md space-y-6">
					{successMessage && <div className="mb-4 text-green-600 font-medium text-sm text-center">{successMessage}</div>}
					<h1 className="text-2xl font-bold mb-6">Добавить расход</h1>

					<form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md">
						<div>
							<label className="block font-semibold mb-1">Сумма (€)</label>
							<input type="number" name="amount" value={form.amount} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
						</div>
						<div>
							<label className="block font-semibold mb-1">Категория</label>
							<select name="category" value={form.category} onChange={handleChange} className="w-full border px-3 py-2 rounded" required>
								<option value="">Выберите категорию</option>
								<option value="Продукты">Продукты</option>
								<option value="Транспорт">Транспорт</option>
								<option value="Развлечения">Развлечения</option>
								<option value="Обязательные">Обязательные</option>
								<option value="Кредиты">Кредиты</option>
								<option value="Другое">Другое</option>
							</select>
						</div>
						<div>
							<label className="block font-semibold mb-1">Описание</label>
							<input type="text" name="description" value={form.description} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
						</div>
						<div>
							<label className="block font-semibold mb-1">Дата</label>
							<input
								type="date"
								name="date"
								value={form.date}
								onChange={handleChange}
								onClick={(e) => e.target.showPicker?.()}
								className="w-full border px-3 py-2 rounded cursor-pointer"
								required
							/>
						</div>
						<button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
							Сохранить
						</button>
					</form>
				</div>
			</main>
		</div>
	);
}

export default AddExpense;
