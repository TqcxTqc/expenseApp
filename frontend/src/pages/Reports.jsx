import Sidebar from "../components/Sidebar";
import { Bar, Pie } from "react-chartjs-2";
import { useReportData } from "../hooks/useReportData";
import { motion } from "framer-motion";
import YearDropdown from "../components/YearDropdown";

function Reports() {
  const {
    years,
    selectedYear,
    setSelectedYear,
    yearTotal,
    barData,
    barOptions,
    pieData,
    pieOptions,
  } = useReportData();

  return (
    <div className="flex min-h-screen dark:bg-slate-900">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-2">Отчёты</h1>

        {/* Фильтр по году */}
        <div className="flex gap-3 items-center mb-6">
          <YearDropdown
            years={years}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
        </div>

        <motion.div
          key={selectedYear}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold mb-2">
              Сумма расходов за {selectedYear} год
            </h2>
            <p className="text-3xl text-red-600 font-bold">
              {yearTotal.toLocaleString()} €
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow min-h-[220px] flex items-center justify-center p-4">
              <div className="w-full h-full">
                <Bar key={JSON.stringify(barData)} data={barData} options={barOptions} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow min-h-[220px] flex items-center justify-center p-4">
              <div className="flex w-full h-full items-center justify-between gap-6">
                <div className="space-y-2 min-w-[120px]">
                  {pieData.labels.map((label, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: pieData.datasets[0].backgroundColor[index] }}
                      ></div>
                      <span className="text-sm text-gray-700 dark:text-gray-700">{label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex-1 flex justify-center">
                  {pieData.labels.length > 0 ? (
                    <div className="w-[70%] max-w-[400px] aspect-square">
                      <Pie
                        key={JSON.stringify(pieData)}
                        data={pieData}
                        options={{
                          ...pieOptions,
                          plugins: {
                            ...pieOptions.plugins,
                            legend: { display: false },
                          },
                        }}
                      />
                    </div>
                  ) : (
                    <p className="text-gray-400">Нет данных</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default Reports;
