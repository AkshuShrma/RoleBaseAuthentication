import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Header from "./Header";
import { toast, ToastContainer } from "react-toastify";

const Designation = () => {

  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  
  const [data, setData] = useState([]);
  
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const[companyid,setCompanyId]=useState(0);

  // const [editId, setEditId] = useState("");
  // const [editname, setEditName] = useState("");
  // const [editaddress, setEditAddress] = useState("");
  // const [editaccountnumber, setEditAccountNumber] = useState("");
  // const [editpfaccountnumber, setEditPFAccountNumber] = useState("");
  // const[editpancard,setEditPANCard]=useState("");
  // const[editcompanyid,setEditCompanyId]=useState("");
  // const [editleave, setEditLeave] = useState(0);

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
      .get(`https://localhost:7121/api/Company/Designations?id=${id}`)
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

  // const handleEdit = (id) => {
  //   //let token =localStorage.getItem("currentUser");
  //   //alert(id);
  //   handleShow();
  //   axios
  //     .get(`https://localhost:7121/api/Employee/${id}`)
  //     .then((result) => {
  //       setEditName(result.data.name);
  //       setEditAddress(result.data.address);
  //       setEditAccountNumber(result.data.accountNumber);
  //       setEditPFAccountNumber(result.data.pfAccountNumber);
  //       setEditPANCard(result.data.panCard);
  //       setEditCompanyId(result.data.companyId);
  //       setEditLeave(result.data.leave);
  //       setEditId(id);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handleSave = () => {
   // let token =localStorage.getItem("currentUser");
    const url = "https://localhost:7121/api/Designation";
    const data = {
      "name": name,
      "type": type,
      "companyid":companyid,
    };
    axios
      .post(url, data)
      .then((result) => {
        getData(id);
        clear();
        toast.success("Employee has been added In This Company");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const clear = () => {
    setName("");
    setType("");
    setCompanyId(0);
   
    // setEditName("");
    // setEditAddress("");
    // setEditAccountNumber(0);
    // setEditPFAccountNumber(0);
    // setEditPANCard(0);
    // setEditCompanyId(0);
    // setEditLeave(0);
    // setEditId("");
  };

  const handleDelete = (id) => {
   // let token =localStorage.getItem("currentUser");
    if (window.confirm("Are you sure to delete this data") == true) {
      axios
        .delete(`https://localhost:7121/api/Designation/${id}`)
        .then((result) => {
          if (result.status === 200) {
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
        <div className="col-8 text-left m-2">
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
      <div className="col-9 m-2 p-2">
        <table className="table table-bordered table-striped table-active">
          <thead>
            <tr>
            <th>#</th>
              <th>Name</th>
              <th>Type</th>
              <th>CompanyId</th>
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
                        <td>{item.type}</td>
                        <td>{item.companyId}</td>
                        {/* <td>{item.leave}</td> */}
                        <td colSpan={2}>
                          <button
                            className="btn btn-info"
                            //onClick={() => handleEdit(item.id)}
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
                        value={companyid}
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
      
    </div>
  );
};

export default Designation;
