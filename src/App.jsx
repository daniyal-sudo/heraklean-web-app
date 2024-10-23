import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Component/Home/Home";
import Login from "./Component/Login/Login";
import Registration from "./Component/Registration/Registration";
import ScheduleMeeting from "./Component/ScheduleMeeting/ScheduleMeeting";
import Profile from "./Component/Profile/Profile";
import ProgramPlan from "./Component/ProgramPlan/ProgramPlan";
import DietPlan from "./Component/DietPlan/DietPlan";
import CreateClient from "./Component/CreateClient/CreateClient";
import Data from "./Component/AllClients/Data";
import CreateProgram from "./Component/ProgramPlan/CreateProgram";
import CreateDietPlan from "./Component/DietPlan/CreateDietPlan";
import SingleClient from "./Component/AllClients/SingleClient";
import Safety from "./Component/Auth/Safety";
import Siderbar from "./Component/Home/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (

      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />

          {/* Protected Routes */}
          <Route element={<Safety />}>
            <Route path="/" element={<Home />} />
            <Route path="/dietplan" element={<DietPlan />} />
            <Route path="/programplan" element={<ProgramPlan />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-client" element={<CreateClient />} />
            <Route path="/schedule-meeting" element={<ScheduleMeeting />} />
            <Route path="/data" element={<Data />} />
            <Route path="/create-program" element={<CreateProgram />} />
            <Route path="/create-diet" element={<CreateDietPlan />} />
            <Route path="/singleClient/:clientId" element={<SingleClient />} />
          </Route>
        </Routes>
      </Router>

  );
}

export default App;
