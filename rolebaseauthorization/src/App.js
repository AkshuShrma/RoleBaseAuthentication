import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import Company from './screens/Company';
import Employee from './screens/Employee';
import Login from './screens/Login';
import Register from './screens/Register';
import MyComponent from './screens/MyComponent';
import Employees from "./screens/Employees";
import Designation from "./screens/Designation";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       {/* {<Header/> } */}
      <Routes>
        <Route path="" element={<Login/>}/>
        <Route path="home" element={<Home/>}/>
        <Route path="employee" element={<Employee/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="company" element={<Company/>}/>
        <Route path="employees" element={<Employees/>}/>
        <Route path="designation" element={<Designation/>}/>
        <Route path="mycomponent" element={<MyComponent/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;