import { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { useUserStore } from "../../store/useUserStore";

import type { IncomeEntry } from "../../components/Bargraph/IncomeBarChart";
import IncomeBarChart from "../../components/Bargraph/IncomeBarChart";

import {
  addIncomeApi,
  deleteIncomeApi,
  fetchallIncome,
  updateIncomeApi,
} from "../../utils/Api.services";

import IncomeModal from "./IncomeModel";
import IncomeList from "./IncomeList";

const Income = () => {
  const { darkMode, setLoading } = useUserStore();

  const [income, setIncome] = useState<IncomeEntry[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<IncomeEntry | null>(null);

  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [pagination, setPagination] = useState({ totalItems: 0, totalPages: 1 });

  const [searchText, setSearchText] = useState("");

  // Fetch income with optional search
  const fetchIncome = async (search = "") => {
    setLoading(true);
    try {
      const res = await fetchallIncome(page, limit, search); // pass search to API
      setIncome(res?.data || []);
      setPagination(res?.pagination || { totalItems: 0, totalPages: 1 });
    } catch (error) {
      console.log("Error fetching income:", error);
    }
    setLoading(false);
  };

  // Debounced search
  const debouncedFetch = useCallback(
    debounce((val: string) => {
      fetchIncome(val);
    }, 500),
    [page]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    debouncedFetch(e.target.value);
  };

  useEffect(() => {
    fetchIncome(searchText);
  }, [page]);

  const handleAddIncome = async (data: any) => {
    setLoading(true);
    try {
      const res = await addIncomeApi(data);
      if (res.status === 200) fetchIncome(searchText);
    } catch (error) {
      console.log("Error adding income:", error);
    }
    setLoading(false);
  };

  const handleUpdateIncome = async (data: any) => {
    if (!editData?._id) return;
    setLoading(true);
    try {
      const res = await updateIncomeApi(data, editData._id);
      if (res.status === 200) fetchIncome(searchText);
    } catch (error) {
      console.log("Error updating income:", error);
    }
    setLoading(false);
    setEditData(null);
  };

  const handleDeleteIncome = async (id: string) => {
    setLoading(true);
    try {
      const res = await deleteIncomeApi(id);
      if (res.status === 200) fetchIncome(searchText);
    } catch (error) {
      console.log("Error deleting income:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-5 flex flex-col gap-6">
    

      <IncomeBarChart income={income} darkMode={darkMode} />

      <IncomeList
      handleSearchChange={handleSearchChange}
searchText={searchText}
        income={income}
        darkMode={darkMode}
        onEdit={(item) => { setEditData(item); setShowModal(true); }}
        onDelete={handleDeleteIncome}
        onAdd={() => setShowModal(true)}
      />

      <div className="flex justify-center items-center gap-6 mt-4">
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

      {showModal && (
        <IncomeModal
          close={() => { setShowModal(false); setEditData(null); }}
          onSubmit={editData ? handleUpdateIncome : handleAddIncome}
          editData={editData}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default Income;
