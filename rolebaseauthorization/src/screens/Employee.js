import React, { Fragment, useEffect, useState } from "react";
 import "bootstrap/dist/css/bootstrap.min.css";
 import Button from "react-bootstrap/Button";
import axios from "axios";
import Header from "./Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Employee = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [accountnumber, setAccountNumber] = useState("");
  const [pfaccountnumber, setPFAccountNumber] = useState("");
  const [leave, setLeave] = useState(0);

  const [editId, setEditId] = useState("");
  const [editname, setEditName] = useState("");
  const [editaddress, setEditAddress] = useState("");
  const [editaccountnumber, setEditAccountNumber] = useState("");
  const [editpfaccountnumber, setEditPFAccountNumber] = useState("");
  const [editleave, setEditLeave] = useState(0);

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let token =localStorage.getItem("currentUser");
    //console.log(token)
    axios
      .get("https://localhost:7121/api/Employee",{headers: {Authorization: `Bearer ${token}`},})
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSave = () => {
    const url = "https://localhost:7121/api/Employee";
    const data = {
      "name": name,
      "address": address,
      "accountnumber": accountnumber,
      "pfaccountnumber": pfaccountnumber,
      "leave": leave
    };
    axios
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
    setAddress("");
    setAccountNumber(0);
    setPFAccountNumber(0);
    setLeave(0);
    setEditName("");
    setEditAddress("");
    setEditAccountNumber(0);
    setEditPFAccountNumber(0);
    setEditLeave(0);
    setEditId("");
  };

  const handleActiveChange = (e) => {
    if (e.target.checked) {
      setLeave(1);
    } else {
      setLeave(0);
    }
  };

  const handleEditActiveChange = (e) => {
    if (e.target.checked) {
      setEditLeave(1);
    } else {
      setEditLeave(0);
    }
  };

  const handleEdit = (id) => {
    //alert(id);
    handleShow();
    axios
      .get(`https://localhost:7121/api/Employee/${id}`)
      .then((result) => {
        setEditName(result.data.name);
        setEditAddress(result.data.address);
        setEditAccountNumber(result.data.accountNumber);
        setEditPFAccountNumber(result.data.pfAccountNumber);
        setEditLeave(result.data.leave);
        setEditId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this data") == true) {
      axios
        .delete(`https://localhost:7121/api/Employee/${id}`)
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
    const uRl = `https://localhost:7121/api/Employee/${editId}`;
    const data = {
      id: editId,
      name: editname,
      address: editaddress,
      accountnumber: editaccountnumber,
      pfaccountnumber: editpfaccountnumber,
      leave: editleave,
    };
    axios
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
                <th>Address</th>
                <th>AccountNumber</th>
                <th>PFAccountNumber</th>
                <th>Leave</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0
                ? data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.address}</td>
                        <td>{item.accountNumber}</td>
                        <td>{item.pfAccountNumber}</td>
                        <td>{item.leave}</td>
                        <td colSpan={2}>
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
                        </td>
                      </tr>
                    );
                  })
                  : <h2 className="text-info">"Loading..."</h2>}
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
                    <label for="txtleave" class="text-success col-sm-4">
                      Apply Leave
                    </label>
                    <div class="col-4">
                      <input
                        type="checkbox"
                        checked={leave === 1 ? true : false}
                        onChange={(e) => handleActiveChange(e)}
                        value={leave}
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
                        type="number"
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
                        type="number"
                        className="form-control"
                        placeholder="Enter PFAccountNumber"
                        value={editpfaccountnumber}
                        onChange={(e) => setEditPFAccountNumber(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="txtleave" class="text-success col-sm-4">
                      Apply Leave
                    </label>
                    <div class="col-4">
                      <input
                        type="checkbox"
                        checked={editleave === 1 ? true : false}
                        onChange={(e) => handleEditActiveChange(e)}
                        value={editleave}
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
