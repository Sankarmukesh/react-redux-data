import axios from "axios";
const intialState = {
  emp_data: [],
  single_emp: null,
};
export const EmpReducers = (state = intialState, actions) => {
  switch (actions.type) {
    case "ADD_EMP":
      axios
        .post("http://localhost:3000/employees", actions.payload)
        .then((res) => {});
      return {
        ...state,
        emp_data: [...state.emp_data, actions.payload],
      };

    case "SINGLE":
      const single_data = state.emp_data.filter((d) => {
        return d.emp_id === actions.payload;
      });

      return {
        ...state,
        single_emp: single_data[0],
      };

    case "ALL":
      axios.get("http://localhost:3000/employees").then((res) => {
        state.emp_data = res.data;
        console.log(state);
        return { ...state, emp_data: res.data };
      });
      console.log(state);
      return state;
    case "Search":
      return {
        ...state,
        emp_data: state.emp_data.filter((e) => {
          e.emp_name.toLowerCase().includes(actions.payload.toLowerCase());
        }),
      };

    case "EDIT":
      axios
        .put(
          `http://localhost:3000/employees/${actions.payload.id}`,
          actions.payload.emp
        )
        .then((res) => {});

      return {
        ...state,
        emp_data: state.emp_data.map((e) =>
          e.id === actions.payload.id ? actions.payload.emp : e
        ),
      };
    case "Delete":
      axios
        .delete(`http://localhost:3000/employees/${actions.payload.id}`)
        .then((res) => {});

      return {
        ...state,
        emp_data: state.emp_data.filter((e) => e.id !== actions.payload.id),
      };
    default:
      return state;
  }
};
