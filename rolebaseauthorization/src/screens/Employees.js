import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import { toast, ToastContainer } from "react-toastify";
import jwtInterceoptor from "./jwtInterceoptor";

const Employees = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [data, setData] = useState([]);

  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [pfAccountNumber, setPFAccountNumber] = useState("");
  const [panCard, setPANCard] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [applicationUserId, setApplicationUserId] = useState("");

  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editusername, setEditUserName] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editAccountNumber, setEditAccountNumber] = useState("");
  const [editpfAccountNumber, setEditPFAccountNumber] = useState("");
  const [editPanCard, setEditPANCard] = useState("");
  const [editCompanyId, setEditCompanyId] = useState("");
  const [editapplicationUserId, setEditApplicationUserId] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.id;

  useEffect(() => {
    getData(id);
  }, [id]);

  const getData = (id) => {
    jwtInterceoptor
      .get(`http://localhost:5135/api/Company/Employees?id=${id}`)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const Back = () => {
    navigate("/company");
  };

  const handleEdit = (id) => {
    handleShow();
    jwtInterceoptor
      .get(`http://localhost:5135/api/Employee/${id}`)
      .then((result) => {
        setEditName(result.data.name);
        setEditUserName(result.data.userName);
        setEditAddress(result.data.address);
        setEditAccountNumber(result.data.accountNumber);
        setEditPFAccountNumber(result.data.pfAccountNumber);
        setEditPANCard(result.data.panCard);
        setEditCompanyId(result.data.companyId);
        setApplicationUserId(result.data.applicationUserId);
        setEditId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSave = () => {
    const url = "http://localhost:5135/api/Employee";
    const data = {
      name: name,
      username: userName,
      address: address,
      accountNumber: accountNumber,
      pfAccountNumber: pfAccountNumber,
      panCard: panCard,
      companyId: companyId,
      applicationUserId: applicationUserId,
    };
    jwtInterceoptor
      .post(url, data)
      .then((result) => {
        getData(id);
        clear();
        toast.success("Employee has been added");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const clear = () => {
    setName("");
    setUserName("");
    setAddress("");
    setAccountNumber(0);
    setPFAccountNumber(0);
    setPANCard(0);
    setCompanyId(0);
    setApplicationUserId("");
    setEditId("");
    setEditName("");
    setEditUserName("");
    setEditAddress("");
    setEditAccountNumber(0);
    setEditPFAccountNumber(0);
    setEditPANCard(0);
    setEditCompanyId(0);
    setEditApplicationUserId("");
  };

  const handleUpdate = () => {
    const uRl = `http://localhost:5135/api/Employee/${editId}`;
    const data = {
      id: editId,
      name: editName,
      username: editusername,
      address: editAddress,
      accountnumber: editAccountNumber,
      pfaccountnumber: editpfAccountNumber,
      pancard: editPanCard,
      companyid: editCompanyId,
      applicationUserId: applicationUserId,
    };
    jwtInterceoptor
      .put(uRl, data)
      .then((result) => {
        handleClose();
        getData(id);
        clear();
        toast.success("data has been updated");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this data") === true) {
      jwtInterceoptor
        .delete(`http://localhost:5135/api/Employee/${id}`)
        .then((result) => {
          if (result.status === 200) {
            getData();
            toast.success("Employee Designation has been deleted");
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const Designation = (id) => {
    navigate("/designation", { state: { id: id } });
  };

  const LeaveList = (id) => {
    navigate("/leavelist", { state: { id: id } });
  };

  return (
    <div>
      <ToastContainer />
      <Header />
      <div className="row">
        <div className="col-8 text-left m-2">
          <h2 className="text-primary">Employee List</h2>
        </div>
        <br />
        <div className="col-3">
          <br />
          <button
            className="btn btn-info form-control"
            data-toggle="modal"
            data-target="#newModal"
          >
            New Employee
          </button>
        </div>
      </div>
      <div className="col-10 m-2 p-2">
        <table className="table table-bordered table-striped table-active">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>UserName</th>
              <th>Address</th>
              <th>Account Number</th>
              <th>PFNumber</th>
              <th>PANCard</th>
              <th>CompanyId</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.userName}</td>
                    <td>{item.address}</td>
                    <td>{item.accountNumber}</td>
                    <td>{item.pfAccountNumber}</td>
                    <td>{item.panCard}</td>
                    <td>{item.companyId}</td>
                    <td colSpan={2}>
                      <button
                        className="btn btn-info"
                        onClick={() => handleEdit(item.id)}
                        data-target="#editModal"
                        data-toggle="modal"
                        data-dismiss="modal"
                      >
                        Edit
                      </button>{" "}
                      &nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-info m-1"
                        onClick={() => LeaveList(item.id)}
                      >
                        LeaveList
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
        <button
          className="btn btn-info m-1"
          onClick={() => Designation(id)}
          data-toggle="modal"
        >
          Designation
        </button>
        <button class="btn btn-info m-2 p-2" onClick={Back}>
          Back To List
        </button>
      </div>
      <form>
        <div className="modal" id="newModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* <!-- Header --> */}
              <div className="modal-header">
                <div className="modal-tittle text-primary">New Employee</div>
                <button className="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>
              {/* <!-- Body --> */}
              <div className="modal-body">
                <div className="form-group row">
                  <label for="txtname" className=" text-success col-sm-4">
                    Name
                  </label>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label for="txtusername" className=" text-success col-sm-4">
                    UserName
                  </label>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label for="txtaddress" className="text-success col-sm-4">
                    Address
                  </label>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label for="txtaccountnumber" className="text-success col-sm-4">
                    AccountNumber
                  </label>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter AccountNumber"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label for="txtpfaccountnumber" className="text-success col-sm-4">
                    PFAccountNumber
                  </label>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter PFACcountNumber"
                      value={pfAccountNumber}
                      onChange={(e) => setPFAccountNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label for="txtpancard" className=" text-success col-sm-4">
                    PANCard
                  </label>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter PANCard"
                      value={panCard}
                      onChange={(e) => setPANCard(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label for="txtcompanyid" className=" text-success col-sm-4">
                    CompanyId
                  </label>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Id"
                      value={companyId}
                      onChange={(e) => setCompanyId(e.target.value)}
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
                <button className="btn btn-danger" data-dismiss="modal">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* <!-- Edit --> */}
      <form>
        <div className="modal" id="editModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content" show={show} onHide={handleClose}>
              {/* <!-- Header --> */}
              <div className="modal-header">
                <div className="modal-tittle text-primary">Edit Employees</div>
                <button className="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>
              {/* <!-- Body --> */}
              <div className="modal-body">
                <div className="form-group row">
                  <label for="txtname" class=" text-success col-sm-4">
                    Name
                  </label>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Name"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label for="txtusername" className=" text-success col-sm-4">
                    UserName
                  </label>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Name"
                      value={editusername}
                      onChange={(e) => setEditUserName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label for="txtaddress" className="text-success col-sm-4">
                    Address
                  </label>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Address"
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label for="txtaccountnumber" className="text-success col-sm-4">
                    AccountNumber
                  </label>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter AccountNumber"
                      value={editAccountNumber}
                      onChange={(e) => setEditAccountNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label for="txtpfaccountnumber" className="text-success col-sm-4">
                    PFAccountNumber
                  </label>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter PFACcountNumber"
                      value={editpfAccountNumber}
                      onChange={(e) => setEditPFAccountNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label for="txtpancard" className=" text-success col-sm-4">
                    PANCard
                  </label>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter PANCard"
                      readOnly
                      value={editPanCard}
                      onChange={(e) => setEditPANCard(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label for="txtcompanyid" className=" text-success col-sm-4">
                    CompanyId
                  </label>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Id"
                      value={editCompanyId}
                      onChange={(e) => setEditCompanyId(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {/* <!-- Footer --> */}
              <div className="modal-footer">
                <button
                  className="btn btn-info"
                  onClick={() => handleUpdate()}
                  data-dismiss="modal"
                >
                  Submit
                </button>
                <button className="btn btn-danger" data-dismiss="modal">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Employees;
