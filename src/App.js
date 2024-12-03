import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Conversation from "./pages/Conversation";
import Inbox from "./pages/Inbox";
import Login from "./pages/Login";
import Register from "./pages/Register";
import useAuthCheck from "./hooks/useAuthCheck";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  const authChecked = useAuthCheck();

  return !authChecked ? (
    <div className="text-center font-semibold text-3xl mt-52 ">
      Checking Authentication ...
    </div>
  ) : (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/inbox"
          element={
            <PrivateRoute>
              <Conversation />
            </PrivateRoute>
          }
        />
        <Route path="/inbox/:id" element={<Inbox />} />
      </Routes>
    </Router>
  );
}

export default App;
