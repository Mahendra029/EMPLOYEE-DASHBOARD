import { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeList = ({ onEdit, refreshToggle }) => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/employees/allEmployee`);
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch employees.');
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/employees/deletedEmp/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error(error);
      alert('Delete failed.');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [refreshToggle]); // refresh when toggled from Dashboard

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-6 overflow-x-auto text-white">
      <h2 className="text-2xl font-bold mb-4">All Employees</h2>

      <table className="min-w-full table-auto border-collapse border border-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th className="border border-gray-700 px-4 py-2 text-left text-sm font-semibold">Name</th>
            <th className="border border-gray-700 px-4 py-2 text-left text-sm font-semibold">Email</th>
            <th className="border border-gray-700 px-4 py-2 text-left text-sm font-semibold">City</th>
            <th className="border border-gray-700 px-4 py-2 text-center text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp._id} className="hover:bg-gray-700 transition">
                <td className="border border-gray-700 px-4 py-2">{emp.name}</td>
                <td className="border border-gray-700 px-4 py-2">{emp.email}</td>
                <td className="border border-gray-700 px-4 py-2">{emp.city}</td>
                <td className="border border-gray-700 px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => onEdit(emp)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteEmployee(emp._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-400">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
