import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import Company from './screens/Company';
import Employee from './screens/Employee';
import Login from './screens/Login';
import Register from './screens/Register';

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
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;