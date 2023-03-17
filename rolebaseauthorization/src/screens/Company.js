import React, { Fragment, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Header from "./Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Company = () => {

  const navigate=new useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [gst, setGst] = useState("");
  const [applicationUserId, setApplicationUserId] = useState("");
  //const [password, setPassword] = useState(0);

  const [editId, setEditId] = useState("");
  const [editusername, setEditUserName] = useState("");
  const [editaddress, setEditAddress] = useState("");
  const [editcountry, setEditCountry] = useState("");
  const [editgst, setEditGst] = useState("");
  // const [editrole, setEditRole] = useState("");
  const [editapplicationUserId, setEditApplicationUserId] = useState(0);

  const [data, setData] = useState([]);

  useEffect(() => {
    // let token = JSON.parse(localStorage.getItem('currentUser'));
    // if(token === undefined){
    //   return;
    // }
    getData();
  }, []);

  const getData = () => {
   // let token = JSON.parse(localStorage.getItem('currentUser')).token;
    //console.log(token)
    axios
       .get("http://localhost:5135/api/Company")
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSave = () => {
    //let token = JSON.parse(localStorage.getItem('currentUser')).token;
    const url = "http://localhost:5135/api/Company";
    const data = {
      username: userName,
      address: address,
      country: country,
      gst: gst,
      // role: role,
      applicationUserId: applicationUserId,
    };
    axios
      .post(url, data)
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
    setUserName("");
    setAddress("");
    setCountry("");
    setGst("");
     setApplicationUserId("");
    //setPassword(0);
    setEditUserName("");
    setEditAddress("");
    setEditCountry("");
    setEditGst("");
    // setEditRole("");
    //setEditPassword(0);
    setEditId("");
  };

  const handleEdit = (id) => {
    let token = JSON.parse(localStorage.getItem('currentUser')).token;
    // alert(id);
    handleShow();
    axios
      .get(`http://localhost:5135/api/Company/${id}`,{headers:{Authorization:`Bearer ${token}`},})
      .then((result) => {
        setEditUserName(result.data.userName);
        setEditAddress(result.data.address);
        setEditCountry(result.data.country);
        setEditGst(result.data.gst);
        // setEditRole(result.data.role);
        setApplicationUserId(result.data.applicationUserId);
        setEditId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    let token = JSON.parse(localStorage.getItem('currentUser')).token;
    if (window.confirm("Are you sure to delete this data") === true) {
      axios
        .delete(`http://localhost:5135/api/Company/${id}`,{headers:{Authorization:`Bearer ${token}`},})
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
    let token = JSON.parse(localStorage.getItem('currentUser')).token;
    const uRl = `http://localhost:5135/api/Company/${editId}`;
    const data = {
      id: editId,
      username: editusername,
      address: editaddress,
      country: editcountry,
      gst: editgst,
      // role: editrole,
      applicationUserId: editapplicationUserId,
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
      <div>
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
                {/* <th>Designation</th>  */}
                {/* <th>Password</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0
                ? data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.userName}</td>
                        <td>{item.address}</td>
                        <td>{item.country}</td>
                        <td>{item.gst}</td>
                        {/* <td>{item.role}</td> */}
                        {/* <td>{item.password}</td>  */}
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
                    <label for="txtusername" class=" text-success col-sm-4">
                      Name
                    </label>
                    <div class="col-8">
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
                    <label for="txtrolr" class="text-success col-sm-4">
                      Role
                    </label>
                    <div class="col-8">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      />
                    </div>
                  </div> */}
                  {/* <div class="form-group row">
                    <label for="txtpassword" class="text-success col-sm-4">
                      Password
                    </label>
                    <div class="col-8">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                    <label for="txtusername" class=" text-success col-sm-4">
                      Name
                    </label>
                    <div class="col-8">
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
                    <label for="txtrolr" class="text-success col-sm-4">
                      Role
                    </label>
                    <div class="col-8">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Role"
                        value={editrole}
                        onChange={(e) => setEditRole(e.target.value)}
                      />
                    </div>
                  </div> */}
                  {/* <div class="form-group row">
                    <label for="txtpassword" class="text-success col-sm-4">
                      Password
                    </label>
                    <div class="col-8">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Password"
                        value={editpassword}
                        onChange={(e) => setEditPassword(e.target.value)}
                      />
                    </div>
                  </div> */}
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
