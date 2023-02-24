import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Register() {
  const initData = {
    UserName: "",
    Role: "",
    Password: "",
    
  };
  const [registerForm, setRegisterForm] = useState(initData);
  const [registerFormError, setRegisterFormError] = useState(initData);
  const navigate = useNavigate();
  const ChangeHandler = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };
  const saveClick = () => {
    //alert(registerForm.UserName);
    let hasError = false;
    let messages = initData;
    if (registerForm.Role.trim().length === 0) {
      hasError = true;
      messages = { ...messages, Role: "Role is Empty" };
    }
    if (registerForm.UserName.trim().length === 0) {
      hasError = true;
      messages = { ...messages, UserName: "UserName Empty" };
    }
    if (registerForm.Password.trim().length === 0) {
      hasError = true;
      messages = { ...messages, Password: "Password Empty" };
    }
    if (hasError) setRegisterFormError(messages);
    else {
      setRegisterFormError(initData);
      axios
        .post(
          "https://localhost:7121/User/Register",
          registerForm
        )
        .then((d) => {
          if (d.data) {
            alert("Register Successfully");
            navigate("/login");
          } else {
            alert("Something Went Wrong");
            setRegisterForm(initData);
          }
        })
        .catch((e) => {
          alert(JSON.stringify(e));
          setRegisterForm(initData);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="row col-lg-6 mx-auto m-2 p-2">
        <div className="card text-center">
          <div className="card-header text-success">Register</div>
          <div className="card-body">
            <div className="form-group row">
              <label className="col-lg-4" for="txtrole">
                Role
              </label>
              <div className="col-lg-8">
                <input
                  type="text"
                  id="txtrole"
                  placeholder="Enter Role"
                  name="Role"
                  onChange={ChangeHandler}
                  className="form-control"
                ></input>
                <p className="text-danger">{registerFormError.Role}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4" for="txtusername">
                Username
              </label>
              <div className="col-lg-8">
                <input
                  type="text"
                  id="txtusername"
                  placeholder="Enter UserName"
                  name="UserName"
                  onChange={ChangeHandler}
                  className="form-control"
                ></input>
                <p className="text-danger">{registerFormError.UserName}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4" for="txtpassword">
                Password
              </label>
              <div className="col-lg-8">
                <input
                  type="password"
                  id="txtpassword"
                  placeholder="Password"
                  name="Password"
                  onChange={ChangeHandler}
                  className="form-control"
                ></input>
                <p className="text-danger">{registerFormError.Password}</p>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted">
            <button onClick={saveClick} className="btn btn-info">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
