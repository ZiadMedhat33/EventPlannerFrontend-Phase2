import { Routes, Route } from "react-router-dom";
import Login from "./Pages/LogIn/login";
import Signup from "./Pages/SignUp/signup";
import Nav from "./Components/Header/Nav";
import Home from "./Pages/Home/home";
import ProtectedRoute from "./Context/ProtectedRoute";
import Event from "./Pages/Event/Event";
import EventCreation from "./Pages/EventCreation/EventCreation";
function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
        />
        <Route
          path="/event/:id/:title/:date/:time/:location/:role/:description"
          element={
            <ProtectedRoute>
              <Event />
            </ProtectedRoute>
          }
        />
        <Route path="/eventcreation" element={
          <ProtectedRoute>
            <EventCreation />
          </ProtectedRoute>
          } />
      </Routes>
    </>
  );
}

export default App;
