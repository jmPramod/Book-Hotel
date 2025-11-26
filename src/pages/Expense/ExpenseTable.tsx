import type { ExpenseEntry } from "../../components/Linechart/ExpenseChart";
import { FiEdit, FiTrash2 } from "react-icons/fi";
// import type { ExpenseEntry } from "./ExpenseLineChart";

const ExpenseTable = ({ expense, onEdit, onDelete, darkMode }: any) => {
  return (
    <ul className="space-y-3 mt-6">
      {expense.map((txn: ExpenseEntry, idx: number) => (
        <li
          key={idx}
          className={`p-3 rounded-lg flex justify-between items-center ${
            darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="text-2xl">{txn.icon}</div>

            <div>
              <div className="font-semibold">{txn.category}</div>
              <div className="text-xs opacity-70">
                {new Date(txn.date).toLocaleString()}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="font-bold text-red-500">- ₹ {txn.amount}</div>

            <FiEdit
              className="cursor-pointer text-blue-500"
              onClick={() => onEdit(txn)}
            />

            <FiTrash2
              className="cursor-pointer text-red-500"
              onClick={() => onDelete(txn._id!)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseTable;
