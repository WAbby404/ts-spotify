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
  setCount: React.Dispatch<React.SetStateAction<any>>;
  setNewPlaylist: React.Dispatch<React.SetStateAction<any>>;
};

function NewPlaylist({
  newPlaylistDetails,
  setNewPlaylist,
  genres,
  count,
  setCount,
}: NewPlaylistProps) {
  return (
    <div>
      <div>
        <img src={newPlaylistDetails.img} alt="replaceme" />
        <Typography>Playlist Title - (Genre(s) only)</Typography>
      </div>
      <div>
        <div className="flex">
          <TagIcon />
          <Typography>TITLE</Typography>
          <Typography>ALBUM</Typography>
          <Typography>GENRE</Typography>
          <AccessTimeFilledIcon />
        </div>
        <ul>
          {newPlaylistDetails.songs.map((song, index) => {
            return (
              <li key={index} className="flex">
                <Typography>{index}</Typography>
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
      <Button
        onClick={setNewPlaylist}
        disabled={genres.length === 0}
        variant="contained"
      >
        Make new Playlist
      </Button>
    </div>
  );
}

export default NewPlaylist;
