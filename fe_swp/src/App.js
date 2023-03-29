import "./styles/App.css";

import Register from "./pages/Register";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Introduce from "./pages/Introduce";
import Home from "./pages/Home";
import User from "./pages/User";
import NotFoundPage from "./components/NotFoundPage";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Introduce />} />
        <Route path='/register' element={<Register />} />

        {localStorage.getItem("token") != null && (
          <>
            <Route path='/home' element={<Home />} />
            <Route path='/user' element={<User />} />
          </>
        )}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>{" "}
    </div>
  );
}

export default App;
