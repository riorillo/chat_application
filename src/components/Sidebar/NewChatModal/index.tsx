import { Modal, Box, Typography, InputBase, Button } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { NewChatModalStyle } from "./style";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CircularProgress from "@mui/material/CircularProgress";
import { useRef, useState } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { ConversationData, UserData } from "../../../firebase/data_types";
import { useAuth } from "../../../contexts/AuthContext";
import { db } from "../../../firebase";

export const NewChatModal: React.FC<{
  status: boolean;
  handleClose: () => void;
  conversations: ConversationData[];
}> = ({ status, handleClose, conversations }) => {
  const { modal, inputContainer, input, loadingCircle, personAddIcon, statusMessage } =
    NewChatModalStyle;
  const [loading, setLoading] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [success, setSuccess] = useState<{ message: string } | null>(null);
  const ref = useRef<any>();
  const { user } = useAuth();

  const startChat = async () => {
    setLoading(true);
    setAlreadyExist(false);
    setError(null);
    setSuccess(null);

    if (ref.current.value === user.email) {
      setError({ message: "Are you trying to chat with yourself? 🤔" });
      setLoading(false);
      return;
    }

    let q = query(collection(db, "users"), where("email", "==", ref.current.value));

    const friendDoc = await getDocs(q);
    const friend = friendDoc.docs.map((doc) => ({ id: doc.id, ...doc.data() } as UserData))[0];

    //Controlla se l'utente cercato è registrato;
    if (friend) {
      const activeConversation = conversations.filter((item) =>
        item.members.some((item) => item === friend.id)
      );
      //Controlla che non siano già presenti conversazioni con l'utente cercato;
      if (activeConversation.length === 0) {
        await addDoc(collection(db, "conversations"), {
          members: [friend.id, user.uid],
          created_at: new Date().toISOString(),
        });

        //Notifica la buona riuscita dell'operazione;
        setTimeout(() => {
          setLoading(false);
          setSuccess({
            message: `You've started a chat with ${friend.displayName}!`,
          });
        }, 1000);
        //Notifica l'esistenza di una conversazione;
      } else {
        setTimeout(() => {
          setLoading(false);
          setAlreadyExist(true);
        }, 1000);
      }
      // Notifica un errore;
    } else {
      setTimeout(() => {
        setLoading(false);
        setError({ message: `Can't find any user for "${ref.current.value}"` });
      }, 1000);
    }
  };

  return (
    <>
      <Modal
        open={status}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...modal, bgcolor: "primary.main" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Start a chat
            </Typography>
            <ChatIcon />
          </Box>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Search for a friend via their email and start chatting with them!
          </Typography>

          <Box sx={inputContainer}>
            <InputBase
              placeholder="Insert your friend's email"
              sx={{ ...input, width: "264px" }}
              inputRef={ref}
            />
            {loading ? (
              <Box sx={loadingCircle}>
                <CircularProgress color="inherit" size={36} />
              </Box>
            ) : (
              <Button
                onClick={() => {
                  startChat();
                }}
                sx={{
                  color: "background.main",
                  ...personAddIcon,
                }}
              >
                <PersonAddIcon sx={{ fontSize: "inherit" }} />
              </Button>
            )}
          </Box>

          {ref.current && alreadyExist && !loading && (
            <Box
              sx={{
                ...statusMessage,
                backgroundColor: "rgba(237, 108, 2, 0.60)",
                border: "2px solid #ed6c02",
              }}
            >
              <Typography>This chat already exists</Typography>
            </Box>
          )}

          {ref.current && error && !loading && (
            <Box
              sx={{
                ...statusMessage,
                backgroundColor: "rgba(239, 83, 80, 0.60)",
                border: "2px solid #d32f2f",
              }}
            >
              <Typography>{error.message}</Typography>
            </Box>
          )}

          {ref.current && success && !loading && (
            <Box
              sx={{
                ...statusMessage,
                backgroundColor: "rgba(76, 175, 80, 0.40)",
                border: "2px solid #2e7d32",
              }}
            >
              <Typography>{success.message}</Typography>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default NewChatModal;
