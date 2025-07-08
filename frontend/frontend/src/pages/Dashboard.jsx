import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

const Dashboard = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [refreshToggle, setRefreshToggle] = useState(false);
  const navigate = useNavigate();

  const handleRefresh = () => setRefreshToggle((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login", { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">
          Employee Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Stack Form and List vertically */}
      <div className="flex flex-col gap-6">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <EmployeeForm
            selectedEmployee={selectedEmployee}
            refreshEmployees={handleRefresh}
            clearSelection={() => setSelectedEmployee(null)}
          />
        </div>
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <EmployeeList
            onEdit={(employee) => setSelectedEmployee(employee)}
            refreshToggle={refreshToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
