import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import { toast, ToastContainer } from "react-toastify";

const Employees = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [data, setData] = useState([]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [pfAccountNumber, setPFAccountNumber] = useState("");
  const [panCard, setPANCard] = useState("");
  const [companyId, setCompanyId] = useState("");
  //const [leave, setLeave] = useState(0);

  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editAccountNumber, setEditAccountNumber] = useState("");
  const [editpfAccountNumber, setEditPFAccountNumber] = useState("");
  const [editPanCard, setEditPANCard] = useState("");
  const [editCompanyId, setEditCompanyId] = useState("");
  //const [editleave, setEditLeave] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.id;

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem('currentUser'));
    if(token == undefined){
      return;
    }
    getData(id);
  }, [id]);

  const getData = (id) => {
    axios
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
    //let token =localStorage.getItem("currentUser");
    //alert(id);
    handleShow();
    axios
      .get(`http://localhost:5135/api/Employee/${id}`)
      .then((result) => {
        setEditName(result.data.name);
        setEditAddress(result.data.address);
        setEditAccountNumber(result.data.accountNumber);
        setEditPFAccountNumber(result.data.pfAccountNumber);
        setEditPANCard(result.data.panCard);
        setEditCompanyId(result.data.companyId);
        setEditId(id);
        //setEditLeave(result.data.leave);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSave = () => {
    let token = JSON.parse(localStorage.getItem('currentUser')).token;
    const url = "http://localhost:5135/api/Employee";
    const data = {
      name: name,
      address: address,
      accountNumber: accountNumber,
      pfAccountNumber: pfAccountNumber,
      panCard: panCard,
      companyId: companyId,
    };
    axios
      .post(url, data, { headers: { Authorization: `Bearer ${token}` } })
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
    setAddress("");
    setAccountNumber(0);
    setPFAccountNumber(0);
    setPANCard(0);
    setCompanyId(0);
    //setLeave(0);
    setEditId("");
    setEditName("");
    setEditAddress("");
    setEditAccountNumber(0);
    setEditPFAccountNumber(0);
    setEditPANCard(0);
    setEditCompanyId(0);
    //setEditLeave(0);
  };

  const handleUpdate = () => {
    let token = JSON.parse(localStorage.getItem('currentUser')).token;
    const uRl = `http://localhost:5135/api/Employee/${editId}`;
    const data = {
      id: editId,
      name: editName,
      address: editAddress,
      accountnumber: editAccountNumber,
      pfaccountnumber: editpfAccountNumber,
      pancard: editPanCard,
      companyid: editCompanyId,
    };
    axios
      .put(uRl, data, { headers: { Authorization: `Bearer ${token}` } })
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
    let token = JSON.parse(localStorage.getItem('currentUser')).token;
    if (window.confirm("Are you sure to delete this data") === true) {
      axios
        .delete(`http://localhost:5135/api/Employee/${id}`,{ headers: { Authorization: `Bearer ${token}` } })
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
              <th>Address</th>
              <th>Account Number</th>
              <th>PFNumber</th>
              <th>PANCard</th>
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
                    <td>{item.address}</td>
                    <td>{item.accountNumber}</td>
                    <td>{item.pfAccountNumber}</td>
                    <td>{item.panCard}</td>
                    {/* <td>{item.leave}</td> */}
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
      {/* <button
        className="btn btn-info m-1"
        onClick={() => Designation(id)}
        data-target="#editModal"
        data-toggle="modal"
      >
        Designation
      </button> */}
      <form>
        <div class="modal" id="newModal" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              {/* <!-- Header --> */}
              <div class="modal-header">
                <div class="modal-tittle text-primary">New Employee</div>
                <button class="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>
              {/* <!-- Body --> */}
              <div class="modal-body">
                <div class="form-group row">
                  <label for="txtname" class=" text-success col-sm-4">
                    Name
                  </label>
                  <div class="col-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="txtaddress" class="text-success col-sm-4">
                    Address
                  </label>
                  <div class="col-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="txtaccountnumber" class="text-success col-sm-4">
                    AccountNumber
                  </label>
                  <div class="col-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter AccountNumber"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="txtpfaccountnumber" class="text-success col-sm-4">
                    PFAccountNumber
                  </label>
                  <div class="col-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter PFACcountNumber"
                      value={pfAccountNumber}
                      onChange={(e) => setPFAccountNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="txtpancard" class=" text-success col-sm-4">
                    PANCard
                  </label>
                  <div class="col-8">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter PANCard"
                      value={panCard}
                      onChange={(e) => setPANCard(e.target.value)}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="txtcompanyid" class=" text-success col-sm-4">
                    CompanyId
                  </label>
                  <div class="col-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Id"
                      value={companyId}
                      onChange={(e) => setCompanyId(e.target.value)}
                    />
                  </div>
                </div>
                {/* <div class="form-group row">
                    <label for="txtleave" class="text-success col-sm-4">
                      Apply Leave
                    </label>
                    <div class="col-4">
                      <input
                        type="checkbox"
                        checked={leave === 1 ? true : false}
                       // onChange={(e) => handleActiveChange(e)}
                        value={leave}
                      />
                    </div>
                  </div> */}
              </div>
              {/* <!-- Footer --> */}
              <div class="modal-footer">
                <button
                  className="btn btn-info"
                  onClick={() => handleSave()}
                  data-dismiss="modal"
                >
                  Submit
                </button>
                <button class="btn btn-danger" data-dismiss="modal">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* <!-- Edit --> */}
      <form>
        <div class="modal" id="editModal" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content" show={show} onHide={handleClose}>
              {/* <!-- Header --> */}
              <div class="modal-header">
                <div class="modal-tittle text-primary">Edit Employees</div>
                <button class="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>
              {/* <!-- Body --> */}
              <div class="modal-body">
                <div class="form-group row">
                  <label for="txtname" class=" text-success col-sm-4">
                    Name
                  </label>
                  <div class="col-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Name"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="txtaddress" class="text-success col-sm-4">
                    Address
                  </label>
                  <div class="col-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Address"
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="txtaccountnumber" class="text-success col-sm-4">
                    AccountNumber
                  </label>
                  <div class="col-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter AccountNumber"
                      value={editAccountNumber}
                      onChange={(e) => setEditAccountNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="txtpfaccountnumber" class="text-success col-sm-4">
                    PFAccountNumber
                  </label>
                  <div class="col-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter PFACcountNumber"
                      value={editpfAccountNumber}
                      onChange={(e) => setEditPFAccountNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="txtpancard" class=" text-success col-sm-4">
                    PANCard
                  </label>
                  <div class="col-8">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter PANCard"
                      readOnly
                      value={editPanCard}
                      onChange={(e) => setEditPANCard(e.target.value)}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="txtcompanyid" class=" text-success col-sm-4">
                    CompanyId
                  </label>
                  <div class="col-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Id"
                      value={editCompanyId}
                      onChange={(e) => setEditCompanyId(e.target.value)}
                    />
                  </div>
                </div>
                {/* <div class="form-group row">
                    <label for="txtleave" class="text-success col-sm-4">
                      Apply Leave
                    </label>
                    <div class="col-4">
                      <input
                        type="checkbox"
                        checked={leave === 1 ? true : false}
                       // onChange={(e) => handleActiveChange(e)}
                        value={leave}
                      />
                    </div>
                  </div> */}
              </div>
              {/* <!-- Footer --> */}
              <div class="modal-footer">
                <button
                  className="btn btn-info"
                  onClick={() => handleUpdate()}
                  data-dismiss="modal"
                >
                  Submit
                </button>
                <button class="btn btn-danger" data-dismiss="modal">
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
