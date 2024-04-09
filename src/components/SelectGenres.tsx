import { Button, Typography } from "@mui/material";
type SelectGenresProps = {
  genres: string[];
};

function SelectGenres({ genres }: SelectGenresProps) {
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
