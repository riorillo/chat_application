import { Button, Typography } from "@mui/material";
import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { GitHub } from "@mui/icons-material";

const LoginButton: React.FC<{ provider: 'GitHub' | 'Google'; variant: 'text' | 'contained' | 'outlined', onClick?: () => void}> = ({
  provider,
  variant,
  onClick
}) => {
  return (
    <>
      <Button variant={variant} size="large" sx={{ textTransform: "none"}} onClick={onClick}>
        {provider === 'GitHub' && <GitHub sx={{ mr: 2 }}/> }
        {provider === 'Google' && <GoogleIcon sx={{ mr: 2 }} />}
        
        <Typography>Sign In with {provider}</Typography>
      </Button>
    </>
  );
};

export default LoginButton;
