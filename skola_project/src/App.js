import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Pages/Shared/Navbar"
import About from "./Pages/About/About";
import Course from "./Pages/Courses/Course";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/Login/SignUp";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AllUsers from "./Pages/Dashboard/AllUsers";
import RequireAuth from "./Pages/Login/RequireAuth";
import RequireAdmin from "./Pages/Login/RequireAdmin";
import Assign from "./Pages/Dashboard/Assign";
import ViewAssignments from "./Pages/Dashboard/ViewAssignments";
import Calender from "./Pages/Dashboard/Calender";
import { ToastContainer } from "react-toastify";
import AdminViewAssignments from "./Pages/Dashboard/AdminViewAssignments";
import AdminViewAttendance from "./Pages/Dashboard/AdminViewAttendance";
import ForgotPassword from "./Pages/Login/ForgotPassword";
import Students from "./Pages/Dashboard/Students";




function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='course' element={<Course />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='forgotpassword' element={<ForgotPassword />} />
        <Route path='assign' element={<Assign />} />
        <Route path='students' element={<Students/>}/>
        
        <Route
          path='dashboard'
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route index element={<ViewAssignments />} />
          <Route path='allusers' element={<RequireAdmin><AllUsers /></RequireAdmin>} />
          <Route path='adminviewassignments' element={<AdminViewAssignments/>} />
          <Route path='adminviewattendance' element={<AdminViewAttendance/>} />

          <Route path='calender' element={<Calender/>} />
        </Route>



      </Routes>


      <ToastContainer />  
    </div>
  );
}

export default App;
