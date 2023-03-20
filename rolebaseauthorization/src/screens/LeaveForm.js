import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Header from "./Header";
import jwtInterceoptor from "./jwtInterceoptor";

function LeaveForm() {
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
    jwtInterceoptor
      .get(`http://localhost:5135/api/Company/Leaves?id=${id}`)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleSave = () => {
    // let token =localStorage.getItem("currentUser");
    const url = "http://localhost:5135/api/Leave";
    const data = {
      sartDate: startDate,
      endDate: endDate,
      reason: reason,
      employeeId: employeeId,
      status: "pending",
    };
    jwtInterceoptor
      .post(url, data)
      .then((result) => {
        getData(id);
        clear();
        toast.success("Leave has been added For This Employee");
      })
      .catch((error) => {
        toast.dark("Something Is Wrong");
      });
  };

  const clear = () => {
    setStartDate(0);
    setEndDate(0);
    setReason("");
    setEmployeeId(0);
  };

  const BackTo = () => {
    navigate("/employee");
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
          <button
            className="btn btn-info form-control"
            data-toggle="modal"
            data-target="#newModal"
          >
            New Leave
          </button>
        </div>
      </div>
      <div className="col-6 m-2 p-2">
        <table className="table table-bordered table-striped table-active">
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>StartDate</th>
              <th>EndDate</th>
              <th>Reason</th>
              <th>EmployeeId</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.status}</td>
                    <td>{item.startDate}</td>
                    <td>{item.endDate}</td>
                    <td>{item.reason}</td>
                    <td>{item.employeeId}</td>
                    {/* <td>{item.leave}</td> */}
                  </tr>
                );
              })
            ) : (
              <h2 className="text-info">"Loading..."</h2>
            )}
          </tbody>
        </table>
        <button className="btn btn-info m-2 p-2" onClick={BackTo}>
          Back To List
        </button>
      </div>
      <form>
        <div className="modal" id="newModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* <!-- Header --> */}
              <div className="modal-header">
                <div className="modal-tittle text-primary">New Leave</div>
                <button className="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>
              {/* <!-- Body --> */}
              <div className="modal-body">
                {/* <div className="form-group row">
                  <label for="txtstatus" className=" text-success col-sm-4">
                    StartDate
                  </label>
                  <div class="col-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter StartDate"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    />
                  </div>
                </div> */}
                <div className="form-group row">
                  <label for="txtstartdate" className=" text-success col-sm-4">
                    StartDate
                  </label>
                  <div class="col-8">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Enter StartDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label for="txtenddate" className=" text-success col-sm-4">
                    EndDate
                  </label>
                  <div className="col-8">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Enter EndDate"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label for="txtreason" className=" text-success col-sm-4">
                    Reason
                  </label>
                  <div class="col-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label for="txtemployeeid" className=" text-success col-sm-4">
                    EmployeeId
                  </label>
                  <div class="col-8">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Id"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {/* <!-- Footer --> */}
              <div className="modal-footer">
                <button
                  className="btn btn-info"
                  onClick={() => handleSave()}
                  data-dismiss="modal"
                >
                  Submit
                </button>
                <button className="btn btn-danger">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LeaveForm;
