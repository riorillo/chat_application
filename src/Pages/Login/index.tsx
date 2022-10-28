import { Box, Typography } from "@mui/material";
import { LoginStyle } from "./style";
import LoginButton from "./LoginButton";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const { outerBox, innerBox, buttonsBox } = LoginStyle;
  const { signIn } = useAuth();

  return (
    <Box sx={{ ...outerBox, backgroundColor: `primary.main` }}>
      <Box sx={innerBox}>
        <Box>
          <Typography variant="h5">
            <strong>Chat Application</strong>
          </Typography>
          <Typography variant="h6" color="silver">
            by <strong>riorillo</strong> | <strong>Rocco Iorillo</strong>
          </Typography>
        </Box>

        <Box sx={buttonsBox}>
          <LoginButton provider="Google" variant="contained" onClick={() => {signIn('Google')}}/>
          <LoginButton provider="GitHub" variant="contained" onClick={() => {signIn('GitHub')}}/>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
