import { Box, Button, InputBase } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { SendMessageStyle } from "./style";
import React, { useRef } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";

const SendMessage: React.FC<{ id: string | unknown }> = ({ id }) => {
  const { container, button, input } = SendMessageStyle;
  const ref = useRef<HTMLInputElement>();
  const { user } = useAuth();

  const handleOnSumbit = async (e: any) => {
    e.preventDefault();
    if (ref.current && ref.current.value) {
      await addDoc(collection(db, "messages"), {
        sent_by: user.uid,
        sent_at: Date(),
        content: ref.current.value,
        conversation_id: id,
      });

      await updateDoc(doc(db, "conversations", id as string), {
        last_message: {
          content: ref.current.value,
          sent_at: Date(),
          sent_by: user.uid,
        },
      });

      ref.current.value = "";
    }
  };

  return (
    <>
      <form action="#" onSubmit={handleOnSumbit}>
        <Box sx={container}>
          <InputBase fullWidth sx={input} placeholder="Send a message..." inputRef={ref} />
          <Button sx={button} type="submit">
            <SendIcon fontSize="inherit" />
          </Button>
        </Box>
      </form>
    </>
  );
};

export default SendMessage;
