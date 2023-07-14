import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Detail from "./Components/Detail";
import Navigation from "./Components/Navigation";
import Dashboard from "./Components/Dashboard";
import Add from "./Components/Add";


function App() {
  return (
    <>
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<Add />} />
        <Route path="/update/:id" element={<Add />} />
      </Routes>
    </>
  );
}

export default App;
