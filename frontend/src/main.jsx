import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ExpensesProvider } from "./context/ExpensesContext";
import { Toaster } from "react-hot-toast";
import { registerCharts } from "./chartConfig";

registerCharts();

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ExpensesProvider>
			<App />
			<Toaster
				position="top-center"
				toastOptions={{
					duration: 3000,
					style: {
						minWidth: "300px",
						maxWidth: "480px",
						fontSize: "1rem",
						padding: "1rem 1.5rem",
						borderRadius: "12px",
						background: "#f0fdf4",
						color: "#065f46",
						boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
					},
					success: {
						iconTheme: {
							primary: "#10B981",
							secondary: "#D1FAE5",
						},
					},
				}}
			/>
		</ExpensesProvider>
	</StrictMode>
);
