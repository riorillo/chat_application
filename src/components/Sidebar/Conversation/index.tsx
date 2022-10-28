import { Avatar, Box, Typography } from "@mui/material";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { db } from "../../../firebase";
import { ConversationData } from "../../../firebase/data_types";
import { ConversationStyle } from "./style";

const Conversation: React.FC<{
  conversation: ConversationData;
}> = ({ conversation }) => {
  const { members, last_message } = conversation;
  const { user } = useAuth();
  const { container, content, propic, textContent, textContainer } = ConversationStyle;
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getReceiverInfo = async () => {
      const receiverId = members.filter((member: string) => member !== user.uid)[0];
      console.log(receiverId);
      const docRef = doc(db, "users", receiverId);
      const docSnap = await getDoc(docRef);
      const document = docSnap.data() as DocumentData;
      setUsername(document.displayName);
      setEmail(document.email);
    };

    getReceiverInfo();
  }, []);

  return (
    <>
      {username && (
        <Box sx={container}>
          <Box
            sx={{
              ...content,
              backgroundColor:
                location.pathname === "/homescreen/" + conversation.id
                  ? "primary.light"
                  : "primary.main",
              "&:hover": {
                backgroundColor:
                  location.pathname === "/homescreen/" + conversation.id
                    ? "primary.light"
                    : "primary.dark",
              },
            }}
            onClick={() => navigate(conversation.id)}
          >
            <Avatar sx={propic}></Avatar>

            <Box sx={textContainer}>
              <Box sx={textContent}>
                <Typography variant="h5" color="#FFFFFF" sx={{ lineHeight: "26px" }}>
                  {username} <br />{" "}
                  <span style={{ fontSize: "1rem", opacity: "0.50" }}>{email}</span>
                </Typography>

                {last_message && (
                  <Typography paragraph color="#FFFFFF">
                    {new Date(last_message?.sent_at).toDateString().substring(3, 10)} -{" "}
                    {new Date(last_message?.sent_at).toTimeString().substring(0, 5)}
                  </Typography>
                )}
              </Box>

              <Typography color="#FFFFFF" sx={{ lineHeight: "26px" }}>
                {last_message ? last_message.content : "Send your first message "}{" "}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Conversation;
