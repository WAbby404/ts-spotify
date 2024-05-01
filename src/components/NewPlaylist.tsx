import { Button, Typography } from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

// ADD A PLAYLIST TYPE IN A SEPARATE FILE??
// all playlists will have the same elements or data structure, so why not?

type NewPlaylistProps = {
  newPlaylistDetails: {
    img: string;
    title: string;
    songs: string[];
  };
  genres: string[];
  count: number;
  newPlaylist: string[];
  setCount: React.Dispatch<React.SetStateAction<any>>;
};

function NewPlaylist(props: NewPlaylistProps) {
  const genresStringTitle = () => {
    let initialValue = "";
    return props.genres.reduce(
      (accumulator, currentValue) => accumulator + ", " + currentValue,
      initialValue
    );
  };

  return (
    <div>
      {props.newPlaylist.length > 0 ? (
        <div className="w-[90%] m-auto">
          <div>
            <img src={props.newPlaylistDetails.img} alt="replaceme" />
            <Typography>
              Playlist Title - ({genresStringTitle()} only)
            </Typography>
          </div>
          <div>
            <div className="flex justify-between">
              <TagIcon />
              <Typography>TITLE</Typography>
              <Typography>ALBUM</Typography>
              <Typography>GENRE</Typography>
              <AccessTimeFilledIcon />
            </div>
            <ul>
              {props.newPlaylist.map((song, index) => {
                return (
                  <li key={index} className="flex">
                    <Typography>title</Typography>
                    <div>
                      <img src="song img link" alt="replaceme" />
                      <div>
                        <Typography>{song}</Typography>
                        <Typography>Subtitle</Typography>
                      </div>
                    </div>
                    <Typography>Album Name</Typography>
                    <Typography>Genre</Typography>
                    <Typography>Time</Typography>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default NewPlaylist;
