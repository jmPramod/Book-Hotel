import { useState } from "react";
import type { IncomeEntry } from "../../components/Bargraph/IncomeBarChart";
import { FiDownload } from "react-icons/fi";
import { downloadExcelIncome } from "../../utils/Api.services";

interface Props {
income: IncomeEntry[];
darkMode: boolean;
onEdit: (data: IncomeEntry) => void;
onDelete: (id: string) => void;
onAdd: () => void;
handleSearchChange:(e: React.ChangeEvent<HTMLInputElement>) => void
searchText:string
}

const IncomeList = ({handleSearchChange,searchText, income, darkMode, onEdit, onDelete, onAdd }: Props) => {
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedId, setSelectedId] = useState<string | null>(null);

const downloadIncomeExcel = async () => {
try {
const res = await downloadExcelIncome();
const blob = new Blob([res.data], {
type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
});
const url = window.URL.createObjectURL(blob);
const link = document.createElement("a");
link.href = url;
link.download = "income_details.xlsx";
document.body.appendChild(link);
link.click();
link.remove();
window.URL.revokeObjectURL(url);
} catch (error) {
console.error("Excel download failed", error);
}
};

const handleDeleteConfirm = () => {
if (selectedId) {
onDelete(selectedId);
}
setShowDeleteModal(false);
};

return (
<> <div className="mt-6"> <div className="flex justify-between items-center mb-3"> <h2 className="text-xl font-bold">Income List</h2>


      <div className="flex gap-3">
          <div className="flex justify-between items-center gap-4">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search . . ."
          className="px-3 py-2 border rounded-lg w-full max-w-sm"
        />
      </div>
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          + Add Income
        </button>

        <button
          onClick={downloadIncomeExcel}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition"
        >
          <FiDownload className="text-xl" />
          Download Excel
        </button>
      </div>
    </div>

    <ul className="space-y-3">
      {income && income.length > 0 ? (
        income.map((txn) => (
          <li
            key={txn._id}
            className={`${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
            } p-3 rounded-lg flex items-center justify-between`}
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">{txn.icon}</div>

              <div className="flex flex-col">
                <span className="font-semibold capitalize">
                  {txn.category ? txn.category : txn.source}
                </span>
                <span className="text-xs opacity-70">
                  {txn.date && new Date(txn.date).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-bold text-green-500">+ ₹{txn.amount}</span>

              <button
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => onEdit(txn)}
              >
                Edit
              </button>

              <button
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => {
                  setSelectedId(txn._id!);
                  setShowDeleteModal(true);
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))
      ) : (
        <p className="text-center opacity-50 mt-3">No income added yet.</p>
      )}
    </ul>
  </div>

  {/* DELETE CONFIRMATION MODAL */}
  {showDeleteModal && (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-5 w-full max-w-sm shadow-lg">
        <h3 className="text-lg font-semibold mb-3 text-center">
          Confirm Delete
        </h3>
        <p className="text-center text-gray-600 mb-5">
          Are you sure you want to delete this income?
        </p>

        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={handleDeleteConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )}
</>


);
};

export default IncomeList;
