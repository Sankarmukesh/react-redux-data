import axios from "axios";

export const AddEmp = (emp) => {
  return {
    type: "ADD_EMP",
    payload: emp,
  };
};

export const singleEmp = (emp) => {
  return {
    type: "SINGLE",
    payload: emp,
  };
};

export const EditEmp = (id, emp) => {
  return {
    type: "EDIT",
    payload: { id, emp },
  };
};




export const allEmps = () =>  async (dispatch) => {
    
 const data = await axios.get("http://localhost:3000/employees")
 dispatch({type:"ALL",payload:data.data})
 console.log(data)
  
};
