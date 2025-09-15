import { Line } from 'react-chartjs-2';

function LineChart({ data, options }) {
  return (
    <div className="bg-white rounded-lg shadow h-64 flex items-center justify-center p-4">
      {data.labels.length > 0 ? (
        <Line key={JSON.stringify(data)} data={data} options={options} />
      ) : (
        <p className="text-gray-400">Нет данных для графика</p>
      )}
    </div>
  );
}

export default LineChart;