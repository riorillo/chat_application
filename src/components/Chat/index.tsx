import { Avatar, Box, Typography } from "@mui/material";
import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import { UserData, ConversationData } from "../../firebase/data_types";
import BubbleContainer from "./BubbleContainer";
import SendMessage from "./SendMessage";
import { ChatStyle } from "./style";

const Chat = () => {
  const { conversation } = useParams();
  const { container, topBar } = ChatStyle;
  const [receiverData, setReceiverData] = useState<UserData>();
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  const getData = async () => {
    let document = await getDoc(doc(collection(db, "conversations"), conversation));
    const conversationObj = { id: document.id, ...document.data() } as ConversationData;
    if (!conversationObj.members.some((el) => el === user.uid)) {
      navigate("/");
      return;
    }
    const receiverId = conversationObj.members.filter((el) => el !== user.uid)[0];
    document = await getDoc(doc(collection(db, "users"), receiverId));
    const receiverObj = { id: document.id, ...document.data() } as UserData;
    console.log(receiverObj);
    setReceiverData(receiverObj);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {!loading && (
        <Box sx={container}>
          <Box sx={topBar}>
            <Avatar></Avatar>
            <Typography sx={{ color: "background.paper", lineHeight: "24px" }} variant="h6">
              {receiverData?.displayName} <br />{" "}
              <span style={{ fontSize: "14px", opacity: 0.75 }}>{receiverData?.email}</span>
            </Typography>
          </Box>
          <BubbleContainer id={conversation} />

          <SendMessage id={conversation} />
        </Box>
      )}
    </>
  );
};

export default Chat;
