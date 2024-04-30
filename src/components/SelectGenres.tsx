import { Button, Typography } from "@mui/material";
import { useState } from "react";
import TextBoxPopup from "./TextBoxPopup";
type SelectGenresProps = {
  genres: string[];
  count: number;
  setCount: React.Dispatch<React.SetStateAction<any>>;
  setGenres: React.Dispatch<React.SetStateAction<any>>;
};

// what file is it called in?
function SelectGenres(props: SelectGenresProps) {
  // I should just have an array of common genres here & map to buttons and return its text back to App
  const [commonGenres, setCommonGenres] = useState<string[]>([
    "pop",
    "rock",
    "hip hop",
    "country",
    "jazz",
    "house",
    "folk",
    "rap",
    "funk",
    "classic",
    "metal",
    "indie",
    "alternative",
    "+",
  ]);

  const [openGenrePopup, setOpenGenrePopup] = useState(false);
  const [textboxPopupAnswer, setTextboxPopupAnswer] = useState("");
  // add a genre? maybe visit this later

  const handleGenre = (index: number) => {
    // redo array as a set?
    if (props.genres.includes(commonGenres[index])) {
      props.genres.splice(props.genres.indexOf(commonGenres[index]), 1);
    } else {
      let oldState = props.genres;
      oldState.push(commonGenres[index]);
      props.setGenres(oldState);
    }
    props.setCount(props.count + 1);
    console.log(props.genres);
  };

  const addGenre = (inputGenre: string) => {
    console.log(inputGenre);
    let oldGenres = commonGenres;
    oldGenres.push(inputGenre);
    setCommonGenres(oldGenres);
  };

  return (
    <div className="border-solid border-2 border-sky-500">
      <TextBoxPopup
        openGenrePopup={openGenrePopup}
        setOpenGenrePopup={setOpenGenrePopup}
        addGenre={addGenre}
        commonGenres={commonGenres}
      />
      <Typography>Select genre(s) to make a new playlist from</Typography>
      <div>
        {commonGenres.map((genre, index) => {
          return (
            <Button
              key={index}
              onClick={() => {
                if (genre === "+") {
                  setOpenGenrePopup(true);
                  // need a textbox (popup?)
                  // run different function
                } else {
                  handleGenre(index);
                }
              }}
              variant={props.genres.includes(genre) ? "contained" : "outlined"}
            >
              {genre}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default SelectGenres;
