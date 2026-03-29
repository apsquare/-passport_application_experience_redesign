import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import StartApplication from "./pages/StartApplication";
import PersonalDetails from "./pages/PersonalDetails";
import AddressDetails from "./pages/AddressDetails";
import IdentityDetails from "./pages/IdentityDetails";
import DocumentUpload from "./pages/DocumentUpload";
import AppointmentBooking from "./pages/AppointmentBooking";
import ReviewSubmit from "./pages/ReviewSubmit";
import Success from "./pages/Success";
import Register from "./pages/Register";
import DocumentsRequired from "./pages/DocumentsRequired";
import NewAccount from "./pages/CreateAccount";
import CreateAccount from "./pages/CreateAccount";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register></Register>}></Route>
        <Route path="/DashBoard" element={<Dashboard></Dashboard>}></Route>
        <Route
          path="/DocumentsRequired"
          element={<DocumentsRequired></DocumentsRequired>}
        ></Route>
        <Route
          path="/StartApplication"
          element=<StartApplication></StartApplication>
        ></Route>
        <Route
          path="/PersonalDetails"
          element=<PersonalDetails></PersonalDetails>
        ></Route>
        <Route
          path="/AddressDetails"
          element={<AddressDetails></AddressDetails>}
        ></Route>
        <Route
          path="/IdentityDetails"
          element={<IdentityDetails></IdentityDetails>}
        ></Route>
        <Route
          path="/DocumentUpload"
          element={<DocumentUpload></DocumentUpload>}
        ></Route>
        <Route
          path="/ReviewSubmit"
          element={<ReviewSubmit></ReviewSubmit>}
        ></Route>
        <Route
          path="/AppointmentBooking"
          element={<AppointmentBooking></AppointmentBooking>}
        ></Route>
        <Route
          path="/CreateAccount"
          element={<CreateAccount></CreateAccount>}
        ></Route>
      </Routes>
    </>
  );
}
