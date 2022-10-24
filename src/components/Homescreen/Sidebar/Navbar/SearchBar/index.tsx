import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchBarStyle } from "./style";

const SearchBar: React.FC<{
  onChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  value: string;
}> = ({ onChange, value }) => {
  const { bar } = SearchBarStyle;

  return (
    <InputBase
      fullWidth
      endAdornment={<SearchIcon />}
      placeholder="Search or start new chat..."
      sx={bar}
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchBar;
