import { Button, Typography } from "@mui/material";
import { useState } from "react";
import TextBoxPopup from "./TextBoxPopup";
type SelectGenresProps = {
  genres: string[];
  count: number;
  closed: boolean;
  setCount: React.Dispatch<React.SetStateAction<any>>;
  setGenres: React.Dispatch<React.SetStateAction<any>>;
  generateNewPlaylist: () => void;
};

// what file is it called in?
function SelectGenres(props: SelectGenresProps) {
  // I should just have an array of common genres here & map to buttons and return its text back to App
  const [commonGenres, setCommonGenres] = useState<string[]>([
    "+",
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
  ]);

  const [openGenrePopup, setOpenGenrePopup] = useState(false);
  // const [textboxPopupAnswer, setTextboxPopupAnswer] = useState("");
  // add a genre? maybe visit this later

  // rename to selectGenre?
  const selectGenre = (genre: string) => {
    // rewrite with param as genre?
    // redo array as a set?
    if (props.genres.includes(genre)) {
      props.genres.splice(props.genres.indexOf(genre), 1);
    } else {
      let oldState = props.genres;
      oldState.push(genre);
      props.setGenres(oldState);
    }
    props.setCount(props.count + 1);
    console.log(props.genres);
  };
  // const selectGenre = (index: number) => {
  //   // rewrite with param as genre?
  //   // redo array as a set?
  //   if (props.genres.includes(commonGenres[index])) {
  //     props.genres.splice(props.genres.indexOf(commonGenres[index]), 1);
  //   } else {
  //     let oldState = props.genres;
  //     oldState.push(commonGenres[index]);
  //     props.setGenres(oldState);
  //   }
  //   props.setCount(props.count + 1);
  //   console.log(props.genres);
  // };

  const addGenre = (inputGenre: string) => {
    console.log(inputGenre);
    let oldGenres = commonGenres;
    oldGenres.push(inputGenre);
    setCommonGenres(oldGenres);
  };

  // const playlistBtnTheme = createTheme({
  //   palette: {
  //     mode: "light",
  //     primary: {
  //       main: green[500],
  //     },
  //     secondary: {
  //       main: "#B2D1B7",
  //     },
  //   },
  // });

  // if closed and not highlighted, hide | if closed and highlighted, show | if open, show
  const generateButtonDisplay = (genre: string) => {
    switch (props.closed) {
      case props.closed === true && props.genres.includes(genre):
        return "block";

      case props.closed === true && !props.genres.includes(genre):
        return "hidden";

      default:
        return "block";
    }
  };

  return (
    <div className={`text-white gap-3 flex flex-col`}>
      <TextBoxPopup
        openGenrePopup={openGenrePopup}
        setOpenGenrePopup={setOpenGenrePopup}
        addGenre={addGenre}
        commonGenres={commonGenres}
        selectGenre={selectGenre}
      />
      <h2 className={`${props.closed ? "hidden" : ""}`}>
        Select genre(s) to make a new playlist from
      </h2>

      <div className="flex flex-wrap gap-2">
        {commonGenres.map((genre, index) => {
          return (
            <div className={generateButtonDisplay(genre)}>
              <Button
                key={index}
                onClick={() => {
                  if (genre === "+") {
                    setOpenGenrePopup(true);
                  } else {
                    if (!props.closed) {
                      selectGenre(genre);
                    }
                  }
                }}
                variant={
                  props.genres.includes(genre) ? "contained" : "outlined"
                }
                // disabled={props.closed}
              >
                {genre}
              </Button>
            </div>
          );
        })}
      </div>
      {!props.closed && (
        <Button onClick={() => props.generateNewPlaylist()} variant="contained">
          Make Playlist +
        </Button>
      )}
    </div>
  );
}

export default SelectGenres;
