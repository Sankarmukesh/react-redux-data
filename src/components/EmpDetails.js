import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Modal } from "antd";
import "./emp.scss";
import { useDispatch, useSelector } from "react-redux";
import { AddEmp, AddUserThunk, allEmps, deleteUserThunk, EditUserThunk, singleEmp } from "../redux/actions/EmpActions";
import {debounce} from 'lodash'
const EmpDetails = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.employees);
  const [search,setSearch] = useState("")
  useEffect(()=>{
    
  },[search])
  const [showModal, setShowModal] = useState(false);
  const [empDetails, setEmpDetails] = useState({
    emp_id: "",
    emp_name: "",
    emp_experience: "",
    salary: "",
  });
  const single_employee = useSelector((state) => state.employees.single_emp);

  const [SingleempDetails, setSingleEmpDetails] = useState({
    emp_id: "",
    emp_name: "",
    emp_experience: "",
    salary: "",
  });

  useEffect(() => {
    single_employee !== null && setSingleEmpDetails(single_employee);
  }, [single_employee]);


  // calls the allEmps() action when page loads
  useEffect(() => {
    dispatch(allEmps());
  }, [dispatch]);

  const addData = () => {
    dispatch(AddUserThunk(empDetails));
    setEmpDetails({ emp_id: "", emp_name: "", emp_experience: "", salary: "" });
  };




  const edit = (id) => {
    dispatch(singleEmp(id));
    setShowModal(true);
  };
  const deletion = (id) => {
    dispatch(deleteUserThunk(id));
  };

  const searchHandle =(e) =>{
    setSearch(e.target.value);
    dispatch({type:"Search",payload:e.target.value})
  }
  return (
    <div>
      <Modal
        style={{ width: "60px" }}
        title={`Edit Employee Data`}
        centered
        visible={showModal}
        onOk={() => {
          dispatch(EditUserThunk(SingleempDetails.id, SingleempDetails));
          setShowModal(false);
        }}
        onCancel={() => {
          setShowModal(false);
        }}
      >
        <div className="form">
          <div>
            <input
              type="text"
              placeholder="Id"
              value={SingleempDetails.emp_id}
              onChange={(e) => {
                setSingleEmpDetails((prev) => ({
                  ...prev,
                  emp_id: e.target.value,
                }));
              }}
              id=""
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Employee name"
              value={SingleempDetails.emp_name}
              onChange={(e) => {
                setSingleEmpDetails((prev) => ({
                  ...prev,
                  emp_name: e.target.value,
                }));
              }}
              id=""
            />
          </div>
          <div>
            <input
              placeholder="Experience"
              type="number"
            min={0}
              value={SingleempDetails.emp_experience}
              onChange={(e) => {
                setSingleEmpDetails((prev) => ({
                  ...prev,
                  emp_experience: e.target.value,
                }));
              }}
              id=""
            />
          </div>
          <div>
            <input
              placeholder="Salary"
              type="number"
              min={0}
              value={SingleempDetails.salary}
              onChange={(e) => {
                setSingleEmpDetails((prev) => ({
                  ...prev,
                  salary: e.target.value,
                }));
              }}
              id=""
            />
          </div>
        </div>
      </Modal>
      <h1 style={{ textAlign: "center" }}>Employee Management</h1>
      <div className="form">
        <div>
          <input
            type="text"
            placeholder="Id"
            value={empDetails.emp_id}
            onChange={(e) => {
              setEmpDetails((prev) => ({ ...prev, emp_id: e.target.value }));
            }}
            id=""
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Employee name"
            value={empDetails.emp_name}
            onChange={(e) => {
              setEmpDetails((prev) => ({ ...prev, emp_name: e.target.value }));
            }}
            id=""
          />
        </div>
        <div>
          <input
            placeholder="Experience"
            type="number"
            min={0}
            value={empDetails.emp_experience}
            onChange={(e) => {
              setEmpDetails((prev) => ({
                ...prev,
                emp_experience: e.target.value,
              }));
            }}
            id=""
          />
        </div>
        <div>
          <input
            placeholder="Salary"
            type="number"
            min={0}
            value={empDetails.salary}
            onChange={(e) => {
              setEmpDetails((prev) => ({ ...prev, salary: +e.target.value }));
            }}
            id=""
          />
        </div>
        {empDetails.emp_id !== "" &&
        empDetails.emp_name !== "" &&
        empDetails.emp_experience !== "" &&
        empDetails.salary !== "" ? (
          <button
            style={{
              cursor: "pointer",
              background: "blue",
              padding: "5px",
              color: "white",
              outline: "0",
              border: "none",
            }}
            onClick={addData}
          >
            Add Data
          </button>
        ) : (
          <button
            style={{
              cursor: "not-allowed",
              background: "blue",
              padding: "5px",
              color: "white",
              outline: "0",
              border: "none",
            }}
          >
            Add Data
          </button>
        )}
      </div>
      <div style={{ background: "white", maxWidth: "1100px", margin: "auto" }}>
        <input
          type="text"
          style={{ padding: "5px", marginBottom: "10px" }}
          placeholder="search employee with name"
          value={search}
          onChange={(e) => {
            searchHandle(e)
          }}
          id=""
        />

        <TableContainer
          component={Paper}
          className="table "
          style={
            {
              // marginLeft: "80px",
              // overflowX: "scroll",
            }
          }
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className="t">
                {/* <TableCell className="tableCell head">Id</TableCell> */}
                <TableCell className="tableCell head">Id</TableCell>
                <TableCell className="tableCell head">Name</TableCell>
                <TableCell className="tableCell head">Experience</TableCell>
                <TableCell className="tableCell head">Salary</TableCell>
                <TableCell className="tableCell head">Edit</TableCell>
                <TableCell className="tableCell head">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.emp_data.map((row, index) => (
                <>
                  <TableRow>
                    {/* <TableCell className="tableCell bo">{row.index}</TableCell> */}

                    <TableCell className="tableCell bo">{row.emp_id}</TableCell>

                    <TableCell className="tableCell bo">
                      {row.emp_name}
                    </TableCell>
                    <TableCell className="tableCell bo">
                      {row.emp_experience}
                    </TableCell>
                    <TableCell className="tableCell bo">{row.salary}</TableCell>

                    <TableCell className="tableCell bo">
                      <i
                        className="fa-solid fa-pen-to-square edit"
                        onClick={() => {
                          edit(row.emp_id);
                        }}
                      ></i>
                    </TableCell>
                    <TableCell className="tableCell bo">
                      <i
                        className="fa-solid fa-trash del"
                        onClick={() => {
                          deletion(row.id);
                        }}
                      ></i>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default EmpDetails;
