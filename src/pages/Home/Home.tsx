 
import { BarChart3, LineChart, PieChart, User, Image as ImageIcon, FileText, Server, LayoutDashboard } from "lucide-react";
import { useUserStore } from "../../store/useUserStore";

 

const Home  = () => {
    const { darkMode } = useUserStore();
  
  const cardStyle = `
    p-5 rounded-xl shadow-md border transition hover:shadow-lg
    ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-black border-gray-200"}
  `;

  const sectionTitle = "text-xl font-semibold mb-3";

  return (
    <div className={`min-h-screen p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      
      <h1 className="text-3xl font-bold mb-6">📌 Project Overview</h1>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Dashboard Info */}
        <div className={cardStyle}>
          <h2 className={sectionTitle}>📊 Dashboard</h2>
          <p className="opacity-80">
            Overview of total income, expenses, and balance with charts like:
          </p>

          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2"><LayoutDashboard size={20}/> Interactive Dashboard</div>
            <div className="flex items-center gap-2"><LineChart size={20}/> Expense Line Chart</div>
            <div className="flex items-center gap-2"><BarChart3 size={20}/> Income Bar Graph</div>
            <div className="flex items-center gap-2"><PieChart size={20}/> Category Pie Chart</div>
          </div>
        </div>

        {/* Income */}
        <div className={cardStyle}>
          <h2 className={sectionTitle}>💰 Income Management</h2>
          <ul className="space-y-2 opacity-90">
            <li>✔ Add, Update, Delete income</li>
            <li>✔ Date & category based income</li>
            <li>✔ Emoji picker for icons</li>
            <li>✔ Monthly and yearly summaries</li>
          </ul>
        </div>

        {/* Expense */}
        <div className={cardStyle}>
          <h2 className={sectionTitle}>🧾 Expense Management</h2>
          <ul className="space-y-2 opacity-90">
            <li>✔ Add & edit expenses using modal</li>
            <li>✔ Emoji picker support</li>
            <li>✔ Delete expense with confirmation modal</li>
            <li>✔ Recharts for expense trends</li>
          </ul>
        </div>

        {/* Profile Page */}
        <div className={cardStyle}>
          <h2 className={sectionTitle}>👤 Profile Page</h2>
          <div className="flex items-center gap-2 mb-2">
            <User size={20}/> Update Personal Information
          </div>
          <div className="flex items-center gap-2">
            <ImageIcon size={20}/> Upload / Change Profile Picture (Cloudinary)
          </div>
        </div>

        {/* Swagger Documentation */}
        <div className={cardStyle}>
          <h2 className={sectionTitle}>📚 API Documentation</h2>
          <div className="flex items-center gap-2 mb-2">
            <FileText size={20}/> Fully documented using Swagger UI
          </div>
          <p className="opacity-80">Includes Endpoints for Auth, Expense, Income & Profile APIs.</p>
        </div>

        {/* Technology */}
        <div className={cardStyle}>
          <h2 className={sectionTitle}>🛠 Technology Stack</h2>
          <div className="flex items-center gap-2 mb-2">
            <Server size={20}/> Node.js + Express + TypeScript (Backend)
          </div>
          <div className="flex items-center gap-2 mb-2">
            <LayoutDashboard size={20}/> React + TypeScript + Tailwind (Frontend)
          </div>
          <p className="opacity-80">
            Includes JWT Authentication, Zustand Store, Axios Interceptors, and Recharts visualizations.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Home;
