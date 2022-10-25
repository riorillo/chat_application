export const SendMessageStyle = {
  container: {
    backgroundColor: "primary.main",
    height: "64px",
    position: "relative",
    zIndex: "1",
    boxShadow: "4px -4px 5px 0px rgb(0 0 0 / 12%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 32px",
    gap: "16px",
  },
  button: {
    color: "primary.main",
    "&:hover": { backgroundColor: "whitesmoke" },
    backgroundColor: "white",
    fontSize: "36px",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.30)",
    p: 1,
    borderRadius: "8px",
    color: "white",
  },
};
