const Employee = require("../models/Employee");

// Create a new employee 
const createEmployee = async (req, res) => {
  try {
    const { name, email, phoneNumber, city } = req.body;

    if (!name || !email || !phoneNumber || !city) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const employee = new Employee({ name, email, phoneNumber, city });
    await employee.save();

    res.status(201).json(employee);
  } catch (error) {
    console.error("Create Employee Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get all employees
const getEmployee = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Get Employees Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get a single employee by ID
const singleEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error("Get Single Employee Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update employee by ID
const updateEmployee = async (req, res) => {
  try {
    const { name, email, phoneNumber, city } = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, email, phoneNumber, city },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error("Update Employee Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete employee by ID
const deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    console.log("Employee deleted:", deletedEmployee._id);
    res.status(204).send();
  } catch (error) {
    console.error("Delete Employee Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  createEmployee,
  getEmployee,
  singleEmployee,
  updateEmployee,
  deleteEmployee,
};
