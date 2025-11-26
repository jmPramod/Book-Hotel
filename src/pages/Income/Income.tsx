import  { useEffect, useState } from "react";
 
import { useUserStore } from "../../store/useUserStore";
import type { IncomeEntry } from "../../components/Bargraph/IncomeBarChart";
import IncomeBarChart from "../../components/Bargraph/IncomeBarChart";
import { addIncomeApi, deleteIncomeApi, fetchallIncome, updateIncomeApi } from "../../utils/Api.services";
import IncomeModal from "./IncomeModel";
import IncomeList from "./IncomeList";

const Income = () => {
  const { darkMode } = useUserStore();

  const [income, setIncome] = useState<IncomeEntry[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<IncomeEntry | null>(null);

  const fetchIncome = async () => {
    try {
      const res = await fetchallIncome();
      setIncome(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  const handleAddIncome = async(data: any) => {
    const newEntry: IncomeEntry = {
      _id: crypto.randomUUID(),
      ...data,
    };
    setIncome([...income, newEntry]);
 
try {
  const res=await addIncomeApi(data)
  console.log("res",res);
  if(res.status=200){
      fetchIncome();
  }
} catch (error) {
  console.log("error",error);
  
}

  };
  console.log("add income");
  

  const handleUpdateIncome =async (data: any) => {
    setIncome(
      income.map((item) =>
        item._id === editData?._id ? { ...item, ...data } : item
      )
    );
    setEditData(null);
    try {
      if(editData&&editData._id)
        {


          const res=await updateIncomeApi(data,editData._id)
          console.log("res",res);
          if(res.status=200){
              fetchIncome();
          }
        }
} catch (error) {
  console.log("error",error);
  
}
  };

  const handleDeleteIncome = async(id: string) => {
    setIncome(income.filter((i) => i._id !== id));

    try {
  const res=await deleteIncomeApi(id)
  console.log("res",res);
  if(res.status=200){
      fetchIncome();
  }
} catch (error) {
  console.log("error",error);
  
}
  };

  return (
    <div className="p-5">
      {/* Bar Chart */}
      <IncomeBarChart income={income} darkMode={darkMode} />

      {/* List */}
      <IncomeList
        income={income}
        darkMode={darkMode}
        onEdit={(item) => {
          setEditData(item);
          setShowModal(true);
        }}
        onDelete={handleDeleteIncome}
        onAdd={() => setShowModal(true)}
      />

      {/* Modal */}
      {showModal && (
        <IncomeModal
          close={() => {
            setShowModal(false);
            setEditData(null);
          }}
          onSubmit={editData ? handleUpdateIncome : handleAddIncome}
          editData={editData}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default Income;
