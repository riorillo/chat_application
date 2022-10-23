import { Button, useTheme } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { NewChatButtonStyle } from "./style";

const NewChatButton = () => {
  const theme = useTheme();
  const {button} = NewChatButtonStyle;

  return (
    <Button
      sx={{
        ...button,
        color: `${theme.palette.primary.main}`,
        "&:hover": { backgroundColor: "whitesmoke" },
      }}
    >
      <AddCircleOutlineIcon
        fontSize="inherit"
        sx={{ fill: `${theme.palette.primary.main}` }}
      />
    </Button>
  );
};

export default NewChatButton;
