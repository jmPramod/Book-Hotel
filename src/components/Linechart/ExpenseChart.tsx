import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export interface ExpenseEntry {
  _id?: string;
  category: string;
  amount: number;
  date: string;
  icon: string;
}

const ExpenseLineChart = ({ expense, darkMode }: { expense: ExpenseEntry[]; darkMode: boolean }) => {
  const formattedData = expense.map((e) => ({
    date: new Date(e.date).toLocaleDateString(),
    amount: Number(e.amount),
  }));

  return (
    <div
      className={`p-4 rounded-xl shadow-lg ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-lg font-semibold mb-4">Expense Trend</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#555" : "#ddd"} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#DC2626" strokeWidth={3} dot />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseLineChart;
