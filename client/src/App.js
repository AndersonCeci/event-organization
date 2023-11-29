import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Loginpage } from "./pages/login";
import { Registerpage } from "./pages/register";
import { CreateEvent } from "./pages/create-event";
import { EventDetails } from "./pages/event-details";
import { Navbar } from "./components/navbar";
import { AdminNavBar } from "./components/AdminNavBar";
import { useCookies } from "react-cookie";
import { AdminDashboard } from "./pages/admin-page";
import { AdminUserHome } from "./pages/admin-user-list";
import { AdminEventDetails } from "./pages/admin-detail-event";
import { AdminAddUser } from "./pages/admin-add-user";

function App() {
  const [cookies] = useCookies(["access_token"]);
  const isAdmin = cookies && cookies.role === "admin";
  const isLoggedIn = cookies && cookies.access_token;

  return (
    <div className="App">
      <Router>
        {isLoggedIn ? isAdmin ? <AdminNavBar /> : <Navbar /> : <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Loginpage />} />
          <Route path="/auth/register" element={<Registerpage />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/savedEvents/ids/:eventId" element={<EventDetails />} />
          <Route path="/admin/events/:eventId" element={<AdminEventDetails />} />
          <Route path="/user-list" element={<AdminUserHome />} />
          <Route path="/add-user" element={<AdminAddUser />} />
          {isAdmin && <Route path="/admin" element={<AdminDashboard />} />}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
