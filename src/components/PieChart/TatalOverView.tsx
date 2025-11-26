import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#1E40AF", "#16A34A", "#DC2626"]; 
 

interface Props {
  data: {
    totalBalance: number;
    totalIncome: number;
    totalExpense: number;
  };
  darkMode: boolean;
}

const TatalOverView: React.FC<Props> = ({ data, darkMode }) => {
  const pieData = [
    { name: "Total Balance", value: data.totalBalance },
    { name: "Total Income", value: data.totalIncome },
    { name: "Total Expense", value: data.totalExpense },
  ];

  return (
    <div className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"} p-6 rounded-xl shadow md:min-w-[65%]`}>
      <h2 className="text-xl font-semibold mb-4">Finance Overview</h2>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ name, percent }) =>
    `${name}: ${percent !== undefined ? (percent * 100).toFixed(0) : 0}%`
  }    >
            {pieData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={50} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TatalOverView;
