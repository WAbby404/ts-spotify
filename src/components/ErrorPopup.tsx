import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { PopupData } from "./types";
import { ThemeProvider, createTheme } from "@mui/material";
import { green } from "@mui/material/colors";

type ErrorPopupProps = {
  handlePopupExit: () => void;
  popupData: PopupData;
};

function ErrorPopup(props: ErrorPopupProps) {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: green[500],
        contrastText: "#fff",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={props.popupData.popup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiPaper-root": {
            background: "#424242",
          },
          color: "#fff",
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: "white" }}>
          {props.popupData.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "#C7C7C7" }}
          >
            {props.popupData.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.handlePopupExit()} variant="contained">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default ErrorPopup;
