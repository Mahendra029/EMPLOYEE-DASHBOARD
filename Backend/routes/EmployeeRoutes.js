const express = require("express")
const EmployeeController =require("../controllers/EmployeeController")
const Employee = require("../models/Employee")
const router = express.Router()

router.post("/add-emp",EmployeeController.createEmployee)
router.get("/allEmployee",EmployeeController.getEmployee)
router.get("/employee/:id",EmployeeController.singleEmployee)
router.put("/updatedEmp/:id",EmployeeController.updateEmployee)
router.delete("/deletedEmp/:id",EmployeeController.deleteEmployee)
module.exports=router