import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type TextBoxPopupProps = {
  openGenrePopup: boolean;
  commonGenres: string[];
  addGenre: (value: string) => void;
  setOpenGenrePopup: React.Dispatch<React.SetStateAction<any>>;
};

function TextBoxPopup(props: TextBoxPopupProps) {
  return (
    <div>
      <Dialog
        open={props.openGenrePopup}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const genre = formJson.genre;
            // need to validate here
            // validate genre first (like only letters, no duplicates)
            //
            if (!props.commonGenres.includes(genre)) {
              // add genre
              props.addGenre(genre);
            } else {
              // show error
            }

            props.setOpenGenrePopup(false);
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
        <DialogActions>
          <Button onClick={() => props.setOpenGenrePopup(false)}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TextBoxPopup;
