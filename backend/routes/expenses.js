import express from "express";
import Expense from "../models/Expense.js";

const router = express.Router();

// GET /api/expenses
router.get("/", async (req, res) => {
	try {
		const { year, month } = req.query;
		const query = {};
		if (year && month) {
			// match ISO date prefix YYYY-MM
			const prefix = `${year}-${String(month).padStart(2, "0")}`;
			query.date = { $regex: `^${prefix}` };
		} else if (year) {
			query.date = { $regex: `^${year}` };
		}
		const expenses = await Expense.find(query).sort({ createdAt: -1 });
		res.json(expenses);
	} catch (err) {
		res.status(500).json({ message: "Ошибка при получении расходов" });
	}
});

// POST /api/expenses
router.post("/", async (req, res) => {
	try {
		const { amount, category, date, description = "" } = req.body || {};

		// Basic validation
		if (amount === undefined || amount === null || Number.isNaN(Number(amount)) || Number(amount) <= 0) {
			return res.status(400).json({ message: "Некорректная сумма" });
		}
		if (!category || typeof category !== "string") {
			return res.status(400).json({ message: "Категория обязательна" });
		}
		if (!date || Number.isNaN(new Date(date).getTime())) {
			return res.status(400).json({ message: "Некорректная дата" });
		}

		const expense = new Expense({ amount, category, date, description });
		const saved = await expense.save();
		res.status(201).json(saved);
	} catch (err) {
		res.status(400).json({ message: "Ошибка при добавлении расхода", error: err.message });
	}
});

// PUT /api/expenses/:id
router.put("/:id", async (req, res) => {
	try {
		const { amount, category, date, description } = req.body || {};
		const update = {};
		if (amount !== undefined) {
			if (Number.isNaN(Number(amount)) || Number(amount) <= 0) return res.status(400).json({ message: "Некорректная сумма" });
			update.amount = amount;
		}
		if (category !== undefined) {
			if (!category || typeof category !== "string") return res.status(400).json({ message: "Категория обязательна" });
			update.category = category;
		}
		if (date !== undefined) {
			if (!date || Number.isNaN(new Date(date).getTime())) return res.status(400).json({ message: "Некорректная дата" });
			update.date = date;
		}
		if (description !== undefined) update.description = description;

		const updated = await Expense.findByIdAndUpdate(req.params.id, update, { new: true });
		if (!updated) return res.status(404).json({ message: "Расход не найден" });
		res.json(updated);
	} catch (err) {
		res.status(500).json({ message: "Ошибка при обновлении", error: err.message });
	}
});

// DELETE /api/expenses/:id
router.delete("/:id", async (req, res) => {
	try {
		const deleted = await Expense.findByIdAndDelete(req.params.id);
		if (!deleted) {
			return res.status(404).json({ message: "Расход не найден" });
		}
		res.json({ message: "Расход удалён" });
	} catch (err) {
		res.status(500).json({ message: "Ошибка при удалении", error: err.message });
	}
});

export default router;
