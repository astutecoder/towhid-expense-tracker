import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom";
import { CategoriesProvider } from "./context/CategoryContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { AuthContext } from "./context/AuthContext";
import { SERVER_URL } from "./helper/constants";

import { useContext } from "react";

function App() {
  const { user } = useContext(AuthContext);

console.log(SERVER_URL)
  return (
    <CategoriesProvider>
      <Container className="my-4">
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route path="login" element={user ? <Home /> : <Login />} />
          <Route path="register" element={user ? <Home /> : <Register />} />
        </Routes>
      </Container>
    </CategoriesProvider>
  );
}

export default App;
