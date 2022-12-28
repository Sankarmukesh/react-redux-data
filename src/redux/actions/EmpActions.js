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

// export const EditEmp = (id, emp) => {
  // return {
  //   type: "EDIT",
  //   payload: { id, emp },
  // };
// };

// Thunk
export const allEmps = () => async (dispatch) => {
  dispatch({ type: "StartFetch" });
  try {
    const res = await fetch(`http://localhost:3000/employees`);
    const data = await res.json();
    dispatch({ type: "ALL", payload: data });
  } catch (err) {
    dispatch({ type: "StartFetch" });
  }
};

// ADD user Thunk

export const AddUserThunk = (data) => async (dispatch) => {
  await axios.post("http://localhost:3000/employees", data).then((res) => {
    dispatch({
      type: "ADD_EMP",
      payload: data,
    });
  });
};

// EDIT user Thunk
export const EditUserThunk = (id, data) => async (dispatch) => {
  await axios
    .put(`http://localhost:3000/employees/${id}`, data)
    .then((res) => {
      dispatch( {
        type: "EDIT",
        payload: { id, emp:data },
      })
    });
};



// Delete employee thunk
export const deleteUserThunk = (id)=>async(dispatch)=>{
  axios
  .delete(`http://localhost:3000/employees/${id}`)
  .then((res) => {
    dispatch({ type: "Delete", payload: { id } })
  });
}
