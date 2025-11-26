import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { PieLabelRenderProps } from "recharts";

const COLORS = ["#3B82F6", "#10B981", "#EF4444", "#F59E0B", "#8B5CF6"];

export interface Transaction {
  source?: string;
  category?: string;
  amount: number;
  icon?: string;
}

interface Props {
  transactions: Transaction[];
  title: string;
  darkMode: boolean;
}

const TransactionPieChart: React.FC<Props> = ({
  transactions,
  title,
  darkMode,
}) => {
  const pieData = transactions&&transactions.map((txn) => ({
    name: txn.category || txn.source || "Unknown",
    value: txn.amount,
  }));

  const totalAmount = pieData&&pieData.reduce((sum, item) => sum + item.value, 0);

  const renderLabel = (props: PieLabelRenderProps) => {
    const { name = "", percent = 0 } = props;
    return `${name} ${(percent * 100).toFixed(0)}%`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { name = "", value = 0, percent = 0 } = payload[0].payload;

      return (
        <div
          className={`p-2 rounded shadow ${
            darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
          }`}
        >
          <p className="font-semibold">{name}</p>
          <p>Amount: ₹ {value}</p>
          <p>Percentage: {(percent * 100).toFixed(2)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={` flex-1 ${ 
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      } p-6 rounded-xl shadow`}
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      {pieData&&pieData.length === 0 ? (
        <p className="text-sm opacity-70">No transactions</p>
      ) : (
        <ResponsiveContainer width="100%" height={340}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={50} 
              paddingAngle={3}
              label={renderLabel}
            >
              {pieData&&pieData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip content={CustomTooltip} />
            <Legend verticalAlign="bottom" height={50} />
 
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="20px"
              fontWeight="bold"
              fill={darkMode ? "#fff" : "#000"}
            >
              ₹ {totalAmount}
            </text>

            <text
              x="50%"
              y="62%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="12px"
              fill={darkMode ? "#ddd" : "#444"}
            >
              Total
            </text>
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default TransactionPieChart;
