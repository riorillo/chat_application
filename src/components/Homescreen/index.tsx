import { Grid, useTheme } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Sidebar from "./Sidebar";
import { HomescreenStyle } from "./style";

const Homescreen = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { palette } = useTheme();
  const { container, outlet } = HomescreenStyle;

  useEffect(() => {
    !user && navigate("/");
  }, []);

  return (
    user && (
      <Grid container sx={container}>
        <Grid
          item
          xs={4}
          sx={{
            overflowY: "scroll",
            height: "100%",
            backgroundColor: palette.primary.main,
          }}
        >
          <Sidebar />
        </Grid>
        <Grid item xs={8} sx={outlet}>
          <Outlet />
        </Grid>
      </Grid>
    )
  );
};

export default Homescreen;
