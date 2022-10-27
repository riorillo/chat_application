import { Grid,} from "@mui/material";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Sidebar from "./Sidebar";

const Homescreen = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    !user && navigate("/");
  }, []);

  return (
    user && (
      <Grid container sx={{height: '100%', backgroundColor: "primary.main"}}>
        <Grid
          item
          xs={4}
          sx={{
            overflowY: "scroll",
            height: "100%",
            backgroundColor: "primary.main",
            zIndex: '2',
            borderRight: `1px solid rgba(255, 255, 255, 0.25)`
          }}
        >
          <Sidebar />
        </Grid>
        <Grid item xs={8} sx={{backgroundColor: "#1258a8", height: '100%'}}>
          <Outlet key={location.pathname}/>
        </Grid>
      </Grid>
    )
  );
};

export default Homescreen;
