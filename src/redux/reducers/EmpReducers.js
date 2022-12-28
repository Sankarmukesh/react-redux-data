import axios from "axios";
const intialState = {
  emp_data: [],
  single_emp: null,
  loading: null,
};
export const EmpReducers = (state = intialState, actions) => {
  switch (actions.type) {
    case "ADD_EMP":
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

    case "StartFetch":
      return { ...state, loading: true };

    case "ALL":
      return { ...state, emp_data: actions.payload };

    case "Search":
      return {
        ...state,
        emp_data: state.emp_data.filter((e) => {
          return e.emp_name
            .toLowerCase()
            .includes(actions.payload.toLowerCase());
        }),
      };

    case "EDIT":
      return {
        ...state,
        emp_data: state.emp_data.map((e) =>
          e.id === actions.payload.id ? actions.payload.emp : e
        ),
      };
    case "Delete":
      return {
        ...state,
        emp_data: state.emp_data.filter((e) => e.id !== actions.payload.id),
      };

    default:
      return state;
  }
};
