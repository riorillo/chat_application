import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Homescreen from "./components/Homescreen";
import Chat from "./components/Homescreen/Chat";
import Login from "./components/Login";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  const [deviceWidth, setDeviceWidth] = useState<number>(document.body.clientWidth);

  const handleResize = () => {
    setDeviceWidth(document.body.clientWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [deviceWidth]);

  return (
    <>
      {deviceWidth >= 1280 ? (
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/homescreen" element={<Homescreen />}>
              <Route path=":conversation" element={<Chat />} />
            </Route>
          </Routes>
        </AuthProvider>
      ) : (
        <Container sx={{ maxWidth: "xl" }}>
          <Typography sx={{ opacity: 0.5, color: "white", fontSize: "32px", textAlign: "center" }}>
            The mobile version of this application is still under development ⚠️{" "}
          </Typography>
        </Container>
      )}
    </>
  );
};

export default App;
