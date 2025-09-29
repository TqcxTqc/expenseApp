import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ExpensesContext = createContext();

export function ExpensesProvider({ children }) {
	const [expenses, setExpenses] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const normalizeBaseUrl = (value) => {
		if (!value) return "";
		let v = String(value).trim();
		if (!/^https?:\/\//i.test(v)) {
			v = `https://${v}`;
		}
		// remove trailing slashes
		v = v.replace(/\/+$/, "");
		return v;
	};

	const API_BASE = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL || "");

	// Load initial expenses
	useEffect(() => {
		let cancelled = false;
		(async () => {
			try {
				setLoading(true);
				const res = await fetch(`${API_BASE}/api/expenses`);
				if (!res.ok) throw new Error('Не удалось загрузить расходы');
				const data = await res.json();
				if (!cancelled) setExpenses(data);
			} catch (e) {
				if (!cancelled) setError(e.message || 'Ошибка загрузки');
			} finally {
				if (!cancelled) setLoading(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, []);

	const addExpense = async (expense) => {
		const res = await fetch(`${API_BASE}/api/expenses`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(expense),
		});
		if (!res.ok) throw new Error('Ошибка при добавлении расхода');
		const saved = await res.json();
		setExpenses((prev) => [saved, ...prev]);
	};

	const deleteExpense = async (id) => {
		const res = await fetch(`${API_BASE}/api/expenses/${id}`, { method: 'DELETE' });
		if (!res.ok) throw new Error('Ошибка при удалении расхода');
		setExpenses((prev) => prev.filter((e) => e._id !== id));
	};

	const value = useMemo(() => ({ expenses, loading, error, addExpense, deleteExpense }), [expenses, loading, error]);

	return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export function useExpenses() {
	return useContext(ExpensesContext);
}
