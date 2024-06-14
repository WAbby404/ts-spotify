import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { green } from "@mui/material/colors";

type TextBoxPopupProps = {
  openGenrePopup: boolean;
  commonGenres: string[];
  addGenre: (value: string) => void;
  selectGenre: (genre: string) => void;
  setOpenGenrePopup: React.Dispatch<React.SetStateAction<any>>;
};

function TextBoxPopup(props: TextBoxPopupProps) {
  const [errors, setErrors] = useState<string[]>([]);
  const validateGenre = (genre: string) => {
    let errors = [];
    const regex = /^[a-zA-Z]+$/;

    if (props.commonGenres.includes(genre)) {
      errors.push("Genre must be unique");
    } else if (!regex.test(genre)) {
      errors.push("Genre must contain only letters");
    } else if (genre.length > 20) {
      errors.push("Genre must be below 20 characters");
    }
    setErrors(errors);
    return errors;
  };

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
      <div>
        <Dialog
          open={props.openGenrePopup}
          PaperProps={{
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const genre: string = formJson.genre;
              if (validateGenre(genre).length === 0) {
                props.addGenre(genre.toLowerCase());
                props.selectGenre(genre);
                setErrors([]);
                props.setOpenGenrePopup(false);
              }
            },
          }}
          sx={{
            "& .MuiPaper-root": {
              background: "#424242",
            },
            color: "#fff",
          }}
        >
          <DialogTitle sx={{ color: "white" }}>Add a Genre</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: "#C7C7C7" }}>
              Add a genre to add to your new playlist
            </DialogContentText>
            <TextField
              autoFocus
              required
              id="genre"
              name="genre"
              label="Genre"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          {errors.map((error, key) => {
            return <DialogContentText key={key}>{error}</DialogContentText>;
          })}
          <DialogActions>
            <Button
              onClick={() => {
                props.setOpenGenrePopup(false);
                setErrors([]);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}

export default TextBoxPopup;
