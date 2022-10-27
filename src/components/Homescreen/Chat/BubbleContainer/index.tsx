import { Box } from "@mui/system";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../../../../firebase";
import { MessageData } from "../../../../firebase/data_types";
import Bubble from "../Bubble";
import { BubbleContainerStyle } from "./style";

const BubbleContainer: React.FC<{ id: string | undefined }> = ({ id }) => {
  const [messages, setMessages] = useState<MessageData[]>();
  const containerEnd = useRef<any>();
  const { container } = BubbleContainerStyle;
  const [initialRender, setInitialRender] = useState<boolean>(true);
  const [visible, setVisible] = useState<string>("hidden");

  useEffect(() => {
    const q = query(collection(db, "messages"), where("conversation_id", "==", id));
    const unsubscribe = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as MessageData)));
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (initialRender && messages && messages.length > 0) {
      setInitialRender(false);
      containerEnd.current.scrollIntoView({ behavior: "auto" });
      setVisible("initial");
    }
    if (!initialRender && messages && messages.length > 0) {
      containerEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <Box sx={{ ...container, visibility: visible }}>
        {messages &&
          messages
            .sort((a: any, b: any) => new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime())
            .map((item: any) => (
              <Bubble
                key={item.id}
                sent_by={item.sent_by}
                content={item.content}
                date={item.sent_at}
              />
            ))}
        <div ref={containerEnd}></div>
      </Box>
    </>
  );
};

export default BubbleContainer;
