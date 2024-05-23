import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";

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
    // console.log(regex.test(genre));
    if (props.commonGenres.includes(genre)) {
      errors.push("Genre must be unique");
    } else if (!regex.test(genre)) {
      // tests that it only contains letters
      // must also removes leading and following spaces
      errors.push("Genre must contain only letters");
    }
    setErrors(errors);
    return errors;
  };

  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#m3k45m",
      },
      secondary: {
        main: "#fff",
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
              // if no errors, add it
              if (validateGenre(genre).length === 0) {
                props.addGenre(genre.toLowerCase());
                props.selectGenre(genre);
                setErrors([]);
                props.setOpenGenrePopup(false);
              }
            },
          }}
        >
          <DialogTitle>Add a Genre</DialogTitle>
          <DialogContent>
            <DialogContentText>
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
            <Button type="submit">Add</Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}

export default TextBoxPopup;
