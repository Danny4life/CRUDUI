import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "./services/EmployeeService";

const UpdateEmployee = () => {

        const {id} = useParams();
        const navigate = useNavigate();
        const [employee, setEmployee] = useState({
            id : id,
            firstName : "",
            lastName : "",
            emailId : "",
        });

        const handleChange = (e) => {
            const value = e.target.value;
            setEmployee({...employee, [e.target.name] : value});
        
           }

           useEffect(() => {
             const fetchData = async () => {
                try {

                    const response = await EmployeeService.getEmployeeById(id);
                    setEmployee(response.data);

                }catch(error){
                    console.log(error);
                }
             }
             fetchData();
           }, [id])
           

    const updateEmployee = (e) => {

        e.preventDefault();
        EmployeeService.updateEmployee(employee, id)
        .then((response) => {
            navigate("/employeeList");
        })
        .catch((error) => {
            console.log(error);
        });
    };
    return ( 
        <div className="max-w-2xl flex shadow border-b mx-auto">
        <div className="px-8 py-8">
            <div className="font-thin text-2xl tracking">
                <h1>Update Employee</h1>
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
               onClick={(e) => updateEmployee(e)} 
               className="bg-green-400 hover:bg-green-700 px-6 py-2 rounded text-white font-semibold">
                    Update
               </button>
               <button 
            //    onClick={(e) => reset(e)}
                onClick={() => navigate("/employeeList")}
               className="bg-red-400 hover:bg-red-700 px-6 py-2 rounded text-white font-semibold">
                    Cancel
               </button>
            </div>
            
        </div>

    </div>
     );
}
 
export default UpdateEmployee;