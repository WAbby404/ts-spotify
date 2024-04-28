import { Button, Typography } from "@mui/material";
import { useState } from "react";
type SelectGenresProps = {
  genres: string[];
  handleGenreChange: (input: string[]) => void;
};

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
      // find index and splice
      console.log(props.genres.indexOf(commonGenres[index]));
      let oldState = props.genres.splice(
        props.genres.indexOf(commonGenres[index]),
        1
      );
      // props.genres.indexOf(commonGenres[index]);
      props.handleGenreChange(oldState);
    } else {
      let oldState = props.genres;
      oldState.push(commonGenres[index]);
      props.handleGenreChange(oldState);
    }
    console.log(index);
    console.log(commonGenres[index]);
    // get old genres, add current genre to end of array
    console.log(props.genres);
    setCount(count + 1);
    // change not triggering
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
