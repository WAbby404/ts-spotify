import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";

type SuccessPopupProps = {
  openSuccess: boolean;
};

function SuccessPopup({ openSuccess }: SuccessPopupProps) {
  //   const [state, setState] = useState({
  //     open: false,
  //     vertical: "top",
  //     horizontal: "center",
  //   });
  //   const { vertical, horizontal, open } = state;

  const handleClick = (newState: SnackbarOrigin) => () => {
    // setState({ ...newState, open: true });
  };

  const handleClose = () => {
    // setState({ ...state, open: false });
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={openSuccess}
      onClose={handleClose}
      message="Playlist added to Spotify"
      key="topcenter"
    />
  );
}

export default SuccessPopup;
