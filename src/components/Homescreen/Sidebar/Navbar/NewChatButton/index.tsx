import { Button, useTheme } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { NewChatButtonStyle } from "./style";
import { useState } from "react";
import NewChatModal from "../../NewChatModal";
import { ConversationData } from "../../../../../firebase/data_types";

const NewChatButton: React.FC<{conversations: ConversationData[]}> = ({conversations}) => {
  const theme = useTheme();
  const { button } = NewChatButtonStyle;
  const [ status, setStatus ] = useState<boolean>(false);

  return (
    <>
    <Button
      sx={{
        ...button,
        color: `${theme.palette.primary.main}`,
        "&:hover": { backgroundColor: "whitesmoke" },
      }}
      onClick = {() => setStatus(true)}
    >
      <AddCircleOutlineIcon
        fontSize="inherit"
        sx={{ fill: `${theme.palette.primary.main}` }}
      />
    </Button>
    <NewChatModal conversations={conversations} status={status} handleClose={() => setStatus(false)}/>
    </>
  );
};

export default NewChatButton;
