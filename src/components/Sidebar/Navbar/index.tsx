import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { NavbarStyle } from "./style";
import SearchBar from "./SearchBar";
import NewChatButton from "./NewChatButton";
import LogoutButton from "./LogoutButton";
import { ConversationData } from "../../../firebase/data_types";

const Navbar: React.FC<{
  onSearchBarChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  searchBarValue: string;
  conversations: ConversationData[];
}> = ({ onSearchBarChange, searchBarValue, conversations }) => {
  const { box } = NavbarStyle;

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ ...box, gap: "8px" }}>
          <ChatIcon />
          <Typography variant="h6">Chats</Typography>
        </Box>

        <Box sx={{ ...box, gap: "0px" }}>
          <LogoutButton />
        </Box>
      </Toolbar>

      <Toolbar sx={{ gap: "16px" }}>
        <SearchBar onChange={onSearchBarChange} value={searchBarValue} />
        <NewChatButton conversations={conversations} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
