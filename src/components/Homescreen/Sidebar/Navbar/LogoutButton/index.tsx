import { Button } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useAuth } from "../../../../../contexts/AuthContext";

const LogoutButton = () => {
  const {logOut} = useAuth();

  return (
    <Button onClick = {() => logOut()} sx={{ color: "white" }}>
      Logout &#160; <PowerSettingsNewIcon />
    </Button>
  );
};

export default LogoutButton;
