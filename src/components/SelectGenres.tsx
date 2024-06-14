import { Button, ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import TextBoxPopup from "./TextBoxPopup";
import { green } from "@mui/material/colors";

type SelectGenresProps = {
  genres: string[];
  count: number;
  closed: boolean;
  setClosed: React.Dispatch<React.SetStateAction<any>>;
  setCount: React.Dispatch<React.SetStateAction<any>>;
  setGenres: React.Dispatch<React.SetStateAction<any>>;
  generateNewPlaylist: () => void;
};

function SelectGenres(props: SelectGenresProps) {
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

  const [openGenrePopup, setOpenGenrePopup] = useState<boolean>(false);

  const selectGenre = (genre: string) => {
    if (props.genres.includes(genre)) {
      props.genres.splice(props.genres.indexOf(genre), 1);
    } else {
      let oldState = props.genres;
      oldState.push(genre);
      props.setGenres(oldState);
    }
    props.setCount(props.count + 1);
  };

  const addGenre = (inputGenre: string) => {
    let oldGenres = commonGenres;
    oldGenres.push(inputGenre);
    setCommonGenres(oldGenres);
  };

  const generateButtonDisplay = (genre: string) => {
    switch (props.closed) {
      case window.innerWidth >= 1280:
        return "block";

      case props.closed === true && props.genres.includes(genre):
        return "block";

      case props.closed === true && !props.genres.includes(genre):
        return "hidden";

      default:
        return "block";
    }
  };

  const disabledGenreTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: green[500],
      },
      secondary: {
        main: "#B2D1B7",
      },
      action: {
        disabledBackground: "#3A833D",
        disabled: "set color of text here",
      },
    },
  });

  return (
    <div className={`text-white gap-3 flex flex-col`}>
      <TextBoxPopup
        openGenrePopup={openGenrePopup}
        setOpenGenrePopup={setOpenGenrePopup}
        addGenre={addGenre}
        commonGenres={commonGenres}
        selectGenre={selectGenre}
      />
      <h2 className={`${props.closed ? "hidden xl:block" : ""}`}>
        Select genre(s) to make a new playlist from
      </h2>

      <div className="flex flex-wrap gap-2">
        {commonGenres.map((genre, index) => {
          return (
            <div className={generateButtonDisplay(genre)} key={index}>
              <ThemeProvider theme={disabledGenreTheme}>
                <Button
                  key={index}
                  onClick={() => {
                    if (genre === "+") {
                      setOpenGenrePopup(true);
                    } else {
                      if (!props.closed || window.innerWidth >= 1280) {
                        selectGenre(genre);
                      }
                    }
                  }}
                  variant={
                    props.genres.includes(genre) ? "contained" : "outlined"
                  }
                  disabled={props.closed && window.innerWidth < 1280}
                >
                  {genre}
                </Button>
              </ThemeProvider>
            </div>
          );
        })}
      </div>
      {(!props.closed || window.innerWidth > 1280) && (
        <Button
          onClick={() => {
            props.generateNewPlaylist();
            props.setClosed(true);
          }}
          variant="contained"
        >
          Make Playlist +
        </Button>
      )}
    </div>
  );
}

export default SelectGenres;
