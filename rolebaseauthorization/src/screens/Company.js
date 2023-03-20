import React, { Fragment, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import jwtInterceoptor from "./jwtInterceoptor";

const Company = () => {

  const navigate=new useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [gst, setGst] = useState("");
  const [applicationUserId, setApplicationUserId] = useState("");

  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editusername, setEditUserName] = useState("");
  const [editaddress, setEditAddress] = useState("");
  const [editcountry, setEditCountry] = useState("");
  const [editgst, setEditGst] = useState("");
  const [editapplicationUserId, setEditApplicationUserId] = useState(0);

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    jwtInterceoptor
       .get(`http://localhost:5135/api/Company/GetSpecificCompany`)
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSave = () => {
    const url = "http://localhost:5135/api/Company";
    const data = {
      name: name,
      username: userName,
      address: address,
      country: country,
      gst: gst,
      applicationUserId: applicationUserId,
    };
    jwtInterceoptor
      .post(url, data)
      .then((result) => {
        console.log(result.data)
        toast.success(result.data);
        getData();
        clear();
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const clear = () => {
    setName("");
    setUserName("");
    setAddress("");
    setCountry("");
    setGst("");
     setApplicationUserId("");
    setEditName("");
    setEditUserName("");
    setEditAddress("");
    setEditCountry("");
    setEditGst("");
    setEditId("");
  };

  const handleEdit = (id) => {
    handleShow();
    jwtInterceoptor
      .get(`http://localhost:5135/api/Company/${id}`)
      .then((result) => {
        setEditName(result.data.name);
        setEditUserName(result.data.userName);
        setEditAddress(result.data.address);
        setEditCountry(result.data.country);
        setEditGst(result.data.gst);
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
        .delete(`http://localhost:5135/api/Company/${id}`)
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
    const uRl = `http://localhost:5135/api/Company/${editId}`;
    const data = {
      id: editId,
      name: editName,
      username: editusername,
      address: editaddress,
      country: editcountry,
      gst: editgst,
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
                <th>UserName</th>
                <th>Address</th>
                <th>Country</th>
                <th>GST</th>
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
                        <td>{item.userName}</td>
                        <td>{item.address}</td>
                        <td>{item.country}</td>
                        <td>{item.gst}</td>
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
                    <label for="txtusername" class=" text-success col-sm-4">
                      UserName
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
                    <label for="txtusername" class=" text-success col-sm-4">
                      UserName
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
