import { Route, Routes } from "react-router-dom";
import Homescreen from "./components/Homescreen";
import Login from "./components/Login";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/homescreen" element={<Homescreen/>}></Route>
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
