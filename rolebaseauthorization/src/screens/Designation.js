import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import { toast, ToastContainer } from "react-toastify";
import jwtInterceoptor from "./jwtInterceoptor";

const Designation = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [data, setData] = useState([]);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [companyId, setCompanyId] = useState("");

  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("");
  const [editCompanyId, setEditCompanyId] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.id;

  useEffect(() => {
    getData(id);
  }, [id]);

  const getData = (id) => {
    //let token = localStorage.getItem('currentUser');
    // console.log(employeeList)
    jwtInterceoptor
      .get(`http://localhost:5135/api/Company/Designations?id=${id}`)
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

  const handleEdit = (id) => {
       let token =localStorage.getItem("currentUser");
    //   //alert(id);
    handleShow();
    jwtInterceoptor
      .get(`http://localhost:5135/api/Designation/${id}`,{ headers: { Authorization: `Bearer ${token}` } })
      .then((result) => {
        setEditName(result.data.name);
        setEditType(result.data.type);
        setEditCompanyId(result.data.companyId);
        setEditId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = () => {
    let token = localStorage.getItem("currentUser");
    const uRl = `http://localhost:5135/api/Designation/${editId}`;
    const data = {
      id: editId,
      name: editName,
      type: editType,
      companyId: editCompanyId,
    };
    jwtInterceoptor
      .put(uRl, data, { headers: { Authorization: `Bearer ${token}` } })
      .then((result) => {
        // handleClose();
        getData(id);
        clear();
        toast.success("data has been updated");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleSave = () => {
     let token =localStorage.getItem("currentUser");
    const url = "http://localhost:5135/api/Designation";
    const data = {
      "name": name,
      "type": type,
      "companyId": companyId,
    };
    jwtInterceoptor
      .post(url, data,{ headers: { Authorization: `Bearer ${token}` } })
      .then((result) => {
        getData(id);
        clear();
        toast.success("Designation has been added For This Employee");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const clear = () => {
    setName("");
    setType("");
    setCompanyId(0);

    setEditName("");
    setEditType("");
    setEditCompanyId(0);
    setEditId(0);
  };

  const handleDelete = (id) => {
     let token =localStorage.getItem("currentUser");
    if (window.confirm("Are you sure to delete this data") === true) {
      jwtInterceoptor
        .delete(`http://localhost:5135/api/Designation/${id}`,{ headers: { Authorization: `Bearer ${token}` } })
        .then((result) => {
          if (result.data) {
            getData(id);
            toast.success("Employee has been deleted");
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  return (
    <div>
      <ToastContainer />
      <Header />
      <div className="row">
        <div className="col-4 text-left m-2">
          <h2 className="text-primary">Designation List</h2>
        </div>
        <br />
        <div className="col-3">
          <br />
          <button
            className="btn btn-info form-control"
            data-toggle="modal"
            data-target="#newModal"
          >
            New Designation
          </button>
        </div>
      </div>
      <div className="col-6 m-2 p-2">
        <table className="table table-bordered table-striped table-active">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Type</th>
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
                    <td>{item.type}</td>
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
                        data-toggle="modal"
                        data-dismiss="modal"
                      >
                        Delete
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
      <form>
        <div class="modal" id="newModal" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              {/* <!-- Header --> */}
              <div class="modal-header">
                <div class="modal-tittle text-primary">New Designation</div>
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
                  <label for="txttype" class="text-success col-sm-4">
                    Type
                  </label>
                  <div class="col-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
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
                <button class="btn btn-danger">
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
              <div class="modal-header" >
                <div class="modal-tittle text-primary">Edit Designation</div>
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
                    <label for="txttype" class="text-success col-sm-4">
                      Type
                    </label>
                    <div class="col-8">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Type"
                        value={editType}
                        onChange={(e) => setEditType(e.target.value)}
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
                </div>
              {/* <!-- Footer --> */}
              <div class="modal-footer">
                <button
                  className="btn btn-info"
                   onClick={() => handleUpdate()}
                   data-toggle="modal"
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

export default Designation;
