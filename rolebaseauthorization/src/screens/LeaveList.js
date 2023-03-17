import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Header from "./Header";

function LeaveList() {
  const [data, setData] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [status, setStatus] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.id;

  useEffect(() => {
    getData(id);
  }, [id]);

  const getData = (id) => {
    //const token = localStorage.getItem('currentUser');
    // console.log(employeeList)
    axios
      .get(`http://localhost:5135/api/Company/Leaves?id=${id}`)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const BackTo = () => {
    navigate("/company");
  };

  const handleApprove = (employeeId) => {
    const url = `http://localhost:5135/api/Url/ApproveOrReject?id=${employeeId}`;
    const data = {
      employeeId: employeeId,
      status: 1,
    };
    axios
      .put(url, data)
      .then((result) => {
        getData(id);
        toast.success("Leave has been Update For This Employee");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleReject = (employeeId) => {
    const url = `http://localhost:5135/api/Url/ApproveOrReject?id=${employeeId}`;
    const data = {
      employeeId: employeeId,
      status: 3,
    };
    axios
      .put(url, data)
      .then((result) => {
        getData(id);
        toast.success("Leave has been Update For This Employee");
      })
      .catch((error) => {
        toast.error(error);
      });
  };


  return (
    <div>
      <ToastContainer />
      <Header />
      <div className="row">
        <div className="col-4 text-left m-2">
          <h2 className="text-primary">Leave List</h2>
        </div>
        <br />
        <div className="col-3">
          <br />
        </div>
      </div>
      <div className="col-6 m-2 p-2">
        <table className="table table-bordered table-striped table-active">
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Status</th>
              <th>StartDate</th>
              <th>EndDate</th>
              <th>Reason</th>
              <th>EmployeeId</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.id}</td>
                    <td>{item.status}</td>
                    <td>{item.startDate}</td>
                    <td>{item.endDate}</td>
                    <td>{item.reason}</td>
                    <td>{item.employeeId}</td>
                    <td colSpan={2}>
                      <button
                        className="btn btn-info"
                        onClick={() => handleApprove(item.employeeId)}
                      >
                        Approve
                      </button>{" "}
                      &nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => handleReject(item.employeeId)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <h2 className="text-info">"Loading..."</h2>
            )}
          </tbody>
        </table>
        <button class="btn btn-info m-2 p-2" onClick={BackTo}>
          Back To List
        </button>
      </div>
    </div>
  );
}

export default LeaveList;
