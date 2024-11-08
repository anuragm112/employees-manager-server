const Employee=require('../models/Employee');
  
const createEmployee=async(req,res)=>{
    try{
        const { f_Image, f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;
    if(!f_Image || !f_Name || !f_Email || !f_Mobile || !f_Designation || !f_gender || !f_Course ){
        return res.status(400).json("All fields are required");
    }
    const employee=await Employee.findOne(f_Email);
    if(employee){
        return res.status(401).json("Employee already exists");
    }
    const newEmployee= new Employee({
         f_Image: req.file.path,
         f_Name: f_Name,
         f_Email: f_Email, 
         f_Mobile: f_Mobile, 
         f_Designation: f_Designation, 
         f_gender:f_gender, 
         f_Course:f_Course
    });
    await newEmployee.save();
    return res.status(201).json("Employee Created Successfully");
    }catch(e){
        return res.status(500).json({message: e.message});
    }
}

const getAllEmployees=async()=>{
       try{
        const employees=await Employee.find();
        return res.status(201).json({count: employees.length, employees});
       }catch(e){
        return res.status(500).json({message: e.message});
       }
}

const editEmployee=async(req,res)=>{
   try{
    const { id } = req.params;
  const updatedData = req.file ? { ...req.body, image: req.file.path } : req.body;
    const updatedEmployee= await Employee.findByIdAndUpdate(id, updatedData);
    return res.status(201).json(`Updated Employee: ${updatedEmployee}`);
   } catch(e){
     return res.status(500).json({message: e.message});
   }    
}

const deleteEmployee=async(req,res)=>{
    try{
      const employeeId=req.params.id;
      await Employee.findByIdAndDelete(employeeId);
      return res.status(201).json("Employee Deleted");
    }catch(e){
        return res.status(500).json({message: e.message});
    }
}

module.exports={createEmployee, getAllEmployees,editEmployee, deleteEmployee};