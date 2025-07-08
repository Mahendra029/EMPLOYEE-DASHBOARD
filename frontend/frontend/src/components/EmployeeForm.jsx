import { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeForm = ({ selectedEmployee, refreshEmployees, clearSelection }) => {
  const [form, setForm] = useState({ name: '', email: '', phoneNumber: '', city: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedEmployee) {
      setForm({
        name: selectedEmployee.name || '',
        email: selectedEmployee.email || '',
        phoneNumber: selectedEmployee.phoneNumber || '',
        city: selectedEmployee.city || ''
      });
    }
  }, [selectedEmployee]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Invalid email';
    if (form.phoneNumber && !/^\d{10}$/.test(form.phoneNumber)) newErrors.phoneNumber = 'Phone number must be 10 digits';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      if (selectedEmployee) {
        await axios.put(`${import.meta.env.VITE_API_URL}/employees/updatedEmp/${selectedEmployee._id}`, form);
        alert("Employee updated");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/employees/add-emp`, form);
        alert("Employee added");
      }
      setForm({ name: '', email: '', phoneNumber: '', city: '' });
      setErrors({});
      refreshEmployees?.();
      clearSelection?.();
    } catch (err) {
      alert("Error submitting form",err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold text-white mb-4">{selectedEmployee ? "Edit Employee" : "Add New Employee"}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className={`p-3 w-full rounded-lg bg-gray-700 text-white border ${
              errors.name ? 'border-red-500' : 'border-gray-600'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className={`p-3 w-full rounded-lg bg-gray-700 text-white border ${
              errors.email ? 'border-red-500' : 'border-gray-600'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            className={`p-3 w-full rounded-lg bg-gray-700 text-white border ${
              errors.phoneNumber ? 'border-red-500' : 'border-gray-600'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.phoneNumber && <p className="text-red-400 text-sm mt-1">{errors.phoneNumber}</p>}
        </div>
        <div>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            className="p-3 w-full rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="mt-6 flex gap-4">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
        >
          {selectedEmployee ? "Update" : "Add"}
        </button>
        {selectedEmployee && (
          <button
            type="button"
            onClick={clearSelection}
            className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-6 rounded-lg"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default EmployeeForm;
