import React, { Fragment, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Header from "./Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { json, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Company = () => {

  const navigate=new useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [gst, setGst] = useState("");
  const [designation, setDesignation] = useState("");
  const [leave, setLeave] = useState(0);

  const [editId, setEditId] = useState("");
  const [editname, setEditName] = useState("");
  const [editaddress, setEditAddress] = useState("");
  const [editcountry, setEditCountry] = useState("");
  const [editgst, setEditGst] = useState("");
  const [editdesignation, setEditDesignation] = useState("");
  const [editleave, setEditLeave] = useState(0);

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let token=localStorage.getItem("currentUser");
    //console.log(token)
    axios
       .get("https://localhost:7121/api/Company",{headers:{Authorization:`Bearer ${token}`},})
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSave = () => {
    let token=localStorage.getItem("currentUser");
    const url = "https://localhost:7121/api/Company";
    const data = {
      name: name,
      address: address,
      country: country,
      gst: gst,
      designation: designation,
      leave: leave,
    };
    axios
      .post(url, data,{headers:{Authorization:`Bearer ${token}`},})
      .then((result) => {
        getData();
        clear();
        toast.success("Company has been added");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const clear = () => {
    setName("");
    setAddress("");
    setCountry("");
    setGst("");
    setDesignation("");
    setLeave(0);
    setEditName("");
    setEditAddress("");
    setEditCountry("");
    setEditGst("");
    setEditDesignation("");
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
    let token=localStorage.getItem("currentUser");
    // alert(id);
    handleShow();
    axios
      .get(`https://localhost:7121/api/Company/${id}`,{headers:{Authorization:`Bearer ${token}`},})
      .then((result) => {
        setEditName(result.data.name);
        setEditAddress(result.data.address);
        setEditCountry(result.data.country);
        setEditGst(result.data.gst);
        setEditDesignation(result.data.designation);
        setEditLeave(result.data.leave);
        setEditId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    let token=localStorage.getItem("currentUser");
    if (window.confirm("Are you sure to delete this data") == true) {
      axios
        .delete(`https://localhost:7121/api/Company/${id}`,{headers:{Authorization:`Bearer ${token}`},})
        .then((result) => {
          if (result.status === 200) {
            toast.success("Company has been deleted");
            getData();
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleUpdate = () => {
    let token=localStorage.getItem("currentUser");
    const uRl = `https://localhost:7121/api/Company/${editId}`;
    const data = {
      id: editId,
      name: editname,
      address: editaddress,
      country: editcountry,
      gst: editgst,
      designation: editdesignation,
      leave: editleave,
    };
    axios
      .put(uRl, data,{headers:{Authorization:`Bearer ${token}`},})
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

 const Employees =(id)=>{
  navigate('/employees', { state: { id: id } });
 }

  return (
    <Fragment>
      <div  getRole='Admin' >
        <ToastContainer />
        <Header />
        <div className="row">
          <div className="col-8 text-left m-2">
            <h2 className="text-primary">Company List</h2>
          </div>
          <br />
          <div className="col-3">
            <br />
            <button
              className="btn btn-info form-control"
              data-toggle="modal"
              data-target="#newModal"
            >
             + New Company
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
                <th>Country</th>
                <th>GST</th>
                {/* <th>Designation</th> */}
                {/* <th>Leave</th> */}
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
                        <td>{item.country}</td>
                        <td>{item.gst}</td>
                        {/* <td>{item.designation}</td> */}
                        {/* <td>{item.leave}</td> */}
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
                          <button
                            className="btn btn-info m-1"
                            onClick={() => Employees(item.id)}
                            data-target="#editModal"
                            data-toggle="modal"
                          >
                            Employees
                          </button>
                        </td>
                      </tr>
                    );
                  })
                  : <h2 className="text-info">"Loading..."</h2>}            </tbody>
          </table>
        </div>
        {/* Save */}
        <form>
          <div class="modal" id="newModal" role="dialog">
            <div class="modal-dialog">
              <div class="modal-content">
                {/* <!-- Header --> */}
                <div class="modal-header">
                  <div class="modal-tittle text-primary">New Company</div>
                  <button class="close" data-dismiss="modal">
                    <span>&times;</span>
                  </button>
                </div>
                {/* <!-- Body --> */}
                <div class="modal-body">
                  <div class="form-group row">
                    <label for="txtcompanyname" class=" text-success col-sm-4">
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
                    <label
                      for="txtcompanyaddress"
                      class="text-success col-sm-4"
                    >
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
                    <label for="txtcountry" class="text-success col-sm-4">
                      Country
                    </label>
                    <div class="col-8">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="txtgst" class="text-success col-sm-4">
                      GST
                    </label>
                    <div class="col-8">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter GST"
                        value={gst}
                        onChange={(e) => setGst(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* <div class="form-group row">
                    <label for="txtdesignation" class="text-success col-sm-4">
                      Designation
                    </label>
                    <div class="col-8">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Designation"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                      />
                    </div>
                  </div> */}
                  <div class="form-group row">
                    <label for="txtleave" class="text-success col-sm-4">
                      Approve Leave
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
                  <div class="modal-tittle text-primary">Edit Company</div>
                  <button class="close" data-dismiss="modal">
                    <span>&times;</span>
                  </button>
                </div>
                {/* <!-- Body --> */}
                <div class="modal-body">
                  <div class="form-group row">
                    <label for="txtcountryname" class=" text-success col-sm-4">
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
                    <label
                      for="txtcompanyaddress"
                      class="text-success col-sm-4"
                    >
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
                    <label for="txtcountry" class="text-success col-sm-4">
                      Country
                    </label>
                    <div class="col-8">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Country"
                        value={editcountry}
                        onChange={(e) => setEditCountry(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="txtgst" class="text-success col-sm-4">
                      GST
                    </label>
                    <div class="col-8">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter GSt"
                        value={editgst}
                        onChange={(e) => setEditGst(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* <div class="form-group row">
                    <label for="txtdesignation" class="text-success col-sm-4">
                      Country
                    </label>
                    <div class="col-8">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Designation"
                        value={editdesignation}
                        onChange={(e) => setEditDesignation(e.target.value)}
                      />
                    </div>
                  </div> */}
                  <div class="form-group row">
                    <label for="txtleave" class="text-success col-sm-4">
                      Approve Leave
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
                    variant="success"
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

export default Company;
