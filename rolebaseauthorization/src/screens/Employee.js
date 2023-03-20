import React, { Fragment, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Header from "./Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import jwtInterceoptor from "./jwtInterceoptor";

const Employee = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [accountnumber, setAccountNumber] = useState("");
  const [pfaccountnumber, setPFAccountNumber] = useState("");
  const [pancard, setPANCard] = useState("");
  const [companyid, setCompanyId] = useState("");
  const [applicationUserId, setApplicationUserId] = useState("");

  const [editId, setEditId] = useState("");
  const [editname, setEditName] = useState("");
  const [editusername, setEditUserName] = useState("");
  const [editaddress, setEditAddress] = useState("");
  const [editaccountnumber, setEditAccountNumber] = useState("");
  const [editpfaccountnumber, setEditPFAccountNumber] = useState("");
  const [editpancard, setEditPANCard] = useState("");
  const [editcompanyid, setEditCompanyId] = useState("");
  const [editapplicationUserId, setEditApplicationUserId] = useState(0);



  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    jwtInterceoptor
      .get("http://localhost:5135/api/Employee")
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleSave = () => {
    const url = "http://localhost:5135/api/Employee";
    const data = {
      name: name,
      username: userName,
      address: address,
      accountnumber: accountnumber,
      pfaccountnumber: pfaccountnumber,
      pancard: pancard,
      companyid: companyid,
      applicationUserId: applicationUserId,
    };
    jwtInterceoptor
      .post(url, data)
      .then((result) => {
        getData();
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
    setEditName("");
    setEditUserName("");
    setEditAddress("");
    setEditAccountNumber(0);
    setEditPFAccountNumber(0);
    setEditPANCard(0);
    setEditCompanyId(0);
    setEditApplicationUserId("");
    setEditId("");
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

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this data") === true) {
      jwtInterceoptor
        .delete(`http://localhost:5135/api/Employee/${id}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success("Employee has been deleted");
            getData();
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleUpdate = () => {
    const uRl = `http://localhost:5135/api/Employee/${editId}`;
    const data = {
      id: editId,
      name: editname,
      username: editusername,
      address: editaddress,
      accountnumber: editaccountnumber,
      pfaccountnumber: editpfaccountnumber,
      pancard: editpancard,
      companyid: editcompanyid,
      applicationUserId: applicationUserId,
    };
    jwtInterceoptor
      .put(uRl, data)
      .then((result) => {
        handleClose();
        getData();
        clear();
        toast.success("data has been updated");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const LeaveForm = (id) => {
    navigate("/leaveform", { state: { id: id } });
  };

  return (
    <Fragment>
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
        <div className="col-9 m-2 p-2">
          <table className="table table-bordered table-striped table-active">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>UserName</th>
                <th>Address</th>
                <th>AccountNumber</th>
                <th>PFAccountNumber</th>
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
                      <td colSpan={3}>
                        <button
                          className="btn btn-info"
                          onClick={() => handleEdit(item.id)}
                          data-target="#editModal"
                          data-toggle="modal"
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
                          onClick={() => LeaveForm(item.id)}
                          data-toggle="modal"
                        >
                          LeaveForm
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
        </div>
        {/* Save */}
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
                        value={accountnumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      for="txtpfaccountnumber"
                      class="text-success col-sm-4"
                    >
                      PFAccountNumber
                    </label>
                    <div class="col-8">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter PFACcountNumber"
                        value={pfaccountnumber}
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
                        type="text"
                        className="form-control"
                        placeholder="Enter PANCard"
                        value={pancard}
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
                        value={companyid}
                        onChange={(e) => setCompanyId(e.target.value)}
                      />
                    </div>
                  </div>
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
                  <button class="btn btn-info" data-dismiss="modal">
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
                  <div class="modal-tittle text-primary">Edit Employee</div>
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
                        value={editname}
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
                  <div class="form-group row">
                    <label for="txtaddress" class="text-success col-sm-4">
                      Address
                    </label>
                    <div class="col-8">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Address"
                        value={editaddress}
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
                        value={editaccountnumber}
                        onChange={(e) => setEditAccountNumber(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      for="txtpfaccountnumber"
                      class="text-success col-sm-4"
                    >
                      PFAccountNumber
                    </label>
                    <div class="col-8">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter PFAccountNumber"
                        value={editpfaccountnumber}
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
                        type="text"
                        className="form-control"
                        placeholder="Enter PANCard"
                        readOnly
                        value={editpancard}
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
                        type="number"
                        className="form-control"
                        placeholder="Enter Id"
                        value={editcompanyid}
                        onChange={(e) => setEditCompanyId(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                {/* <!-- Footer --> */}
                <div class="modal-footer">
                  <Button
                    variant="danger"
                    onClick={handleClose}
                    data-target=""
                    data-dismiss="modal"
                    data-toggle="modal"
                  >
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleUpdate}
                    data-dismiss="modal"
                  >
                    Save changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Employee;
