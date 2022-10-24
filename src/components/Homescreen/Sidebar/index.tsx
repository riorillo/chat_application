import { Box } from "@mui/material";
import { UserCredential } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { db } from "../../../firebase";
import { ConversationData, UserData } from "../../../firebase/data_types";
import Conversation from "./Conversation";
import ConversationPlaceholder from "./ConversationsPlaceholder";
import Navbar from "./Navbar";

const Sidebar = () => {
  const { user } = useAuth() as UserCredential;
  const [conversations, setConversations] = useState<ConversationData[]>([]);
  const [listedConversations, setListedConversations] = useState<
    ConversationData[]
  >([]);
  const [searchBarValue, setSearchBarValue] = useState("");
  const [chatList, setChatList] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const conversationsRef = collection(db, "conversations");
    const q = query(
      conversationsRef,
      where("members", "array-contains", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allConversations = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as ConversationData)
      );

      setConversations(allConversations);
      if (!searchBarValue) {
        setListedConversations(allConversations);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const uidList: string[] = [];
    const userList: UserData[] = [];

    const getUserList = async () => {
      await Promise.all(
        uidList
          .filter((item) => item !== user.uid)
          .map(async (uid) => {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            userList.push({ id: uid, ...docSnap.data() } as UserData);
            console.log(userList);
            setChatList(userList);
          })
      );
    };

    if (conversations.length !== 0) {
      conversations
        .map((conversation) => conversation.members)
        .forEach((members) =>
          members.forEach((member) => uidList.push(member))
        );

      getUserList();
    }
  }, [conversations]);

  useEffect(() => {
    if (searchBarValue && conversations.length !== 0) {
      const filteredUidList: string[] = chatList
        .filter(
          (item: UserData) =>
            item.displayName
              .toLocaleUpperCase()
              .indexOf(searchBarValue.toLocaleUpperCase()) !== -1
        )
        .map((item: UserData) => item.id);

      setListedConversations(
        conversations.filter((conversation) =>
          filteredUidList.some(
            (uid: string) =>
              uid === conversation.members[0] || uid === conversation.members[1]
          )
        )
      );
    }
    if (!searchBarValue) {
      setListedConversations(conversations);
    }
  }, [searchBarValue]);

  const onSearchBarChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchBarValue(event.target.value);
  };

  return (
    <Box>
      <Navbar
        onSearchBarChange={onSearchBarChange}
        searchBarValue={searchBarValue}
        conversations={conversations}
      />

      {!loading && conversations.length === 0 && <ConversationPlaceholder />}

      {conversations.length !== 0 && (
        <Box sx={{ "&:hover": { cursor: "pointer" }, mt: "8px" }}>
          {listedConversations.map((item: ConversationData) => (
            <Conversation key={item.id} conversation={item} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
