import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { PopupData } from "./types";

type ErrorPopupProps = {
  handlePopupExit: () => void;
  popupData: PopupData;
};

function ErrorPopup(props: ErrorPopupProps) {
  return (
    <>
      <Dialog
        open={props.popupData.popup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.popupData.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.popupData.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.handlePopupExit()}>Login</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ErrorPopup;
