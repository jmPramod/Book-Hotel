import { useEffect, useState, useMemo } from "react";
import { useUserStore } from "../../store/useUserStore";
import { FiDownload } from "react-icons/fi";
import debounce from "lodash.debounce";

import ExpenseLineChart, { type ExpenseEntry } from "../../components/Linechart/ExpenseChart";
import ExpenseTable from "./ExpenseTable";
import ExpenseModal from "./ExpenseModel";

import {
addExpenseApi,
deleteExpenseApi,
downloadExcelExpense,
fetchallExpense,
updateExpenseApi,
} from "../../utils/Api.services";

const Expense = () => {
const { darkMode, setLoading } = useUserStore();

const [expense, setExpense] = useState<ExpenseEntry[]>([]);
const [modalOpen, setModalOpen] = useState(false);
const [editData, setEditData] = useState<ExpenseEntry | null>(null);
 
const [page, setPage] = useState(1);
const [limit] = useState(10);
const [pagination, setPagination] = useState({ totalItems: 0, totalPages: 1 });
const [search, setSearch] = useState("");
 
const fetchExpense = async (searchTerm = search) => {
setLoading(true);
try {
const res = await fetchallExpense(page, limit, searchTerm);
setExpense(res.data || []);
setPagination(res.pagination || { totalItems: 0, totalPages: 1 });
} catch (error) {
console.log("Error fetching expense:", error);
}
setLoading(false);
};
 
const debouncedSearch = useMemo(
() =>
debounce((value: string) => {
setPage(1);  
fetchExpense(value);
}, 500),
[]
);

useEffect(() => {
fetchExpense();
return () => {
debouncedSearch.cancel(); 
};
}, [page]);

const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
setSearch(e.target.value);
debouncedSearch(e.target.value);
};
 
const handleAdd = async (data: any) => {
setLoading(true);
try {
await addExpenseApi(data);
fetchExpense();
} catch (error) {
console.log("Error adding expense:", error);
}
setLoading(false);
};
 
const handleUpdate = async (data: any) => {
if (!editData?._id) return;
setLoading(true);
try {
await updateExpenseApi(data, editData._id);
fetchExpense();
} catch (error) {
console.log("Error updating expense:", error);
}
setLoading(false);
setEditData(null);
};
 
const handleDelete = async (id: string) => {
setLoading(true);
try {
await deleteExpenseApi(id);
fetchExpense();
} catch (error) {
console.log("Error deleting expense:", error);
}
setLoading(false);
};
 
const downloadExcel = async () => {
try {
const res = await downloadExcelExpense();
const blob = new Blob([res.data], {
type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
});
const url = window.URL.createObjectURL(blob);
const link = document.createElement("a");
link.href = url;
link.download = "expense_details.xlsx";
document.body.appendChild(link);
link.click();
link.remove();
window.URL.revokeObjectURL(url);
} catch (error) {
console.error("Excel download failed", error);
}
};

return ( <div className="p-4 flex flex-col gap-4">
  <div className="flex justify-between items-center gap-4">
<button
onClick={() => {
setEditData(null);
setModalOpen(true);
}}
className="px-4 py-2 bg-red-600 text-white rounded-lg"
>
+ Add Expense </button>


    <button
      onClick={downloadExcel}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
    >
      <FiDownload /> Download Excel
    </button>
  </div>

 
  <div className="flex justify-end mb-2">
    <input
      type="text"
      placeholder="Search by category or source..."
      value={search}
      onChange={handleSearchChange}
      className="px-3 py-2 border rounded-lg w-64"
    />
  </div>

   
  <ExpenseLineChart expense={expense} darkMode={darkMode} />

 
  <ExpenseTable
    expense={expense}
    onEdit={(data: ExpenseEntry) => {
      setEditData(data);
      setModalOpen(true);
    }}
    onDelete={handleDelete}
    darkMode={darkMode}
  />

   
  <div className="flex justify-center items-center gap-4 mt-4">
    <button
      onClick={() => setPage((prev) => prev - 1)}
      disabled={page === 1}
      className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
    >
      Prev
    </button>

    <span className="text-lg font-semibold">
      Page {page} of {pagination.totalPages}
    </span>

    <button
      onClick={() => setPage((prev) => prev + 1)}
      disabled={page === pagination.totalPages}
      className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>

 
  {modalOpen && (
    <ExpenseModal
      close={() => setModalOpen(false)}
      onSubmit={editData ? handleUpdate : handleAdd}
      editData={editData}
      darkMode={darkMode}
    />
  )}
</div>


);
};

export default Expense;
