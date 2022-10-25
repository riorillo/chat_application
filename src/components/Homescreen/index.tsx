import { BorderRight } from "@mui/icons-material";
import { Grid, useTheme } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Sidebar from "./Sidebar";

const Homescreen = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { palette } = useTheme();
  const theme = useTheme();

  useEffect(() => {
    !user && navigate("/");
  }, []);

  return (
    user && (
      <Grid container sx={{height: '100%', backgroundColor: theme.palette.primary.main}}>
        <Grid
          item
          xs={4}
          sx={{
            overflowY: "scroll",
            height: "100%",
            backgroundColor: palette.primary.main,
            zIndex: '2',
            borderRight: `1px solid rgba(255, 255, 255, 0.25)`
          }}
        >
          <Sidebar />
        </Grid>
        <Grid item xs={8} sx={{backgroundColor: theme.palette.primary.dark}}>
          <Outlet />
        </Grid>
      </Grid>
    )
  );
};

export default Homescreen;
