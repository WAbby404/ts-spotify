import Snackbar from "@mui/material/Snackbar";

type SuccessPopupProps = {
  openSuccess: boolean;
};

function SuccessPopup({ openSuccess }: SuccessPopupProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={openSuccess}
      message="Playlist added to Spotify"
      key="topcenter"
    />
  );
}

export default SuccessPopup;
