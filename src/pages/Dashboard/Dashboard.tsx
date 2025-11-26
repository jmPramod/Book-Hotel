import { useEffect, useState } from "react";
import { fetchDashBoardData } from "../../utils/Api.services";
import { useUserStore } from "../../store/useUserStore";
import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";
import TatalOverView from "../../components/PieChart/TatalOverView";
import TransactionPieChart from "../../components/PieChart/Last30DaysExpense";
import { useNavigate } from "react-router-dom";

export interface Transaction {
source?: string;
icon: string;
category: string;
_id?: string;
note: string;
amount: number;
type?: "income" | "expense";
date?: string;
}

export interface Last30DaysExpense {
total: number;
transaction: Transaction[];
}

export interface Last60DaysIncome {
total: number;
transaction: Transaction[];
}

export interface DashboardData {
totalBalance: number;
totalIncome: number;
totalExpense: number;
last30DaysExpense: Last30DaysExpense;
last60DaysIncome: Last60DaysIncome;
recentTransaction: Transaction[];
}

const Dashboard = () => {
const { darkMode , setLoading } = useUserStore();
const [data, setData] = useState<DashboardData | null>(null);
const navigate = useNavigate();

const getData = async () => {
try {
setLoading(true);
const res = await fetchDashBoardData();
if(res.status === 200){
setData(res.data.data as DashboardData);
}
} catch (error) {
console.error("Dashboard fetch error:", error);
}
setLoading(false);
};

useEffect(() => {
getData();
}, []);

if (!data) return <div className="text-center p-10">Loading...</div>;

const cardStyle = `${!darkMode ? "bg-white text-black" : "bg-gray-800 text-white"} p-6 rounded-xl shadow`;

return (
<div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen p-6`}> <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

 
  <div className="flex flex-wrap gap-5 mb-6 items-center ">
    <div className="flex flex-col gap-3 min-w-[30%]">
      <div className={`${cardStyle} flex items-center gap-4 flex-1 min-w-[250px]`}>
        <Wallet size={40} className="text-blue-500" />
        <div>
          <p className="text-sm">Total Balance</p>
          <h2 className="text-2xl font-bold">₹ {data.totalBalance}</h2>
        </div>
      </div>

      <div className={`${cardStyle} flex items-center gap-4 flex-1 min-w-[250px]`}>
        <ArrowUpCircle size={40} className="text-green-500" />
        <div>
          <p className="text-sm">Total Income</p>
          <h2 className="text-2xl font-bold">₹ {data.totalIncome}</h2>
        </div>
      </div>

      <div className={`${cardStyle} flex items-center gap-4 flex-1 min-w-[250px]`}>
        <ArrowDownCircle size={40} className="text-red-500" />
        <div>
          <p className="text-sm">Total Expense</p>
          <h2 className="text-2xl font-bold">₹ {data.totalExpense}</h2>
        </div>
      </div>
    </div>
 
    <TatalOverView data={data} darkMode={darkMode} />
  </div>

 
  <div className="flex flex-wrap gap-6 mb-6">
    <div className={`${cardStyle} flex-1 min-w-[300px]`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Last 30 Days Expense</h2>
        <button className="text-sm text-blue-500 hover:underline" onClick={() => navigate('/expense')}>See All</button>
      </div>
      <p className="text-lg font-bold">₹ {data.last30DaysExpense.total}</p>
      <ul className="mt-4 space-y-3">
        {data.last30DaysExpense.transaction.length === 0 ? (
          <p className="text-sm opacity-70">No expenses</p>
        ) : (
          data.last30DaysExpense.transaction.slice(0, 5).map((txn, idx) => (
            <li
              key={idx}
              className={`${!darkMode ? "bg-gray-100 text-black" : "bg-gray-700 text-white"} p-3 rounded-lg flex items-center justify-between`}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{txn.icon}</div>
                <div className="flex flex-col">
                  <span className="font-semibold capitalize">{txn.category || txn.source}</span>
                  <span className="text-xs opacity-70">{txn.date && new Date(txn.date).toLocaleString()}</span>
                </div>
              </div>
              <div className="font-bold text-red-500">- ₹ {txn.amount}</div>
            </li>
          ))
        )}
      </ul>
    </div>
    <TransactionPieChart
      transactions={data.last30DaysExpense.transaction}
      title="Last 30 Days Expense"
      darkMode={darkMode}
    />
  </div>
 
  <div className="flex flex-wrap gap-6 mb-6">
    <TransactionPieChart
      transactions={data.last60DaysIncome.transaction}
      title="Last 60 Days Income"
      darkMode={darkMode}
    />
    <div className={`${cardStyle} flex-1 max-w-[50%]`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Last 60 Days Income</h2>
        <button className="text-sm text-blue-500 hover:underline" onClick={() => navigate('/income')}>See All</button>
      </div>
      <p className="text-lg font-bold">₹ {data.last60DaysIncome.total}</p>
      <ul className="mt-4 space-y-3">
        {data.last60DaysIncome.transaction.length === 0 ? (
          <p className="text-sm opacity-70">No income</p>
        ) : (
          data.last60DaysIncome.transaction.slice(0, 5).map((txn, idx) => (
            <li
              key={idx}
              className={`${!darkMode ? "bg-gray-100 text-black" : "bg-gray-700 text-white"} p-3 rounded-lg flex items-center justify-between`}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{txn.icon}</div>
                <div className="flex flex-col">
                  <span className="font-semibold capitalize">{txn.category || txn.source}</span>
                  <span className="text-xs opacity-70">{txn.date && new Date(txn.date).toLocaleString()}</span>
                </div>
              </div>
              <div className="font-bold text-green-500">+ ₹ {txn.amount}</div>
            </li>
          ))
        )}
      </ul>
    </div>
  </div>
 
  <div className={`${cardStyle}`}>
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold">Recent Transactions</h2>
      <button className="text-sm text-blue-500 hover:underline">See All</button>
    </div>
    {data.recentTransaction.length === 0 ? (
      <p className="text-sm opacity-70">No recent transactions</p>
    ) : (
      <ul className="space-y-3">
        {data.recentTransaction.slice(0, 5).map((txn) => (
          <li
            key={txn._id}
            className={`${!darkMode ? "bg-gray-100 text-black" : "bg-gray-700 text-white"} flex items-center justify-between p-3 rounded-lg shadow-sm`}
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">{txn.icon}</div>
              <div className="flex flex-col leading-tight">
                <span className="font-semibold text-base capitalize">{txn.category || txn.source}</span>
                <span className="text-xs opacity-70">{txn.date && new Date(txn.date).toLocaleString()}</span>
              </div>
            </div>
            <div className={`font-bold ${txn.type === "income" ? "text-green-500" : "text-red-500"}`}>
              {txn.type === "income" ? "+ ₹" : "- ₹"}{txn.amount}
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
</div>


);
};

export default Dashboard;
