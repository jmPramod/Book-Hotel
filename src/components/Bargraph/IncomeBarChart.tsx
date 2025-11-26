import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export interface IncomeEntry {
  category: string;
  icon: string;
  _id: string;
  source: string;
  amount: number;
  date: string;
}

interface Props {
  income: IncomeEntry[];
  darkMode: boolean;
}

const IncomeBarChart: React.FC<Props> = ({ income, darkMode }) => {
  const chartData = income.map((item) => ({
    name: item.source,
    amount: item.amount,
  }));

  return (
    <div
      className={`${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      } p-6 rounded-xl shadow`}
    >
      <h2 className="text-xl font-semibold mb-4">Income Overview</h2>

      {chartData.length === 0 ? (
        <p className="opacity-70 text-sm">No income data available</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#3B82F6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default IncomeBarChart;
