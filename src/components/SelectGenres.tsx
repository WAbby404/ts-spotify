import { Button, Typography } from "@mui/material";
import { useState } from "react";
type SelectGenresProps = {
  genres: string[];
  setGenres: React.Dispatch<React.SetStateAction<any>>;
};

// what file is it called in?
function SelectGenres(props: SelectGenresProps) {
  const [count, setCount] = useState(0);
  // I should just have an array of common genres here & map to buttons and return its text back to App
  const commonGenres = [
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
  ];
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
    setCount(count + 1);
    console.log(props.genres);
  };

  return (
    <div className="border-solid border-2 border-sky-500">
      <Typography>
        Select a genre to make a new playlist from (or multiple)
      </Typography>
      <div>
        {commonGenres.map((genre, index) => {
          return (
            <Button
              key={index}
              onClick={() => handleGenre(index)}
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
