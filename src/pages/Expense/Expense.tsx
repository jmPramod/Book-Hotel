import  { useEffect, useState } from "react";
import { useUserStore } from "../../store/useUserStore";
// import ExpenseLineChart from "./ExpenseLineChart";
// import ExpenseModal from "./ExpenseModal";
import ExpenseTable from "./ExpenseTable";
import { FiDownload } from "react-icons/fi";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import type { ExpenseEntry } from "./ExpenseLineChart";
import { addExpenseApi, deleteExpenseApi, downloadExcelExpense, fetchallExpense, updateExpenseApi } from "../../utils/Api.services";
import ExpenseLineChart, { type ExpenseEntry } from "../../components/Linechart/ExpenseChart";
import ExpenseModal from "./ExpenseModel";

const Expense = () => {
  const { darkMode } = useUserStore();
  const [expense, setExpense] = useState<ExpenseEntry[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<ExpenseEntry | null>(null);

  const fetchExpense = async () => {
    try {
      let res = await fetchallExpense();
      setExpense(res.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchExpense();
  }, []);

  const handleAdd =async (data: any) => {
    setExpense([...expense, { _id: crypto.randomUUID(), ...data }]);

    try {
      const res=await addExpenseApi(data)
      console.log("res",res);
      if(res.status==200){
         fetchExpense();
      }
    } catch (error) {
      console.log("error",error);
      
    }
    
  };

  const handleUpdate = async(data: any) => {
    setExpense(
      expense.map((e) => (e._id === editData?._id ? { ...e, ...data } : e))
    );

    try {
      if(editData&&editData._id){
  const res=await updateExpenseApi(data,editData._id)
      console.log("res",res);
      if(res.status==200){
         fetchExpense();
      }
      }
    
    } catch (error) {
      console.log("error",error);
      
    }

    setEditData(null);
  };

  const handleDelete = async(id: string) => {
    setExpense(expense.filter((e) => e._id !== id));
        try {
      const res=await deleteExpenseApi(id)
      console.log("res",res);
      if(res.status=200){
          fetchExpense()
      }
    } catch (error) {
      console.log("error",error);
      
    }
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
  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => {
            setEditData(null);
            setModalOpen(true);
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          + Add Expense
        </button>

        <button
          onClick={downloadExcel}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
        >
          <FiDownload /> Download Excel
        </button>
      </div>

      {/* Line Graph */}
      <ExpenseLineChart expense={expense} darkMode={darkMode} />

      {/* List */}
      <ExpenseTable
        expense={expense}
        onEdit={(data: ExpenseEntry) => {
          setEditData(data);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
        darkMode={darkMode}
      />

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
