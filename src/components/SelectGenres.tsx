import { Button, Typography } from "@mui/material";
type SelectGenresProps = {
  genres: string[];
};

function SelectGenres({ genres }: SelectGenresProps) {
  // I should just have an array of common genres here & map to buttons and return its text back to App
  const commonGenres = [
    "pop",
    "rock",
    "hip hop",
    "R&B",
    "EDM",
    "country",
    "jazz",
    "reggae",
    "latin",
    "classical-",
  ];

  return (
    <div className="border-solid border-2 border-sky-500">
      <Typography>
        Select a genre to make a new playlist from (or multiple)
      </Typography>
      <div>
        {genres.map((genre, index) => {
          return <Button key={index}>{genre}</Button>;
        })}
      </div>
    </div>
  );
}

export default SelectGenres;
