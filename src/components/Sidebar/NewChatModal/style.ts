export const NewChatModalStyle = {
  modal: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    color: "#FFFFFF",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    justifyContent: "space-between",
    mt: 2,
  },
  input: {
    backgroundColor: "rgba(255,255,255, 0.25);",
    color: "rgb(255,255,255)",
    borderRadius: "4px",
    p: 1,
  },
  loadingCircle: {
    width: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  personAddIcon: {
    backgroundColor: "white",
    "&:hover": { backgroundColor: "whitesmoke" },
    fontSize: "36px",
  },
  statusMessage: {
    mt: 2,
    display: "flex",
    alignItems: "center",
    p: 1,
    borderRadius: "4px",
  },
};
