import { Box, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ConversationsPlaceholderStyle } from "./style";

const ConversationPlaceholder = () => {
  const { container, text } = ConversationsPlaceholderStyle;

  return (
    <>
      <Box sx={container}>
        <Typography paragraph color="#FFFFFF" sx={text}>
          You haven't started any chat yet, click on{" "}
          <span style={{ verticalAlign: "middle" }}>
            <AddCircleOutlineIcon />
          </span>{" "}
          to begin a new conversation
        </Typography>
      </Box>
    </>
  );
};

export default ConversationPlaceholder;
