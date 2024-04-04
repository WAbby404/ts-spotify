import { Button, Typography } from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

type NewPlaylistProps = {
  newPlaylistDetails: {
    img: string;
    title: string;
    songs: string[];
  };
};

function NewPlaylist(props: NewPlaylistProps) {
  return (
    <div>
      <div>
        <img src={props.newPlaylistDetails.img} alt="replaceme" />
        <Typography>Playlist Title - (Genre(s) only)</Typography>
      </div>
      <div>
        <div>
          <TagIcon />
          <Typography>TITLE</Typography>
          <Typography>ALBUM</Typography>
          <Typography>GENRE</Typography>
          <AccessTimeFilledIcon />
        </div>
        <div>
          {props.newPlaylistDetails.songs.map((song, index) => {
            return (
              <div>
                <Typography>{index}</Typography>
                <div>
                  <img />
                  <div>
                    <Typography>{song}</Typography>
                    <Typography>Subtitle</Typography>
                  </div>
                </div>
                <Typography>Album Name</Typography>
                <Typography>Genre</Typography>
                <Typography>Time</Typography>
              </div>
            );
          })}
        </div>
      </div>
      <Button>Make new Playlist</Button>
    </div>
  );
}

export default NewPlaylist;
