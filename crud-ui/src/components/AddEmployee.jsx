import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "./services/EmployeeService";

const AddEmployee = () => {

   const  [employee, setEmployee] = useState(
   {
    id : "",
    firstName : "",
    lastName : "",
    emailId : "",
   });

   const navigate = useNavigate();

   const handleChange = (e) => {
    const value = e.target.value;
    setEmployee({...employee, [e.target.name] : value});

   }

   const saveEmployee = (e) => {
    e.preventDefault();
    EmployeeService.saveEmployee(employee).then((response) => {
        //console.log(response);
        setEmployee(response);
        navigate("/employeeList");
    })
    .catch((error) => {
        console.log(error);
    })
   }

   // reset method clears the add employee if there is a mistake by the user

   const reset = (e) => {
        e.preventDefault();
        setEmployee({
            id : "",
            firstName : "",
            lastName : "",
            emailId : "",
        });
   }
    return ( 
        <div className="max-w-2xl flex shadow border-b mx-auto">
            <div className="px-8 py-8">
                <div className="font-thin text-2xl tracking">
                    <h1>Add New Employee</h1>
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 font-normal text-sm">
                        First Name
                    </label>
                    <input 
                    type="text"
                    name="firstName"
                    value={employee.firstName}
                    onChange={(e) => handleChange(e)}
                    className="h-10 w-96 border mt-2 px-2 py-2" />
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 font-normal text-sm">
                        Last Name
                    </label>
                    <input 
                    type="text" 
                    name="lastName"
                    value={employee.lastName}
                    onChange={(e) => handleChange(e)}
                    className="h-10 w-96 border mt-2 px-2 py-2" />
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 font-normal text-sm">
                        Email
                    </label>
                    <input 
                    type="email" 
                    name="emailId"
                    value={employee.emailId}
                    onChange={(e) => handleChange(e)}
                    className="h-10 w-96 border mt-2 px-2 py-2" />
                </div>
                <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
                   <button
                   onClick={(e) => saveEmployee(e)} 
                   className="bg-green-400 hover:bg-green-700 px-6 py-2 rounded text-white font-semibold">
                        Save
                   </button>
                   <button 
                   onClick={(e) => reset(e)}
                   className="bg-red-400 hover:bg-red-700 px-6 py-2 rounded text-white font-semibold">
                        Clear
                   </button>
                </div>
                
            </div>

        </div>
     );
}
 
export default AddEmployee;