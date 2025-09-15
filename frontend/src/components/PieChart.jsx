import { Pie } from "react-chartjs-2";

function PieChart({ data, options, legend, maxSize = 250 }) {
  return (
    <div className="flex w-full h-full items-center justify-between gap-6">
      <div className="space-y-2 min-w-[120px]">
        {legend.map((label, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
            ></div>
            <span className="text-m text-gray-700 dark:text-gray-900">{label}</span>
          </div>
        ))}
      </div>

      <div className="flex-1 flex justify-center">
        <div
          className="aspect-square w-full"
          style={{ maxWidth: `${maxSize}px` }}
        >
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default PieChart;
