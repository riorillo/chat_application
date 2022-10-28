import { Box, Typography } from "@mui/material";
import { useAuth } from "../../../contexts/AuthContext";

const Bubble: React.FC<any> = ({ sent_by, content, date }) => {
  const { user } = useAuth();

  return (
    <Box
      sx={{
        backgroundColor: user.uid === sent_by ? "primary.main" : "primary.light",
        display: "flex",
        alignItems: user.uid === sent_by ? "flex-end" : "flex-start",
        justifyContent: "center",
        flexDirection: "column",
        padding: "8px 16px",
        maxWidth: "384px",
        alignSelf: user.uid === sent_by ? "flex-end" : "flex-start",
        borderRadius: "16px",
        boxShadow: 3,
      }}
    >
      <Typography paragraph color="background.paper" sx={{ mb: 2 }}>
        {content}
      </Typography>

      <Typography
        paragraph
        color="background.paper"
        sx={{ alignSelf: "flex-end", m: 0, opacity: 0.5 }}
      >
        {new Date(date).toDateString().substring(3, 10)} -{" "}
        {new Date(date).toTimeString().substring(0, 5)}
      </Typography>
    </Box>
  );
};

export default Bubble;
