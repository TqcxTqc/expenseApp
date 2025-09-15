import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import AddExpense from "./pages/AddExpense";
import Reports from "./pages/Reports";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Dashboard></Dashboard>} />
				<Route path="/expenses" element={<Expenses></Expenses>} />
				<Route path="/add" element={<AddExpense></AddExpense>} />
				<Route path="/reports" element={<Reports></Reports>} />
			</Routes>
		</Router>
	);
}

export default App;
